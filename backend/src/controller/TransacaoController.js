const Mongoose = require("mongoose")
const TransacaoModel = Mongoose.model("TransacaoModel")
const multer = require("multer");



class TransacaoController {



    static async buscarTodasTransacoes(req, res){
        try {
            res.status(200).json(await TransacaoModel.find().populate('categoria'))


           
        } catch (error) {
            console.log("[ TRANSAÇÃO ] : BUSCAR TODAS TRANSAÇÕES => ERRO" + error);
            res.status(500).send("Erro ao bsucar transações")
        }
    }

    static async buscarTodasTransacoesDoMes(req, res) {
        try {
            const data = req.params.data; // Recebe a data fornecida na requisição
            
            const partesData = data.split('/'); // Divide a data em dia, mês e ano
            const mes = parseInt(partesData[1]); // Obtém o mês como número
            const ano = parseInt(partesData[2]); // Obtém o ano como número
    
            const transacoes = await TransacaoModel.aggregate([
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: [{ $month: { $toDate: "$data" } }, mes] },
                                { $eq: [{ $year: { $toDate: "$data" } }, ano] }
                            ]
                        }
                    }
                },
                { $lookup: { from: "categorias", localField: "categoria", foreignField: "_id", as: "categoria" } },
                { $unwind: "$categoria" }
            ]);
    
            res.status(200).json(transacoes);
        } catch (error) {
            console.log("[ TRANSAÇÃO ] : BUSCAR TODAS TRANSAÇÕES => ERRO" + error);
            res.status(500).send("Erro ao buscar transações");
        }
    }


    static async buscarUmaTransacao(req, res){
        try {
            let idBuscar = req.params.id
            res.status(200).json(await TransacaoModel.findById(idBuscar));

        } catch (error) {
            console.log(`[ TRANSAÇÃO ] : DELETAR TRANSAÇÃO => ERRO: ${error} `)
            res.status(500).send(`Erro ao deletar transação, tente novamente mais tarde`)
        }
    }

    
    static async adicionarTransacao(req, res){
        try {
          let transacao = req.body
          res.status(200).json(await TransacaoModel.create(transacao)) 
        } catch (error) {
            console.log(`[ TRANSAÇAO ] : ADICIONAR TRANSAÇÃO     => ERRO: ${error}`)
            res.status(500).send(`Erro ao adicionar transação, tente novamente mais tarde`)
            
            
        }
    }
    
    static async editarTransacao(req, res){
        try {
            let transacao = req.body
            
            res.status(200).json(await TransacaoModel.findByIdAndUpdate(req.body._id, transacao));
        } catch (error) {
            console.log(`[ TRANSAÇÃO ] : EDITAR TRANSAÇÃO => ERRO: ${error} `)
            res.status(500).send(`Erro ao editar transação, tente novamente mais tarde`)
            
        }
    }

    static async deletarTransacao(req, res){
        try {
            let idDeletar = req.params.id
            res.status(200).json(await TransacaoModel.findByIdAndDelete(idDeletar));

        } catch (error) {
            console.log(`[ TRANSAÇÃO ] : DELETAR TRANSAÇÃO => ERRO: ${error} `)
            res.status(500).send(`Erro ao deletar transação, tente novamente mais tarde`)
        }
    }
}

module.exports = TransacaoController