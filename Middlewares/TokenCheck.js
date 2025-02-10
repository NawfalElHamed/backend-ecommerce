const CONSTANTS = require('../Config/Constants');
const { verify } = require('../Helpers/JWT');
const {jwtSecret} = require('../Config/config');
const { sendResponse } = require('../Helpers/sendResponse');

exports.TokenCheck = (req, res, next) => {
    const authHeader = req.headers.authorization || null;
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const userData = verify(token,jwtSecret);
        req.user= userData
        
        next();
    } catch (error) {
        return res.json(sendResponse(CONSTANTS.NOT_AUTHORIZED,CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE));
    }
};