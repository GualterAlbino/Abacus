const express = require("express")
const cors = require("cors")

//Importando os Models
const CategoriaModel = require ("./src/model/CategoriaModel");
const TransacaoModel = require("./src/model/TransacaoModel");
const UsuarioModel = require("./src/model/UsuarioModel")

//Configurações do DOTENV para variaveis de ambiente
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;


const app = express();    
app.use(express.json()); //Configura JSON como resposta padrão para testar no postman
app.use(cors());        //Cors - Como o front e o back estão separados, precisamos permitir a conexão

class App {

    constructor(){
        this.app
    }

    inicializar(){

        app.listen(port, () => {
            console.log(`API rodando na porta ${port}...`);
        });
        
        
        //Conectando com o banco
        const DataBaseConfig = require(`./src/config/DataBaseConfig`);
        new DataBaseConfig(app);


        //Instanciando as tabelas
        new CategoriaModel();
        new TransacaoModel();
        new UsuarioModel();


        //Instanciando as rotas
        const IndexRoute = require("./src/routes/IndexRoute");
        new IndexRoute(app);

        const CategoriaRoute = require("./src/routes/CategoriaRoute");
        new CategoriaRoute(app);
        
        const TransacaoRoute = require("./src/routes/TransacaoRoute");
        new TransacaoRoute(app);

        const UsuarioRoute = require("./src/routes/UsuarioRoute");
        new UsuarioRoute(app);

     
    }
}

new App().inicializar()