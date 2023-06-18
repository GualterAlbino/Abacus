const TransacaoController = require("../controller/TransacaoController")



class TransacaoRoute{

    constructor(app){
        app.route("/transacao").get(TransacaoController.buscarTodasTransacoes)
        app.route("/transacao/:id").get(TransacaoController.buscarUmaTransacao)
        app.route("/transacao").post(TransacaoController.adicionarTransacao)   
        app.route("/transacao/:id").post(TransacaoController.editarTransacao)
        app.route("/transacao/:id").delete(TransacaoController.deletarTransacao)
        app.route("/transacaoMes/:data").get(TransacaoController.buscarTodasTransacoesDoMes)
        app.route("/transacaoPorPeriodo/:dataInicial/:dataFinal").get(TransacaoController.buscarTodasTransacoesDoPeriodo)
    }
}

module.exports = TransacaoRoute;