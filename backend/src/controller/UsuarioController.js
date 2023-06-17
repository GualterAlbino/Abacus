

const mongoose = require("mongoose");
const UsuarioModel = mongoose.model("UsuarioModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Importação da SECRET de criptografia do JsonWebToken
const dotenv = require('dotenv')
dotenv.config();

const SECRET = process.env.SECRET_KEY



class UsuarioController {


    static async registrarUsuario(req, res) {

        //Delega os dados do Body
        let { nome, email, senha } = req.body

        try {

            //Recebe o e-mail informado e valida se já está em uso
            let verificaEmail = await UsuarioModel.find({ email });
            if (verificaEmail.length >= 1) {
                return res.status(409).json({ message: `Este e-mail já está sendo utilizado!` })
            }


            //Recebe as informações enviadas pelo body, realiza o hash com a senha e armazena tudo no banco
            const senhaComHash = await bcrypt.hash(senha, 8)
            const novoUsuario = new UsuarioModel({
                nome,
                email,
                senha: senhaComHash
            });
            let usuario = await novoUsuario.save();


            //Gera o token com base nas informações do usuario presentes no banco e salva novamente
            const token = jwt.sign({ _id: usuario._id, nome: usuario.nome, email: usuario.email }, SECRET);
            usuario.tokens = usuario.tokens.concat({ token })
            await usuario.save()


            res.status(201).json({ message: "Usuario criado com sucesso!", usuario, token });

        } catch (error) {
            console.log(`[ REGISTRAR USUARIO ] : ERRO => ${error}`);
            res.status(500).json({ msg: `Erro interno, tente novamente mais tarde...` })
        }


    }


    static async loginUsuario(req, res) {

        //Delega os dados do Body
        let { email, senha } = req.body

        
        //Validar se o usuario existe
        const usuarioExistente = await UsuarioModel.findOne({ email: email })
        if (!usuarioExistente) {
            return res.status(404).json({ msg: "Usuario não encontrado!" })
        }

        //Valida senha
        const validaSenha = await bcrypt.compare(senha, usuarioExistente.senha) //Compara a senha enviada com a senha existente no banco e retorna TRUE ou FALSE
        if (!validaSenha) {
            return res.status(422).json({ msg: 'Senha incorreta!' });
        }


        try {

            const token = jwt.sign({ id: usuarioExistente._id }, SECRET)

            res.status(200).json({ msg: `Autenticação realizada com sucesso!`, token })

        } catch (error) {
            console.log(`[ TOKEN ] : ERRO => ${error}`)
            res.status(500).json({ msg: `Erro interno, tente novamente mais tarde...` })
        }

    }

    //Função da rota privada
    static async acessoUsuario(req, res) {
        const id = req.params.id

        //Verifica se o usuario existe
        const usuario = await UsuarioModel.findById(id, '-senha')//Ao utilizar o '-senha', ele exlcui esse parâmetro do retorno

        if (!usuario) {
            return res.status(404).json({ msg: "Usuario não encontrado!" })

        } else {
            return res.status(200).json({ msg: "Bem-vindo!", usuario })
        }
    }

    static async deletarUsuario(req, res) {
        //Delega os dados do Body
        let { email, senha } = req.body

        

        //Validar se o usuario existe
        const usuarioExistente = await UsuarioModel.findOne({ email: email })
        if (!usuarioExistente) {
            return res.status(404).json({ msg: "Usuario não encontrado!" })
        }

        const senhaComHash = await bcrypt.hash(senha, 8)

        //Valida senha
        const validaSenha = await bcrypt.compare(senha, usuarioExistente.senha) //Compara a senha enviada com a senha existente no banco e retorna TRUE ou FALSE
        if (!validaSenha) {
            return res.status(422).json({ msg: 'Senha incorreta!' });
        }


        try {

            const token = jwt.sign({ id: usuarioExistente._id }, SECRET)
            
            //res.status(200).json({ msg: `Autenticação realizada com sucesso!`, token })

            const usuario = await UsuarioModel.findOneAndRemove({ email: email })

            if (!usuario) {
                return res.status(404).json({ msg: "Usuario não encontrado!" })
    
            } else {
                return res.status(200).json({ msg: "Usuario deletado!" })
            }

        } catch (error) {
            console.log(`[ TOKEN EXCLUSÃO ] : ERRO => ${error}`)
            res.status(500).json({ msg: `Erro interno, tente novamente mais tarde...` })
        }

    }
}

module.exports = UsuarioController;














/*
const mongoose = require("mongoose");
const UsuarioModel = mongoose.model("UsuarioModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Importação da SECRET de criptografia do JsonWebToken
const dotenv = require('dotenv')
dotenv.config();

const SECRET = process.env.SECRET_KEY

class UsuarioController {

        static async registrarNovoUsuario(){

        }


}

module.exports = UsuarioController;
*/