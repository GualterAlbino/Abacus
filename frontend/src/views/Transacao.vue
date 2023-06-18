<template>
  <div>
    <v-row>

      <!--Historico de Transações-->
      <v-col cols="12" md="6">
        <v-card class="mt-5 mb-5 ml-5 mr-5">
          <v-data-table :headers="cabecalho" :items="transacoes" sort-by="data" class="elevation-5">

            <!--Parte superior da tabela-->
            <template v-slot:top>
              <v-toolbar flat>


                <v-row class="mt-2">
                  <v-col cols="12" sm="4">
                    <v-select :items="inputMeses" label="Mês" v-model="inputMesFiltro" outlined hide-details></v-select>
                  </v-col>


                  <v-col cols="12" sm="4">
                    <v-text-field outlined v-model="inputAnoFiltro" label="Ano" hide-details></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <!--v-btn color="primary" dark class="mb-2" v-bind="attrs" @click="buscarTransacoes"
                      v-on="on">Buscar</v-btn-->

                    <v-btn color="primary" dark class="mb-2" fab v-bind="attrs" @click="buscarTransacoes" v-on="on">
                      <v-icon dark>
                        mdi-magnify
                      </v-icon>
                    </v-btn>
                  </v-col>


                </v-row>

                <v-dialog v-model="dialog" max-width="500px">

                  <template v-slot:activator="{ on, attrs }">
                    <!--v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">+</v-btn-->

                    <v-btn color="primary" dark class="mt-2" fab v-bind="attrs" v-on="on">
                      <v-icon dark>
                        mdi-plus
                      </v-icon>
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
                          <v-col cols="12" sm="6">
                            <v-text-field outlined v-model="itemEdicao.nome" label="Nome" hide-details></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field outlined v-model="itemEdicao.valor" label="Valor" hide-details></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select :items="tipo" label="Tipo" v-model="itemEdicao.tipo" outlined
                              hide-details></v-select>
                          </v-col>



                          <!--Campo de data(Calendario)-->
                          <v-col cols="12" sm="6">
                            <v-menu ref="menuDataDialog" v-model="menuDataDialog" :close-on-content-click="false"
                              transition="scale-transition" offset-y max-width="290px" min-width="auto">
                              <template v-slot:activator="{ on }">
                                <v-text-field v-model="dataFormatada" label="Data" prepend-icon="mdi-calendar" outlined
                                  readonly v-on="on" hide-details></v-text-field>
                              </template>
                              <v-date-picker v-model="itemEdicao.data" no-title @input="formatarData"></v-date-picker>
                            </v-menu>

                          </v-col>



                          <v-col cols="12" sm="8">
                            <v-select :items="categorias" label="Categoria" v-model="itemEdicao.categoria" outlined
                              hide-details></v-select>
                          </v-col>

                          <!--Inclusão de categorias-->
                          <v-col cols="12" sm="4">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Adicionar</v-btn>
                            </template>


                            <!--Dialog de  inclusão de novas categorias-->
                            <v-dialog v-model="dialogCategoria" max-width="500px">

                              <template v-slot:activator="{ on, attrs }">
                                <!--v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">+</v-btn-->

                                <v-btn color="primary" dark class="mb-2" fab v-bind="attrs" v-on="on">
                                  <v-icon dark>
                                    mdi-plus
                                  </v-icon>
                                </v-btn>
                              </template>


                              <v-card>
                                <v-card-title>
                                  <span class="text-h5">Nova Categoria</span>
                                </v-card-title>

                                <v-card-text>
                                  <v-container>

                                    <!--Dialog de Inclusão-->
                                    <v-row>
                                      <v-col cols="12" sm="12">
                                        <v-text-field outlined v-model="categoriaEdicao.nome" label="Nome"></v-text-field>
                                      </v-col>


                                      <v-row>
                                        <v-col cols="12">
                                          <v-textarea outlined v-model="categoriaEdicao.descricao" label="Descrição"
                                            hide-details></v-textarea>
                                        </v-col>
                                      </v-row>



                                    </v-row>

                                  </v-container>
                                </v-card-text>

                                <!--Botões Salvar e Cancelar da inclusão-->
                                <v-card-actions>
                                  <v-spacer></v-spacer>

                                  <v-btn color="blue darken-1" text @click="fecharCategoria">
                                    Cancelar
                                  </v-btn>

                                  <v-btn color="blue darken-1" text @click="salvarCategoria">
                                    Salvar
                                  </v-btn>

                                </v-card-actions>

                              </v-card>
                            </v-dialog>

                          </v-col>

                          <v-row>
                            <v-col cols="12">
                              <v-textarea outlined label="Observações" v-model="itemEdicao.observacao"
                                hide-details></v-textarea>
                            </v-col>
                          </v-row>


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
                      <v-btn color="primary" text @click="confirmaExclusaoTransacao">Sim</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              </v-toolbar>
            </template>

            <!--Dialog de inclusão de novas categorias-->
            <v-dialog v-model="dialogCategoria" max-width="500px">

              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">+</v-btn>
              </template>


              <v-card>
                <v-card-title>
                  <span class="text-h5">Nova Categoria</span>
                </v-card-title>

                <v-card-text>
                  <v-container>

                    <!--Dialog de Inclusão-->
                    <v-row>
                      <v-col cols="12" sm="12">
                        <v-text-field outlined v-model="categoriaEdicao.nome" label="Nome"></v-text-field>
                      </v-col>


                      <v-row>
                        <v-col cols="12">
                          <v-textarea outlined v-model="categoriaEdicao.descricao" label="Descrição"
                            hide-details></v-textarea>
                        </v-col>
                      </v-row>



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

            <!--Botões: EDITAR e EXCLUIR-->
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>

              <v-icon small @click="dialogExclusão(item)">
                mdi-delete
              </v-icon>

            </template>

            <!--Informação exibida se não houver conta cadastrada no historico de contas-->
            <template v-slot:no-data>
              <v-row justify="center">
                <v-subheader>Nenhuma conta cadastrada</v-subheader>
              </v-row>
            </template>

            <!--Responsavel por definir duas casas decimais no historico de contas-->
            <template v-slot:item.valor="{ item }">
              R$ {{ item.valor }}
            </template>

            <!-- Exibe o nome da categoria em vez do ObjectId 
            <template v-slot:item.categoria="{ item }">
              {{ item.categoria.nome }}
            </template>
            -->

            <!--Aplica a cor ao tipo RECEITA e DESPESA no historico de contas-->
            <template v-slot:item.categoria="{ item }">
              <div :class="item.tipo == 'Receita' ? 'green--text' : 'red--text'">
                {{ item.categoria.nome }}
              </div>
            </template>


          </v-data-table>
        </v-card>





      </v-col>

      <!--Totalizadores ao fim da Página-->
      <v-col cols="12" md="6">
        <div>
          <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
        </div>



        <!--Totalizadores ao fim da página-->
        <v-card color="green" class="my-4">
          <v-card-title>Receitas: R${{ totalReceitas }}</v-card-title>
        </v-card>

        <v-card color="red" class="my-4">
          <v-card-title>Despesas: R${{ totalDespesas }}</v-card-title>
        </v-card>
      </v-col>

    </v-row>
  </div>
