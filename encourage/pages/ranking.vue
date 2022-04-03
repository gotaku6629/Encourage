<template>
  <v-row>
    <v-col class="text-center">
      <h1>Ranking</h1>
      <!-- <h2>
        {{ rank }} 位<small>/ {{ numUsers }}</small>
      </h2>
      <h2>level: {{ level }}</h2> -->
      <ranking-card :login-user-id="loginUserId"/>
      <v-card>
        <ranking-chart :login-user-id="loginUserId" />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/"> Back to Top page </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <create-sample-users-button />
  </v-row>
</template>

<script>
// import { mapActions } from 'vuex'
import RankingCard from '../components/RankingCard.vue'
import RankingChart from '../components/RankingChart.vue'
import CreateSampleUsersButton from '../components/CreatSampleUsersButton.vue'

export default {
  name: 'RankingPage',
  components: {
    RankingCard,
    RankingChart,
    CreateSampleUsersButton,
  },
  data() {
    return {
      loginUserId: "7aL08DcCLjrLswBbFNobbR4H1LDS",
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
