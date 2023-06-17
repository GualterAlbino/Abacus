const mongoose = require("mongoose")

class TransacaoModel extends mongoose.Schema {
    constructor() {
        super({
            nome:          { type: String, required: true },
            valor:         { type: Number, required: true },
            tipo:          { type: String/*enum :["Receita","Despesa"]*/},
            data:          { type: String, required: false},
            dia:           { type: String, required: false},
            mes:           { type: String, required: false},
            ano:           { type: String, required: false},
            categoria:     { type: mongoose.Schema.ObjectId , ref: "CategoriaModel" }, //Foreign key para CategoriaModel
            descricao:     { type: String, required: false}
            
    
        },{
            timestamps: true,   // Cria os campos: "CriadoEm" , "EditadoEm"
            collection:"TransacaoModelAbacus" //Nome dado a "tabela" dentro do banco
        });
        mongoose.model("TransacaoModel", this);
    }
}

module.exports = TransacaoModel;