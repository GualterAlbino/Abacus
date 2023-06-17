const UsuarioController = require("../controller/UsuarioController");
//const UsuarioMiddleware = require("../middleware/UsuarioMiddleware");

class UsuarioRoute{
    constructor(app){
        
        //Rota: (POST) localhost:3000/usuario/registrar
        app.post("/usuario/registrar",UsuarioController.registrarUsuario);
        app.post("/usuario/login",UsuarioController.loginUsuario);
        app.post("/usuario/deletar",UsuarioController.deletarUsuario);

        //rota privada(Necessita do ID e do TOKEN)
        //app.get("/usuario/:id",UsuarioMiddleware.ValidaToken,UsuarioController.acessoUsuario)
    }
}

module.exports = UsuarioRoute;