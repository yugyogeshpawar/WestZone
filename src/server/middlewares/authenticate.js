// src/server/middlewares/authenticate.js
import jwt from 'jsonwebtoken';
import User from 'src/server/models/user.model';

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // replace JWT_SECRET with your secret key
        console.log(decoded);
        const user = await User.findOne({ _id: decoded.userId });
        console.log(user);``
        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

export default authenticate;
