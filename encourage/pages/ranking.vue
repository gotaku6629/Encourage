<template>
  <v-row>
    <v-col class="text-center">
      <h1>Ranking</h1>
      <ranking-card :login-user-id="loginUserId"/>
      <v-card>
        <ranking-chart :login-user-id="loginUserId" />
      </v-card>
    </v-col>

    <v-btn outlined nuxt to="/">
      <v-icon left> mdi-chevron-left </v-icon>Top Page
    </v-btn>    
  </v-row>
</template>

<script>
import RankingCard from '../components/RankingCard.vue'
import RankingChart from '../components/RankingChart.vue'

export default {
  name: 'RankingPage',
  components: {
    RankingCard,
    RankingChart,
  },
  data() {
    return {
      loginUserId: this.$fire.auth.currentUser.uid, // ログインid
    }
  },  
  computed: {},
  mounted() {},
  methods: {},
}
</script>

<style>
.small {
  max-width: 600px;
  margin: 50px auto;
}
</style>
