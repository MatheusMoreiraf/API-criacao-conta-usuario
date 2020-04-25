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
                    status401(resp);
                } else if (decoded) {
                    AccountModel.find({}, {
                        firstName: 1, lastName: 1, email: 1, phoneNumber: 1, dateBirth: 1, gender: 1
                    }, (err, account) => {
                        if (err) {
                            status400(resp, err);
                        } else {
                            status200(resp, account);
                        }
                    });
                }
            })
        } else {
            status401(resp);
        }
    } catch (error) {
        status500(resp, error);
    }
}).post((req, resp) => {
    try {
        let token = req.headers['token'];
        if (token) {
            jwt.verify(token, process.env.SECRET, function (err, decoded) {
                if (err) {
                    status401(resp);
                } else if (decoded) {
                    req.body.password = securePass.encrypt(req.body.password);
                    let account = new AccountModel(req.body);
                    account.save(err => {
                        if (err) {
                            status400(resp, err);
                        } else {
                            let accountAux = removeData(account);
                            status201(resp, accountAux);
                        }
                    });
                }
            })
        } else {
            status401(resp);
        }
    } catch (error) {
        status500(resp, error);
    }
});

accountRouter.use("/:id", (req, resp, next) => {
    try {
        let token = req.headers['token'];
        if (token) {
            jwt.verify(token, process.env.SECRET, function (err, decoded) {
                if (err) {
                    status401(resp);
                } else if (decoded) {
                    AccountModel.findById(req.params.id, (err, account) => {
                        if (err || !account) {
                            status404(resp, err, req.params.id);
                        } else {
                            req.account = account;
                            next();
                        }
                    });
                }
            })
        } else {
            status401(resp);
        }
    } catch (error) {
        status500(resp, error);
    }
});
accountRouter.route("/:id").get((req, resp) => {
    let accountAux = removeData(req.account);
    status200(resp, accountAux);
}).put((req, resp) => {
    try {
        req.account.password = securePass.encrypt(req.body.password);
        req.account.firstName = req.body.firstName;
        req.account.lastName = req.body.lastName;
        req.account.email = req.body.email;
        req.account.dateBirth = req.body.dateBirth;
        req.account.phoneNumber = req.body.phoneNumber;
        req.account.gender = req.body.gender;

        req.account.save(err => {
            if (err) {
                status400(resp, err);
            } else {
                status202(resp);
            }
        });
    } catch (error) {
        status500(resp, error);
    }
}).delete((req, resp) => {
    req.account.remove(err => {
        if (err) {
            status400(resp, err);
        } else {
            status204(resp);
        }
    });
});

function removeData(data) {
    let dataAux = data.toObject();
    delete dataAux["password"];
    return dataAux;
}

function status200(resp, data) {
    resp.statusMessage = "OK";
    resp.status(200).json(data);
}

function status201(resp, data) {
    resp.statusMessage = "Criado";
    resp.status(201).json(data);
}

function status202(resp) {
    resp.statusMessage = "Aceito";
    resp.status(202).send("");
}

function status204(resp) {
    resp.statusMessage = "Sem conteúdo";
    resp.status(204).send("");
}

function status400(resp, err) {
    console.error(`Erro ao salvar: ${err}`);
    resp.statusMessage = "Bad request";
    resp.status(400).json({
        'codigo': '3',
        'mensagem': 'Dados request enviados incorretos'
    });
}

function status401(resp) {
    resp.statusMessage = "Unauthorized";
    resp.status(401).json({
        'codigo': '2',
        'mensagem': 'Token invalido, inexistente ou expirado'
    });
}

function status404(resp, err, id) {
    console.error(err)
    resp.statusMessage = "Not found";
    resp.status(404).json({
        'codigo': '4',
        'mensagem': `Recurso ${id} não encontrado`
    });
}

function status500(resp, error) {
    console.error(error);
    resp.statusMessage = "Internal error";
    resp.status(500).json({
        'codigo': '1',
        'mensagem': 'Erro no servidor'
    });
}

export default accountRouter;