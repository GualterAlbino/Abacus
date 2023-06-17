<template>
  <div>
    <v-row>

      <!--Historico de Categorias-->
      <v-col cols="12" md="12">
        <v-card class="mt-5 mb-5 ml-5 mr-5">
          <v-data-table :headers="cabecalho" :items="categorias" sort-by="data" class="elevation-5">
            <!--Parte superior da tabela-->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Categorias</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">

                  <template v-slot:activator="{ on, attrs }">
                    <!--v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">+</v-btn-->

                    <v-btn color="primary" dark class="mx-2" fab v-bind="attrs" v-on="on">
                      <v-icon dark> mdi-plus</v-icon>
                    </v-btn>
                    
                  </template>


                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>

                        <!--Dialog de Inclusão e Edição-->
                        <v-row>
                          <v-col cols="12" sm="12">
                            <v-text-field outlined v-model="itemEdicao.nome" label="Nome" hide-details></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12">
                            <v-textarea outlined v-model="itemEdicao.descricao" label="descricao"
                              hide-details></v-textarea>
                          </v-col>


                        </v-row>

                      </v-container>
                    </v-card-text>

                    <!--Botões Salvar e Cancelar da inclusão-->
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="blue darken-1" text @click="close">
                        Cancelar
                      </v-btn>

                      <v-btn color="blue darken-1" text @click="salvar">
                        Salvar
                      </v-btn>

                    </v-card-actions>

                  </v-card>
                </v-dialog>



                <!--Dialog de confirmação de exclusão-->
                <v-dialog v-model="dialogDelete" width="auto">
                  <v-card>
                    <v-card-title class="text-h5">Tem certeza que deseja excluir?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="fecharDialogExclusao">Não</v-btn>
                      <v-btn color="primary" text @click="confirmaExclusaoCategoria">Sim</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              </v-toolbar>
            </template>



            <!--Botões: EDITAR e EXCLUIR-->
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>

              <v-icon small @click="dialogExclusão(item)">
                mdi-delete
              </v-icon>

            </template>

            <!--Informação exibida se não houver categoria cadastrada no historico de categorias-->
            <template v-slot:no-data>
              <v-row justify="center">
                <v-subheader>Nenhuma categoria cadastrada</v-subheader>
              </v-row>
            </template>


          </v-data-table>
        </v-card>





      </v-col>



    </v-row>
  </div>
</template>
  
  
  
<script>
import swal from 'sweetalert'
import CategoriaHttpUtil from '../util/CategoriaHttpUtil'

export default {
  data: () => ({
    dataFormatada: "",
    dialog: false,
    dialogDelete: false,
    dialogCategoria: false,
    editedIndex: -1,
    categoriaExcluir: null,

    categorias: [],
    itemEdicao: { nome: '', descricao: '', data: '' },
    itemInput: { nome: '', descricao: '', data: '' },
    cabecalho: [
      { text: 'Ações', value: 'actions', sortable: false },
      { text: 'Nome', value: 'nome', },
      { text: 'Data de Inclusão', value: 'data' },
      { text: 'Descrição', value: 'descricao' },

    ],



    //Indices do Gráfico
    options: {
      xaxis: {
        categories: ["Fast-Food", "Água", "Luz", "Internet", "Mercado", "Açougue", "Skin", "Roupa"]
      }
    },
    series: [{
      data: [350, 150, 160, 100, 600, 257.86, 50, 120]
    }]



  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nova Transação' : 'Editar Transação'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.buscarCategorias()
    },


    //==>Função que busca todas as categorias cadastradas
    buscarCategorias() {
      CategoriaHttpUtil.buscarTodasCategorias().then(categorias => {
        this.categorias = categorias

      }).catch(() => {
        swal({
          title: "Erro interno!",
          text: "Não foi possivel carregar as categorias cadastradas.",
          icon: "error"
        });
      });
    },



    salvarCategoria() {
      let dia = new Date().getUTCDate();
      let mes = new Date().getUTCMonth();
      let ano = new Date().getFullYear();
      this.itemEdicao.data = `${dia}/0${mes + 1}/${ano}`

      CategoriaHttpUtil.adicionarCategoria(this.itemEdicao).then(resposta => {
        if ((resposta.status) < 299) {
          swal({
            title: "Feito!",
            text: "Categoria adicionada com sucesso!",
            icon: "success"
          })
          //this.initialize()
          this.buscarCategorias()
          //this.fecharCategoria()
        }

      }).catch((error) => {
        swal({
          title: "Nada feito!",
          text: "Não foi possivel cadastrar sua categoria.",
          icon: "error"
        });
        console.log(JSON.stringify(`[ADICIONAR CATEGORIA] => ${error}`));
      });
    },




    editItem(item) {
      this.itemEdicao = Object.assign({}, item)
      this.dialog = true
    },

    editarCategoria() {

      CategoriaHttpUtil.editarCategoria(this.itemEdicao)

        .then(resposta => {
          if (resposta.status < 299) {
            swal({
              title: "Feito!",
              text: "Produto editado com sucesso!",
              icon: "success"
            });

            this.initialize();
          }


        }).catch((error) => {
          swal({
            title: "Nada feito!",
            text: "Não foi possivel realizar a edição.",
            icon: "error"
          });
          console.log(JSON.stringify(`[EDITAR PRODUTO] => ${error}`))

        });
    },



    //==>Dialog de confirmar exclusão
    dialogExclusão(item) {
      this.dialogDelete = true
      this.categoriaExcluir = item
    },

    //==>Operação de exclusão
    confirmaExclusaoCategoria() {
      CategoriaHttpUtil.deletarCategoria(this.categoriaExcluir)
        .then(resposta => {
          if (resposta.status < 299) {
            swal({
              title: "Feito!",
              text: "Transação excluída com sucesso!",
              icon: "success"
            });
            this.confirmarExclusaoDialog = false;
            this.initialize();
          }

          this.fecharDialogExclusao()
        }).catch((error) => {
          swal({
            title: "Nada feito!",
            text: "Não foi possivel realizar a exclusão.",
            icon: "error"
          });
          console.log(JSON.stringify(`[EXCLUIR CATEGORIA] => ${error}`))
        });
    },

    //==>Fecha a tela de exclusão
    fecharDialogExclusao() {
      this.dialogDelete = false
    },


    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.itemEdicao = Object.assign({}, this.itemInput)
        this.editedIndex = -1
      })
    },

    //==> Fecha a tela de inclusão de categoria
    fecharCategoria() {
      this.dialogCategoria = false

    },

    //==> Função chamada ao apertar o botão SALVAR
    salvar() {
      //==> Verifica se o produto já existe para salvar, se sim, ele o edita
      if (!this.itemEdicao._id) {
        this.salvarCategoria()
      } else {
        this.editarCategoria()
      }

      this.dialog = false
    },

    formatarData() {
      const [ano, mes, dia] = this.contaAtual.data.split('-')
      this.dataFormatada = `${dia}/${mes}/${ano}`;
      //this.dataFormatada = DateFormatterUtil.ISOtoBR(this.contaAtual.data)
      this.menuDataDialog = false
    },
    formatarData() {
      const [ano, mes, dia] = this.itemEdicao.data.split('-')
      this.dataFormatada = `${dia}/${mes}/${ano}`;
      //this.dataFormatada = DateFormatterUtil.ISOtoBR(this.contaAtual.data)
      this.menuDataDialog = false
      this.itemEdicao.data = this.dataFormatada
    }
  },
}
</script>
  