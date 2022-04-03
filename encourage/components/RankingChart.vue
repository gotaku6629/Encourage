<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'RankingChart',
  extends: Bar,
  props: ['loginUserId'],
  data() {
    return {
      data: {
        labels: [
          'level0',
          'level1',
          'level2',
          'level3',
          'level4',
          'level5',
          'level6',
          'level7',
          'level8',
        ],
        datasets: [
          {
            label: '人',
            backgroundColor: [],
            data: [],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          // xAxes: [{
          //   scaleLabel: {
          //     display: true,
          //     labelString: 'Month'
          //   }
          // }],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 100,
              },
            },
          ],
        },
      },
      userId: this.loginUserId,
    }
  },
  created() {
    this.data.datasets[0].data = this.$store.getters['users/hist']
    this.setHistColor()
  },
  computed: {
    numUsers() {
      return this.users.length
    },
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
  methods: {
    setHistColor() {
      const level = this.$store.getters['users/level'](this.userId)
      const colors = Array(9)
      colors.fill('#ffffff')
      colors[level] = '#ff0000'
      this.data.datasets[0].backgroundColor = colors
    },
  },
}
</script>

<style></style>
