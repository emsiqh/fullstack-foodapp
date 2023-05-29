const router = require('express').Router();
const admin = require('firebase-admin');
const db = admin.firestore();

router.post('/create', async (req, res) => {
    try {
        const id = +new Date();
        const data = {
            productId: id,
            product_name: req.body.product_name,
            product_category: req.body.product_category,
            product_price: req.body.product_price,
            imageURL: req.body.imageURL,
        };
        const response = await db.collection('products').doc(`${id}`).set(data);
        return res.status(200).send({ success: true, data: response });
    } catch (error) {
        return res.status(500).send({ success: false, msg: error.message });
    }
});

// get all products
router.get('/all', async (req, res) => {
    try {
        const querySnapshot = await db.collection('products').get();
        const response = [];
        querySnapshot.forEach((doc) => {
            response.push(doc.data());
        });
        return res.status(200).send({ success: true, data: response });
    } catch (error) {
        return res.status(500).send({ success: false, msg: `Error: ${error}` });
    }
});

// delete a product
router.delete('/delete/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        await db.collection('products').doc(productId).delete();
        return res.status(200).send({ success: true, msg: `Product ${productId} deleted successfully` });
    } catch (error) {
        return res.status(500).send({ success: false, msg: `Error deleting product ${productId}` });
    }
});

// create a cart
router.post("/addToCart/:userId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.productId;
    const itemRef = db.collection("cartItems").doc(`/${userId}/`).collection("items").doc(`/${productId}/`);
    try {
        const doc = await itemRef.get();
        const data = {
            productId: productId,
            product_name: req.body.product_name,
            product_category: req.body.product_category,
            product_price: req.body.product_price,
            imageURL: req.body.imageURL,
            quantity: 1,
        };
        if (doc.exists) {
            const quantity = doc.data().quantity + 1;
            const batch = db.batch();
            batch.update(itemRef, { quantity });
            await batch.commit();
            return res.status(200).send({ success: true, data: { ...data, quantity } });
        } else {
            const batch = db.batch();
            batch.set(itemRef, data);
            await batch.commit();
            return res.status(200).send({ success: true, data: data });
        }
    } catch (err) {
        return res.send({ success: false, msg: `Error :${err} ` });
    }
});

// update cart to increse or decrement
router.post('/updateCart/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    const productId = req.query.productId;
    const type = req.query.type;
    const itemRef = db.collection("cartItems").doc(`${userId}`).collection("items").doc(`${productId}`);

    try {
        const doc = await itemRef.get();
        if (!doc.exists) {
            return res.status(404).send({ success: false, msg: "Item not found in cart" });
        }

        const quantity = doc.data().quantity;
        const batch = db.batch();

        if (type === 'increment') {
            batch.update(itemRef, { quantity: quantity + 1 });
        } else if (type === 'decrement' && quantity === 1) {
            batch.delete(itemRef);
        } else if (type === 'decrement' && quantity > 1) {
            batch.update(itemRef, { quantity: quantity - 1 });
        } else {
            return res.status(400).send({ success: false, msg: "Invalid request" });
        }

        await batch.commit();
        const updatedDoc = await itemRef.get();
        const data = updatedDoc.data();
        return res.status(200).send({ success: true, data });
    } catch (err) {
        throw Error(`Failed to update cart: ${err.message}`);
    }
});

// get all the cartitems for that user
router.get("/getCartItems/:user_id", async (req, res) => {
    const userId = req.params.user_id;
    try {
        const query = db.collection("cartItems").doc(`/${userId}/`).collection("items");
        const querySnapshot = await query.get();
        const response = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
        return res.status(200).send({ success: true, data: response });
    } catch (err) {
        throw new Error(`Failed to get cart items: ${err.message}`);
    }
});

module.exports = router;