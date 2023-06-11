const API_URL = "http://localhost:3000/categoria"

import axios from "axios"

export default {
    async buscarTodasCategorias(){
        return axios.get("http://localhost:3000/categoria").then((response) => response.data)

    },
    async buscarUmaCategoria(categoria){
        return axios.get("http://localhost:3000/categoria" +`/${categoria._id}`).then((response) => response.data)

    },

    async adicionarCategoria(categoria){
        return axios.post("http://localhost:3000/categoria", categoria).then((response) => response)
    },

    async editarCategoria(categoria){
        return axios.post("http://localhost:3000/categoria"+`/${categoria._id}`,categoria).then((response) => response)
    },

    async deletarCategoria(categoria){
        return axios.delete("http://localhost:3000/categoria"+`/${categoria._id}`).then((response) => response)
    }
}