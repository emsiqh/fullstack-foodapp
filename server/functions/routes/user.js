const router = require('express').Router();
const admin = require('firebase-admin');

router.get('/', (req, res) => {
    return res.send("from user api");
});

router.get('/jwtVerify', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(500).send({ msg: 'Token not found' });
    }

    // get the user token
    const token = req.headers.authorization.split(' ')[1];

    // validate the token
    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        if (!decodedValue) {
            return res.status(500).json({ success: false, msg: 'Unauthorized token' });
        }
        return res.status(200).json({ success: true, data: decodedValue });
    } catch (error) {
        return res.send({
            success: false,
            msg: `Error in validating token: ${error}`
        });
    }
});

module.exports = router;