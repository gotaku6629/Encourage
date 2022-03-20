<template>
  <v-row>
    <v-col class="text-center">
      <h1>Ranking</h1>
      <div class="small">
        <bar-chart :chart-data="datacollection"></bar-chart>
        <button @click="fillData()">Randomize</button>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import BarChart from '../components/BarChart.js'

export default {
  name: 'RankingPage',
  components: {
    BarChart,
  },
  data: () => ({
    datacollection: null,
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [
          'l1',
          'label2',
          'label3',
          'label4',
          'label5',
          'label6',
          'label7',
          'label8',
        ],
        datasets: [
          {
            // label: 'label1',
            backgroundColor: [
              '#ffffff',
              '#ffffff',
              '#ffffff',
              '#ffffff',
              '#0000ff',
              '#ffffff',
              '#ff0000',
              '#ffffff',
            ],
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
          },
        ],
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
  },
}
</script>

<style>
.small {
  max-width: 600px;
  margin: 50px auto;
}
</style>
