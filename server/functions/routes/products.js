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

module.exports = router;