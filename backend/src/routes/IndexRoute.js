/*
* ROTA DEFAULT DA API : http://localhost:3000
*/

const IndexController = require(`../controller/IndexController`)


class IndexRoute {
    constructor(app){

        app.get("/", IndexController.inicializacao)
        
    }
}

module.exports = IndexRoute;

