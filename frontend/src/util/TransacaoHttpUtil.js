const API_URL = "http://localhost:3000/produto"

import axios from "axios"

export default {

    async buscarTodasTransacoes(){
        return axios.get("http://localhost:3000/transacao").then((response) => response.data)

    },

    async buscarTodasTransacoesDoMes(data){
        return axios.get("http://localhost:3000/transacaoMes" +`/${data}`).then((response) => response.data)

    },
    async buscarTodasTransacoesDoPeriodo(dataInicial, dataFinal){
        return axios.get("http://localhost:3000/transacaoPorPeriodo" +`/${dataInicial}`+ `/${dataFinal}`).then((response) => response.data)

    },
    async buscarUmaTransacao(transacao){
        return axios.get("http://localhost:3000/transacao" +`/${transacao._id}`).then((response) => response.data)

    },

    async adicionarTransacao(transacao){
        return axios.post("http://localhost:3000/transacao", transacao).then((response) => response)
    },

    async editarTransacao(transacao){
        return axios.post("http://localhost:3000/transacao"+`/${transacao._id}`,transacao).then((response) => response)
    },

    async deletarTransacao(transacao){
        return axios.delete("http://localhost:3000/transacao"+`/${transacao._id}`).then((response) => response)
    }
}