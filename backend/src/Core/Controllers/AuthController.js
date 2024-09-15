const { getdate, getHour } = require("../../config/myFormatDate");
const { JWT_simpleCreateTokenAccess } = require("../../config/jwtSimple");

const bcrypt = require("bcrypt-nodejs");
const QUERY_MYSQL = require("../../config/queryConfig");

const AuthPostRegisterController = async (req, res) => {

    const { username, fullname, password, repeat_password } = req.body;

    if (username.trim() === "" || fullname.trim() === "" || password.trim() === "" || repeat_password.trim() === "") {
        res.status(404).json({
            ok: false,
            message: "All fields are required"
        });

    } else if (password !== repeat_password) {
        res.status(404).json({
            ok: false,
            message: "Passwords must be the same"
        });

    } else {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) {
                res.status(500).json({
                    ok: false,
                    message: "Server error"
                });
            } else {
                bcrypt.hash(password, salt, null, (error, hash) => {
                    if (error) {
                        res.status(500).json({
                            ok: false,
                            message: "Server error"
                        });
                    } else {

                        const hash_password = hash

                        const created_at = `${getdate(new Date)} | ${getHour(new Date)}`;

                        // EMPLOYEE=> adminOK || PASS ANY <-- 
                        const RESULT = QUERY_MYSQL("INSERT_DATA_SIMPLE", "users", ["username", "fullname", "password", "type_account", "created_at"],
                            [username, fullname, hash_password, username === "adminOK" ? "Employee" : "Client", created_at]);


                        RESULT.then((data) => {

                            if (data.code === "201") {
                                res.status(201).json({
                                    ok: true,
                                    message: "Successfully registered user"
                                });

                            } else if (data.code === "500") {
                                res.status(parseInt(data.code)).json({ message: data.message });
                            }
                        });
                    }
                });
            }
        });
    }
}

const AuthPostLoginController = async (req, res) => {

    const { username, password } = req.body;

    if (username.trim() === "" || password.trim() === "") {
        res.status(404).json({
            ok: false,
            message: "All fields are required"
        });

    } else {

        const RESULT = QUERY_MYSQL("INSERT_DATA_IF_EXISTS", "users", ["username", "password"], [username, password],
            { field: "username", value: username });

        RESULT.then((data) => {

            if (data.code === "201") {

                if (data.bonus.length === 0) {
                    res.status(404).json({
                        ok: false,
                        message: "Registered user not found"
                    });

                } else {

                    bcrypt.compare(password, data.bonus[0].password, function (error, isEncrypt) {

                        if (error) {
                            res.status(500).json({
                                ok: false,
                                message: "Server error"
                            });
                        } else if (!isEncrypt) {
                            res.status(500).json({
                                ok: false,
                                message: "Server error"
                            });
                        } else {
                            res.status(201).json({
                                ok: true,
                                token_access: JWT_simpleCreateTokenAccess(data.bonus[0]),
                                message: "You have successfully accessed"
                            });
                        }
                    });
                }

            } else if (data.code === "500") {
                res.status(parseInt(data.code)).json({ message: data.message });
            }
        });
    }
}


module.exports = {
    AuthPostRegisterController,
    AuthPostLoginController
}