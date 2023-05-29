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

const listAllUsers = async (nextPageToken) => {
    try {
        let data = [];
        const listUserResult = await admin.auth().listUsers(1000, nextPageToken);
        listUserResult.users.forEach((user) => {
            data.push(user.toJSON());
        });
        if (listUserResult.pageToken) {
            const nextPageData = await listAllUsers(listUserResult.pageToken);
            nextPageData.forEach((user) => {
                data.push(user);
            });
        }
        return data;
    } catch (error) {
        console.error(`Error getting all users: ${error}`);
        return null;
    }
};

// listAllUsers();

router.get('/all', async (req, res) => {
    try {
        const data = await listAllUsers();
        const dataCount = data.length;
        return res.status(200).send({ success: true, data, dataCount });
    } catch (error) {
        console.error(`Error getting all users: ${error}`);
        return res.status(500).send({ success: false, msg: `Error getting all users: ${error}` });
    }
});

module.exports = router;