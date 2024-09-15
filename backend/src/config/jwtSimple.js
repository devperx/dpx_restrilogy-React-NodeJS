const moment = require("moment");
const jwt_simple = require("jwt-simple");


const JWT_simpleCreateTokenAccess = (data_user = {}) => {

    if (data_user !== null) {

        const payload = {
            id: data_user.id,
            username: data_user.username,
            type_account: data_user.type_account,
            fullname: data_user.fullname,
            token_created: moment().unix(),
            token_expiration: moment().add(3, "hours").unix() 
        };

        return jwt_simple.encode(payload, process.env.JWT_KEYWORD);
    }
}


const JWT_simpleDecodeTokenUser = (token_user = "") => {

    return token_user ? jwt_simple.decode(token_user, process.env.JWT_KEYWORD, true) : {};
}


const JWT_simpleVerifyExpirationTokenUser = (token_user = "") => {

    const { token_expiration } = JWT_simpleDecodeTokenUser(token_user);

    const date_current = moment().unix();

    if (date_current > token_expiration) {
        return true;
    }

    return false;
}



module.exports = {
    JWT_simpleCreateTokenAccess,
    JWT_simpleDecodeTokenUser,
    JWT_simpleVerifyExpirationTokenUser
}
