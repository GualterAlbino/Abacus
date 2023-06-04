<template>
  <div>
    <v-row>

      <!--Historico de Contas-->
      <v-col cols="12" md="6">
        <v-card class="mt-5 mb-5 ml-5 mr-5">
          <v-data-table :headers="cabecalho" :items="transacoes" sort-by="calories" class="elevation-5">
            <!--Parte superior da tabela-->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Transações</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">

                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Adicionar</v-btn>
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
                            <v-text-field v-model="itemEdicao.name" label="Nome"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field v-model="itemEdicao.valor" label="Valor"></v-text-field>
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





                          <v-col cols="12" sm="6">
                            <v-select :items="categoria" label="Categoria" v-model="itemEdicao.categoria" outlined
                              hide-details></v-select>
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

                      <v-btn color="blue darken-1" text @click="save">
                        Salvar
                      </v-btn>

                    </v-card-actions>

                  </v-card>
                </v-dialog>


                <v-dialog v-model="dialogDelete" width="auto">
                  <v-card>
                    <v-card-title class="text-h5">Tem certeza que deseja excluir?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="closeDelete">Não</v-btn>
                      <v-btn color="primary" text @click="deleteItemConfirm">Sim</v-btn>
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

              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>

            </template>

            <!--Mensagem exibida se não houver informações na tabela-->
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">
                Reset
              </v-btn>
            </template>

            <!--Responsavel por definir duas casas decimais no historico de contas-->
            <template v-slot:item.valor="{ item }">
              R$ {{ item.valor }}
            </template>

          </v-data-table>
        </v-card>



        

      </v-col>

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


export default {
  data: () => ({
    dataFormatada: "",
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    totalDespesas:1875.79,
    totalReceitas:2005.68,


    categoria: ["Fast-Food", "Água", "Luz", "Internet", "Mercado", "Açougue", "Skin", "Roupa"],
    tipo: ["Receita", "Despesa"],
    transacoes: [],
    itemEdicao: { nome: '', valor: '', tipo: '', data: '', categoria: '', descricao: '' },
    itemInput: { nome: '', valor: '', tipo: '', data: '', categoria: '', descricao: '' },
    cabecalho: [
      { text: 'Nome', align: 'start', value: 'nome', },
      { text: 'Valor', value: 'valor' },
      { text: 'Categoria', value: 'categoria' },
      { text: 'Data', value: 'data' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    
    
    
    //Indices do Fráfico
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
    this.AtualizaGrafico()
  },

  methods: {
    initialize() {
      this.transacoes = [
        { nome: 'Renda', valor: '1000', tipo: 'Receita', data: '03/06/2023', categoria: 'Sálario', descricao: 'Sálario do mÊs' },
        { nome: 'Pizzas', valor: '1000', tipo: 'Despesa', data: '03/06/2023', categoria: 'Fast-Food', descricao: '' },
        { nome: 'Água', valor: '150', tipo: 'Despa', data: '03/06/2023', categoria: 'Água', descricao: '' },
        { nome: 'Luz', valor: '160', tipo: 'Despa', data: '03/06/2023', categoria: 'Luz', descricao: '' },
        { nome: 'Água', valor: '150', tipo: 'Despa', data: '03/06/2023', categoria: 'Água', descricao: '' },

      ]
    },

    AtualizaGrafico() {
      //this.options.xaxis.categories = this.categorias
      //this.series.data = this.transacoes.valor
    },

    editItem(item) {
      this.editedIndex = this.transacoes.indexOf(item)
      this.itemEdicao = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.transacoes.indexOf(item)
      this.itemEdicao = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.transacoes.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.itemEdicao = Object.assign({}, this.itemInput)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.itemEdicao = Object.assign({}, this.itemInput)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.transacoes[this.editedIndex], this.itemEdicao)
      } else {
        this.transacoes.push(this.itemEdicao)
      }
      console.log(this.itemEdicao)
      this.close()
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
