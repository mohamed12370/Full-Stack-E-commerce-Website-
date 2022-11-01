const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

const authorizationUser = async(req, res, next) => {
    const { token } = req.cookies;
    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Login first to access this reasoure',
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Login first',
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.json({
            success: false,
            message: 'catch error from authorization method.',
            error,
        });
    }
};

const authorizationRole = (...role) => {
    return async(req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role ${req.user.role} is not allowed to access this resource`,
            });
        }
        next();
    };
};

module.exports = { authorizationUser, authorizationRole };