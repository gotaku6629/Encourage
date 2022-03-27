<template>
  <v-row>
    <v-col class="text-center">
      <h1>Ranking</h1>
      <h2>{{ rank }} 位<small>/ {{ numUsers }}</small></h2>
      <h2> level: {{level}}</h2>
      <v-card>
      <chart />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" nuxt to="/"> Back to Top page </v-btn>
      </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Chart from '../components/Chart.js'

export default {
  name: 'RankingPage',
  components: {
    Chart,
  },
  data: () => ({
    rank: Chart.data().userrank,
    level: Chart.data().userlevel,
    numUsers: Chart.data().numberOfUsers,
  }),
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style>
.small {
  max-width: 600px;
  margin: 50px auto;
}
</style>
