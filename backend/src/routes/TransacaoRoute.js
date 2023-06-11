const TransacaoController = require("../controller/TransacaoController")
const MulterMiddleware = require("../middleware/MulterMiddleware")
const upload = require("../config/MulterConfig"); // importe a configuração do Multer


class TransacaoRoute{

    constructor(app){
        app.route("/transacao").get(TransacaoController.buscarTodasTransacoes)
        app.route("/transacao/:id").get(TransacaoController.buscarUmaTransacao)
        app.route("/transacao").post(TransacaoController.adicionarTransacao)   
        app.route("/transacao/:id").post(TransacaoController.editarTransacao)
        app.route("/transacao/:id").delete(TransacaoController.deletarTransacao)
        app.route("/transacaoMes/:data").get(TransacaoController.buscarTodasTransacoesDoMes)
    }
}

module.exports = TransacaoRoute;