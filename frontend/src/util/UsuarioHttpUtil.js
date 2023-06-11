const API_URL = "http://localhost:3000/usuario"

import axios from "axios"

export default {

    async login(usuario){
        return axios.get("http://localhost:3000/usuario"+ `/${usuario}`).then((response) => response)

    },
    async registrarUsuario(usuario){
        return axios.get("http://localhost:3000/usuario" +`/${usuario}`).then((response) => response)

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