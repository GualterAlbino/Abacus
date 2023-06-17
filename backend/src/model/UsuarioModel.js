const mongoose = require("mongoose");


//Definição da estrutura do Usuario dentro do banco



class UsuarioModel extends mongoose.Schema {
    constructor(){
        super({
            nome:     {type: String, maxlength:50, required: true},
            email:    {type: String, maxlength:30, required: true},
            senha:    {type: String, required: true},
            tokens:   [ { token: {type: String, required: false} } ],
        },{
            timestamps: true, // Cria os campos: "CriadoEm" , "EditadoEm"
            collection: `UsuarioModelAbacus` //Nome dado a "tabela" dentro do banco
        });

   
        mongoose.model("UsuarioModel", this);//.this  Utilizado na importação do controller
    }

    
}

module.exports = UsuarioModel;

