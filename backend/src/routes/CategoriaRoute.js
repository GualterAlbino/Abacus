const CategoriaController = require("../controller/CategoriaController")

class CategoriaRoute {
    constructor(app){
        

       
       app.route("/categoria").get(CategoriaController.buscarTodasCategorias) 
       app.route("/categoria").post(CategoriaController.adicionarCategoria)
       app.route("/categoria/:id").post(CategoriaController.editarCategoria)
       app.route("/categoria/:id").delete(CategoriaController.deletarCategoria)
    }
}

module.exports = CategoriaRoute