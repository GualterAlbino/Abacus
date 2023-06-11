/*
*  Arquivo dedicado a conexão com o banco MongoDB passando as credenciais utilizando variaveis de ambiente
*/ 

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Importação de credenciais de conexão ao banco do arquivo ".env"
const dbProtocol = process.env.DB_PROTOCOL;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;



class DataBaseConfig{
    constructor(app){
        mongoose.connect(`${dbProtocol}://${dbUser}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true, option usecreateindex is not supported
        })
        .then(() => {
            
            console.log(`[CONEXÃO COM O BANCO] : SUCESSO => Conexão ao banco realizada devidamente!`)
            
        }).catch((error) => {
            console.log(`[CONEXÃO COM O BANCO] : ERRO => ${error}`)
        }) 
    }
}

module.exports = DataBaseConfig;