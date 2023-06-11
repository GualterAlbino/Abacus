const  Mongoose = require("mongoose")

class CategoriaModel extends Mongoose.Schema {
    constructor(){
        super({
            nome:{type: String, required: true},
            descricao : { type: String, required: false },
            data: {type: String, required: true}
        },{
            timestamps:true,      // Cria os campos: "CriadoEm" , "EditadoEm"
            collection: "CategoriaModelAbacus" //Nome dado a "tabela" dentro do banco
        })

        Mongoose.model("CategoriaModel",this);
    }
}

module.exports = CategoriaModel;