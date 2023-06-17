const API_URL = "http://localhost:3000/usuario"

import axios from "axios"

export default {

    async loginUsuario(usuario){
        return axios.post("http://localhost:3000/usuario/login",usuario).then((response) => response)

    },
    async registrarUsuario(usuario){
        return axios.post("http://localhost:3000/usuario/registrar",usuario).then((response) => response)

    },

    async editarUsuario(usuario){
        return axios.post("http://localhost:3000/usuario/editar"+`/${usuario._id}`,transacao).then((response) => response)
    },

    async deletarUsuario(usuario){
        return axios.post("http://localhost:3000/usuario/deletar",usuario).then((response) => response)
    }
}