<template>
  <v-app>
   
    <!--Barra lateral de navegação-->
    <v-navigation-drawer v-model="drawer" app v-if="notIsLoginPage">

      <!--Opções da barra lateral-->
      <v-list>
        <v-list-item-group v-model="model">
          <v-list-item 
          v-for="(item, i) in items" 
          :key="i" 
          :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>



    <!--Barra superior da tela-->
    <v-app-bar app  class="primary" v-if="notIsLoginPage">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="white--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Menu</v-toolbar-title>
    </v-app-bar>



    <!--Centro da página (Conteudo)-->
    <v-main>
      <router-view></router-view>
    <!--  -->
    </v-main>



    <v-footer app class="primary" v-if="notIsLoginPage"> 
    <span class="white--text" >Abacus &copy; {{ new Date().getFullYear() }}</span>
    <v-col></v-col>
    <span class="white--text" >{{ new Date().getUTCHours()-3 + ':' + new Date().getMinutes() }}</span>
    </v-footer>


  </v-app>
</template>

<script>

export default {
  computed: {
    //Função verifica se é a página de login para decidir se mostra ou não as partes fixas
    notIsLoginPage(){
      return this.$route.name !== 'autenticacao';
    }
  },

  data: () => ({
    drawer: null,
    items: 
      [
        //{ icon: 'mdi-home-outline', text: 'Return to me', to: '/'},
        { icon: 'mdi-cash', text:'Transações', to: '/contas'},
        { icon: 'mdi-shape', text:'Categorias', to: '/categorias'},
        { icon: 'mdi-align-vertical-bottom', text: 'Histórico', to: '/historico'},
        { icon: 'mdi-cog-outline', text: 'Configurações', to: '/config'},
        { icon: 'mdi-logout', text: 'Sair', to: '/'},
      ]

  }),
};
</script>
