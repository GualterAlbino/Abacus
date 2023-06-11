class IndexController{
    static async inicializacao(req, res){

        let dia = new Date().getUTCDate();
        let mes = new Date().getUTCMonth() ;
        let ano = new Date().getFullYear();
        
        try {
            res.status(200).send({
                sucess: true,
                message: `API em execução...`,
                date: `${dia} / ${mes + 1} / ${ano}`
            })

        } catch (error) {
            console.log(`[ INDEX CONTROLLER ]: INICIALIZAÇÃO DA APLICAÇÃO => ERRO: ${error}`)
            res.status(500).json({ message: "Erro interno, tente novamentr mais tarde" })
        }
            
       
    }
}

module.exports = IndexController;



