<template>
    <v-container fluid>
        <v-card elevation="24" class="pt-5 ml-10 mr-10 mb-10">
            <v-card-title class="justify-center">Configurações</v-card-title>

            <v-card class="pl-10 pt-5 pb-5">
                <v-row>

                    <v-col cols="12" sm="12">
                        <v-switch v-model="switchNotificacoes" @click="alterar" :label="`Notificações`"></v-switch>
                    </v-col>

                    <v-col cols="12" sm="12">

                        <v-btn class="mx-2" fab dark large color="primary">
                            <v-icon dark>
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                        Editar Ususario

                    </v-col>

                    <v-col cols="12" sm="12">
                        <v-btn class="mx-2" fab dark large color="primary" @click="dialogExclusao">
                            <v-icon dark>
                                mdi-delete-empty
                            </v-icon>
                        </v-btn>
                        Excluir Conta

                    </v-col>


                    <!--Dialog de confirmação de exclusão-->
                    <v-dialog v-model="dialogDelete" width="auto">
                        <v-card>

                            <v-col cols="12" md="12">
                                <v-card-text class="mt-12">
                                    <h1 class="text-center display-2 primary--text text--accent-3">Tem certeza que deseja
                                        excluir?</h1>

                                    <h4 class="text-center mt-4">Essa ação é irreversivel! Confirme sua senha e e-mail para
                                        prosseguir</h4>
                                    <v-form>

                                        <v-text-field label="E-mail" prepend-icon="mdi-email" type="text"
                                            color="primary accent-3" v-model="usuario.email" />

                                        <v-text-field label="Senha" prepend-icon="mdi-lock" type="password"
                                            color="primary accent-3" v-model="usuario.senha" />
                                    </v-form>

                                </v-card-text>

                            </v-col>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text @click="fecharDialogExclusao">Cancelar</v-btn>
                                <v-btn color="primary" text @click="excluirConta">Excluir</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>




                </v-row>






            </v-card>

            <v-card-actions>
                <v-spacer></v-spacer>




            </v-card-actions>

        </v-card>

    </v-container>
</template>

<script>
import swal from 'sweetalert';
import UsuarioHttpUtil from '../util/UsuarioHttpUtil';

export default {
    data() {
        return {
            switchNotificacoes: false,
            dialogDelete: false,
            usuario: { email: '', senha: '' }
        }
    },

    methods: {
        alterar() {
            if (this.switchNotificacoes == true) {
                swal({
                    title: "Opção Indisponível no momento!",
                    text: "A opção estará disponível em atualizações futuras.",
                    icon: "error"
                });
                this.switchNotificacoes = false
            }
        },


        excluirConta() {
            
            UsuarioHttpUtil.deletarUsuario(this.usuario).then(resposta => {
                
                if ((resposta.status) < 299) {
                    swal({
                        title: "Adeus!",
                        text: "Conta excluida com sucesso!",
                        icon: "success"
                    });
                    this.$router.push('/')
                }

            }).catch(error => {
                swal({
                    title: "Erro!",
                    text: "Ocorreu um erro ao tentar excluir!",
                    icon: "error"
                });
                console.log(JSON.stringify(`[EXCLUSÃO DE USUARIO] => ${error}`));
            })
        },

        //==>Dialog de confirmar exclusão
        dialogExclusao() {
            this.dialogDelete = true
        },

        //==>Fecha a tela de exclusão
        fecharDialogExclusao() {
            this.dialogDelete = false
        },
    }


}
</script>