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
            //console.log(data)
            const partesData = data.split('-'); // Divide a data em dia, mês e ano
            const QueryMes = partesData[1]; // Obtém o mês como número
            const QueryAno = partesData[2]; // Obtém o ano como número
         
            //Como o operador "IGUAL A" exige que utilize o FindOnde, foi necessario realizar o maior igual e menor igual para reproduzir esse comportamento
            res.status(200).json(await TransacaoModel.find(
                { $and: [
                    {mes : {$gte: QueryMes}}, {mes : {$lte: QueryMes}},
                    {ano : {$gte: QueryAno}},{ano : {$lte: QueryAno}} 
                ]}
            ).populate('categoria'))

           
    
            
        } catch (error) {
            console.log("[ TRANSAÇÃO ] : BUSCAR TODAS TRANSAÇÕES => ERRO" + error);
            res.status(500).send("Erro ao buscar transações");
        }
    }

    static async buscarTodasTransacoesDoPeriodo(req, res) {
        try {
            // Recebe a data fornecida na requisição
            const {dataInicial, dataFinal } = req.params

            //console.log("Data inicial:" + dataInicial)
            //console.log("Data Final:" + dataFinal)
            

            const partesDataInicial = dataInicial.split('-'); // Divide a data em dia, mês e ano
            const QueryDiaInicial = partesDataInicial[0]  // Obtém o dia
            const QueryMesInicial = partesDataInicial[1]; // Obtém o mês 
            const QueryAnoInicial = partesDataInicial[2]; // Obtém o ano 

            const partesDataFinal = dataFinal.split('-'); // Divide a data em dia, mês e ano
            const QueryDiaFinal = partesDataFinal[0]  // Obtém o dia
            const QueryMesFinal = partesDataFinal[1]; // Obtém o mês 
            const QueryAnoFinal = partesDataFinal[2]; // Obtém o ano 
         
            //Como o operador "IGUAL A" exige que utilize o FindOnde, foi necessario realizar o maior igual e menor igual para reproduzir esse comportamento
            res.status(200).json(await TransacaoModel.find(
                { $and: [
                    {dia : {$gte :QueryDiaInicial}}, {dia : {$lte: QueryDiaFinal}},
                    {mes : {$gte: QueryMesInicial}}, {mes : {$lte: QueryMesFinal}},
                    {ano : {$gte: QueryAnoInicial}}, {ano : {$lte: QueryAnoFinal}} 
                ]}
            ).populate('categoria'))

           
    
            
        } catch (error) {
            console.log("[ BUSCAR TRANSAÇÃO POR PERIODO ] : BUSCAR TRANSAÇÕES => ERRO" + error);
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