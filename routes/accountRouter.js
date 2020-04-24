import express from "express";
import AccountModel from "../model/accountModel";
import Cryptr from "cryptr";
import jwt from "jsonwebtoken";

const accountRouter = express.Router();
let securePass = new Cryptr("aes256");

accountRouter.route("/").get((req, resp) => {
    try {
        let token = req.headers['token'];
        if (token) {
            jwt.verify(token, process.env.SECRET, function (err, decoded) {
                if (err) {
                    resp.statusMessage = "Unauthorized";
                    resp.status(401).json({
                        'codigo': '2',
                        'mensagem': 'Token invalido, inexistente ou expirado'
                    });
                } else if (decoded) {
                    AccountModel.find({}, {
                        firstName: 1, lastName: 1, email: 1, phoneNumber: 1, dateBirth: 1, gender: 1
                    }, (err, account) => {
                        if (err) {
                            resp.statusMessage = "Bad request";
                            resp.status(400).json({
                                'codigo': '3',
                                'mensagem': 'Dados request enviados incorretos'
                            });
                        } else {
                            resp.statusMessage = "OK";
                            resp.status(200).json(account);
                        }
                    });
                }
            })
        } else {
            resp.statusMessage = "Unauthorized";
            resp.status(401).json({
                'codigo': '2',
                'mensagem': 'Token invalido, inexistente ou expirado'
            });
        }
    } catch (error) {
        console.error(error);
        resp.statusMessage = "Internal error";
        resp.status(500).json({
            'codigo': '1',
            'mensagem': 'Erro no servidor'
        });
    }
}).post((req, resp) => {

});

accountRouter.use("/:id", (req, resp, next) => {
    next();
})
accountRouter.route("/:id").get((req, resp) => {

}).put((req, resp) => {

}).delete((req, resp) => {

});
export default accountRouter;