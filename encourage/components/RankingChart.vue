<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
  reda: 'rgba(255, 99, 132, 0.5)',
  orangea: 'rgba(255, 159, 64, 0.5)',
  yellowa: 'rgba(255, 205, 86, 0.5)',
  greena: 'rgba(75, 192, 192, 0.5)',
  bluea: 'rgba(54, 162, 235, 0.5)',
  purplea: 'rgba(153, 102, 255, 0.5)',
  greya: 'rgba(201, 203, 207, 0.5)',
}

const univList = ['名古屋工業大学', '名古屋大学']

export default {
  name: 'RankingChart',
  extends: Bar,
  mixins: [reactiveProp],
  props: ['loginUserId'],
  data() {
    return {
      data: {
        labels: [
          'Level0',
          'Level1',
          'Level2',
          'Level3',
          'Level4',
          'Level5',
          'Level6',
          'Level7',
          'Level8',
        ],
        datasets: [
          {
            label: '名古屋工業大学',
            backgroundColor: [
              CHART_COLORS.reda,
              CHART_COLORS.reda,
              CHART_COLORS.reda,
              CHART_COLORS.reda,
              CHART_COLORS.reda,
              CHART_COLORS.reda,
              CHART_COLORS.reda,
              CHART_COLORS.reda,
              CHART_COLORS.reda,
            ],
            data: [],
            borderWidth: 1,
          },
          {
            label: '名古屋大学',
            backgroundColor: [
              CHART_COLORS.bluea,
              CHART_COLORS.bluea,
              CHART_COLORS.bluea,
              CHART_COLORS.bluea,
              CHART_COLORS.bluea,
              CHART_COLORS.bluea,
              CHART_COLORS.bluea,
              CHART_COLORS.bluea,
              CHART_COLORS.bluea,
            ],
            data: [],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: 'black',
          },
        },
        scales: {
          xAxes: [
            {
              // scaleLabel: {
              //   display: true,
              //   labelString: 'Level',
              // },
              stacked: true,
              categoryPercentage: 0.5,
              barPercentage: 1,
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 100,
              },
              stacked: true,
            },
          ],
        },
      },
      userId: this.loginUserId,
    }
  },
  computed: {
    numUsers() {
      return this.users.length
    },
  },
  created() {
    const hists = this.$store.getters['users/hist']
    for (const univId in univList) {
      this.data.datasets[univId].data = hists[univList[univId]]
    }
    this.setHistColor()
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
  methods: {
    setHistColor() {
      const level = this.$store.getters['users/level'](this.userId)
      this.data.datasets[0].backgroundColor[level] = CHART_COLORS.red
      this.data.datasets[1].backgroundColor[level] = CHART_COLORS.blue
    },
  },
}
</script>

<style></style>
