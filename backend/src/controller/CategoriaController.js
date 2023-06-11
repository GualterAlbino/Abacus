const Mongoose = require ("mongoose")
const CategoriaModel = Mongoose.model("CategoriaModel")

class CategoriaController{

    static async buscarTodasCategorias(req, res){
        //Como é para trazer todos, no find eu passo o filtro {} vazio
        try {
            res.status(200).json(await CategoriaModel.find({}))
        } catch (error) {
            console.log(`[USUARIOS] : BUSCAR TODOS => ERRO: ${error}`)
            res.status(500).send(`Não foi possivel buscar os usuarios, tente novamente mais tarde.`)
        }
        
    }

    static async adicionarCategoria(req, res){
        //Create serve para adicionar um novo registro
        try {
            let usuarioNovo = req.body
            console.log(JSON.stringify(usuarioNovo))
            res.status(200).json(await CategoriaModel.create(usuarioNovo))
        } catch (error) {
            console.log(`[USUARIOS] : ADICIONAR USUARIO => ERRO: ${error}`)
            res.status(500).send(`Não foi possivel adicionar novo usuario, tente novamente mais tarde.`)
        }
    }

    static async editarCategoria(req, res){
        //Para editar podemos utilizar da função .findByIdAndUpdate, que procura e edita um usuario
        let usuarioEditar = req.body
        try {
            res.status(200).json(await CategoriaModel.findByIdAndUpdate(usuarioEditar._id, usuarioEditar))
        } catch (error) {
            console.log(`[USUARIOS] : EDITAR USUARIO => ERRO: ${error}`)
            res.status(500).send(`Não foi possivel editar o usuario, tente novamente mais tarde.`)
        }
    }

    static async deletarCategoria(req, res){
        try {
            let idDeletar = req.params.id
            res.status(200).json(await CategoriaModel.findByIdAndDelete(idDeletar));

        } catch (error) {
            console.log(`[ CONTAS ] : DELETAR CONTA => ERRO: ${error} `)
            res.status(500).send(`Erro ao deletar conta, tente novamente mais tarde`)
        }
    }
}

module.exports = CategoriaController;