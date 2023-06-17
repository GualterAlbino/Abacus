<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row justify="center">

          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="telaAtual">


                <v-window-item :value="1" class="mb-3"> <!--Janela de LOGIN-->
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 primary--text text--accent-3">Abacus</h1>

                        <h4 class="text-center mt-4">Realize o login ou crie uma conta!</h4>
                        <v-form>
                          <v-text-field label="E-mail" prepend-icon="mdi-email" type="text" color="primary accent-3"
                            v-model="usuarioInputLogin.email" :rules="emailRules" />

                          <v-text-field label="Senha" prepend-icon="mdi-lock" type="password" color="primary accent-3"
                            v-model="usuarioInputLogin.senha" :rules="senhaRules" />

                        </v-form>
                        <h3 class="text-center mt-4">Esqueceu a senha ?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="primary" dark @click="loginUsuario">Entrar</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="primary accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Olá!</h1>
                        <h5 class="text-center">Crie uma conta conosco e inicie seu controle de contas.</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="limparInput, telaAtual++">Realizar cadastro</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>


                <v-window-item :value="2" class="mb-3"> <!--Janela de CADASTRO-->
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="primary accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Seja bem-vindo!</h1>
                        <h5 class="text-center">Caso já possua uma conta, basta fazer o login</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="telaAtual--">Fazer Login</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 primary--text text--accent-3">Crie sua conta</h1>

                        <h4 class="text-center mt-4">Falta pouco para iniciar seu controle de contas!</h4>
                        <v-form>
                          <v-text-field label="Nome" prepend-icon="mdi-account" type="text" color="primary accent-3"
                            v-model="usuarioInputCadastro.nome" :rules="nomeRules" />
                          <v-text-field label="E-mail" prepend-icon="mdi-email" type="text" color="primary accent-3"
                            v-model="usuarioInputCadastro.email" :rules="emailRules" />

                          <v-text-field label="Senha" prepend-icon="mdi-lock" type="password" color="primary accent-3"
                            v-model="usuarioInputCadastro.senha" :rules="senhaRules" :count=6 />
                        </v-form>

                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="primary accent-3" dark @click="registrarUsuario">Cadastrar</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
//import { validationMixin } from 'vuelidate'
//import { required, maxLength, email } from 'vuelidate/lib/validators'

import UsuarioHttpUtil from '../util/UsuarioHttpUtil';


export default {
  data: () => ({
    telaAtual: 1, //Varivael que permite a nevegação de telas com o uso dessa FLAG
    usuarioInputCadastro: {
      nome: '',
      email: '',
      senha: ''
    },

    usuarioInputLogin: {
      email: '',
      senha: ''
    },

    emailRules: [
      v => !!v || '*O campo e-mail é obrigatório!',
      v => /.+@.+/.test(v) || 'E-mail inválido!',
    ],
    nomeRules: [
      v => !!v || '*O campo nome é obrigatório!',
      v => v.length >= 4 || '*O nome deve conter pelo menos 4 caracteres',
    ],
    senhaRules: [
      v => !!v || '*O campo senha é obrigatório!',
      v => v.length >= 6 || '*A senha deve conter pelo menos 6 caracteres',
    ],
  }),

  methods: {
    loginUsuario() {
      UsuarioHttpUtil.loginUsuario(this.usuarioInputLogin).then(resposta => {
        
        if ((resposta.status) < 299) {

          this.$router.push('/contas')
        }

      }).catch(error => {
        swal({
          title: "Acesso Negado!",
          text: "Credenciais inválidas.",
          icon: "error"
        });
        console.log(JSON.stringify(`[LOGIN USUARIO] => ${error}`));
      })
    },

    registrarUsuario() {
      UsuarioHttpUtil.registrarUsuario(this.usuarioInputCadastro).then(resposta => {
   
        if ((resposta.status) < 299) {
          swal({
            title: "Feito!",
            text: "Usuário criado com sucesso!",
            icon: "success"
          })
          this.telaAtual--
        }

      }).catch(error => {

        if ((this.status) == 409) {
          swal({
            title: "Acesso Negado!",
            text: "O e-mail já está sendo utilizado.",
            icon: "error"
          });

        } else {
          swal({
            title: "Acesso Negado!",
            text: "Credenciais inválidas.",
            icon: "error"
          });
        }

        console.log(JSON.stringify(`[REGISTRO DE USUARIO] => ${error}`));
      })
    },
  },

  props: {
    source: String
  }
};
</script>


<style></style>