</template>



<script>
import swal from 'sweetalert'
import CategoriaHttpUtil from '../util/CategoriaHttpUtil'
import TransacaoHttpUtil from '../util/TransacaoHttpUtil';

export default {
  data: () => ({
    dataFormatada: "",
    dialog: false,
    dialogDelete: false,
    dialogCategoria: false,
    editedIndex: -1,
    totalDespesas: 1875.79,
    totalReceitas: 2005.68,
    transacaoExluir: null,

    inputMeses: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    inputMesFiltro: '06',
    inputAnoFiltro: new Date().getFullYear(),


    transacao: {},
    categorias: ["Fast-Food", "Água", "Luz", "Internet", "Mercado", "Açougue", "Skin", "Roupa"],
    tipo: ["Receita", "Despesa"],
    transacoes: [],
    itemEdicao: { nome: '', valor: '', tipo: '', data: '', categoria: '', descricao: '', dia: '', mes: '', ano: '' },
    itemInput: { nome: '', valor: '', tipo: '', data: '', categoria: '', descricao: '' },
    categoriaEdicao: { nome: '', descricao: '' },
    cabecalho: [
      { text: 'Nome', align: 'start', value: 'nome', },
      { text: 'Valor', value: 'valor' },
      { text: 'Categoria', value: 'categoria' },
      { text: 'Data', value: 'data' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],



    //Indices do Gráfico
    options: {
      xaxis: {
        categories: ["Fast-Food", "Água", "Luz", "Internet", "Mercado", "Açougue", "Skin", "Roupa"]
      }
    },
    series: [{
      data: [150, 120, 160, 100, 600, 257.86, 50, 120]
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
    //this.AtualizaGrafico()
  },

  methods: {
    initialize() {

      this.buscarTransacoes()
      this.buscarCategorias()
      //this.AtualizaGrafico()

    },


    //==>Função que busca todas as categorias cadastradas
    buscarCategorias() {
      CategoriaHttpUtil.buscarTodasCategorias().then(categorias => {
        this.categorias = this.retornarElementos(categorias);

      }).catch(() => {
        swal({
          title: "Erro interno!",
          text: "Não foi possivel carregar as categorias cadastradas.",
          icon: "error"
        });
      });
    },

    //==> Função que trata o retorno da busca pelas categorias [Object ID]
    retornarElementos(array) {
      const resultado = [];
      for (const elemento of array) {
        const { _id, nome } = elemento;
        resultado.push({ value: _id, text: nome });
      }
      console.log(JSON.stringify(resultado));
      return resultado;
    },

    //==>Fonção que busca todas as transações cadastradas
    buscarTransacoes() {
      let data = `00-${this.inputMesFiltro}-${this.inputAnoFiltro}`

      TransacaoHttpUtil.buscarTodasTransacoesDoMes(data).then(transacoes => {
        this.transacoes = transacoes
        //console.log(JSON.stringify(this.transacoes));
        this.calcularTotal()

      }).catch((error) => {
        swal({
          title: "Erro interno!",
          text: "Não foi possivel carregar as transações cadastradas.",
          icon: "error"
        });
        console.log(JSON.stringify(`[BUSCAR TRANSAÇÕES DO MES] => ${error}`));
      });
    },

    salvarCategoria() {
      let dia = new Date().getUTCDate();
      let mes = new Date().getUTCMonth();
      let ano = new Date().getFullYear();
      this.categoriaEdicao.data = `${dia}/0${mes + 1}/${ano}`
      CategoriaHttpUtil.adicionarCategoria(this.categoriaEdicao).then(resposta => {
        if ((resposta.status) < 299) {
          swal({
            title: "Feito!",
            text: "Categoria adicionada com sucesso!",
            icon: "success"
          })

          this.buscarCategorias()
          this.fecharCategoria()
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

    //==>Grava a transação
    salvarTransacao() {
      let DataSemFormatar //Variavel necessaria para retornar ao valor original (Componente calendario não funciona com a data formatada)

      DataSemFormatar = this.itemEdicao.data
      this.itemEdicao.data = this.dataFormatada
      TransacaoHttpUtil.adicionarTransacao(this.itemEdicao).then(resposta => {
        if ((resposta.status) < 299) {
          swal({
            title: "Feito!",
            text: "Transação adicionada com sucesso!",
            icon: "success"
          })

          this.initialize()
          //this.cancelar()
          this.itemEdicao.data = DataSemFormatar
        }


      }).catch((error) => {
        swal({
          title: "Nada feito!",
          text: "Não foi possivel cadastrar sua transação.",
          icon: "error"
        });
        console.log(JSON.stringify(`[ADICIONAR TRANSAÇÃO] => ${error}`));

      });
    },


    //==> Função que realiza o calculo geral das receitas e despesas
    calcularTotal() {
      this.totalReceitas = 0;
      this.totalDespesas = 0;

      this.transacoes.forEach(transacao => {
        if (transacao.tipo === 'Receita') {
          this.totalReceitas += parseFloat(transacao.valor);
        } else if (transacao.tipo === 'Despesa') {
          this.totalDespesas += parseFloat(transacao.valor);
        }
      });
    },


    AtualizarGrafico() {
      const categories = [];
      const data = [];

      // Iterar sobre as transações
      for (const transacao of this.transacoes) {
        const categoria = transacao.categoria.nome;
        const valor = transacao.valor;

        // Verificar se a categoria já existe no array de categorias
        const categoriaIndex = categories.indexOf(categoria);
        if (categoriaIndex === -1) {
          // Se não existir, adicioná-la ao array de categorias
          categories.push(categoria);
          // Inicializar o valor correspondente no array de data
          data.push(valor);
        } else {
          // Se já existir, adicionar o valor ao valor existente no array de data
          data[categoriaIndex] += valor;
        }
      }

      // Atualizar o estado do gráfico com as novas categorias e dados
      this.options.xaxis.categories = categories;
      this.series[0].data = data;
    },

    editItem(item) {
      this.editedIndex = this.transacoes.indexOf(item)
      this.itemEdicao = Object.assign({}, item)
      this.dialog = true

    },

    editarTransacao() {
      console.log("Item edição:")
      console.log(this.itemEdicao)
      TransacaoHttpUtil.editarTransacao(this.itemEdicao)
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
      this.transacaoExluir = item
    },

    //==>Operação de exclusão
    confirmaExclusaoTransacao() {
      TransacaoHttpUtil.deletarTransacao(this.transacaoExluir)
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
          console.log(JSON.stringify(`[EXCLUIR TRANSAÇÃO] => ${error}`))
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
        this.salvarTransacao()
      } else {
        this.editarTransacao()
      }

      this.dialog = false
    },

    formatarData() {
      const [ano, mes, dia] = this.itemEdicao.data.split('-')
      this.dataFormatada = `${dia}/${mes}/${ano}`;
      this.itemEdicao.dia = dia
      this.itemEdicao.mes = mes
      this.itemEdicao.ano = ano
      //this.dataFormatada = DateFormatterUtil.ISOtoBR(this.contaAtual.data)
      this.menuDataDialog = false
    }

  },
}
</script>
