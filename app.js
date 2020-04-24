import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import Cryptr from "cryptr";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import AccountModel from "./model/accountModel";
import dataAccount from "./data/account.json"

const app = express();
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', console.error.bind(console,"Erro de conexão. "));

let securePass = new Cryptr("aes256");
let password = securePass.encrypt(dataAccount.password);
dataAccount.password = password;

let account = new AccountModel(dataAccount);

account.save(err=>{
    if(err){
        console.error(`Erro ao salvar: ${err}`);
    } else {
        console.log(`Conta ${dataAccount.email} criada com sucesso!`);
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;