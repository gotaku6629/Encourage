import { Bar } from 'vue-chartjs'

const eventKindList = [
  '就活講座',
  'キャリア設計',
  '合同説明会',
  '個社説明会',
  '自己分析',
  'ES',
  'GD',
  '面接',
]

const sampleUsersData = [
  {
    user_id: 'asdf1234',
    package: {
      就活講座: ['event_id_111', 'event_id_111'],
      キャリア設計: ['event_id_222', 'event_id_222', 'event_id_222'],
      合同説明会: [
        'event_id_333',
        'event_id_333',
        'event_id_333',
        'event_id_333',
      ],
      個社説明会: [
        'event_id_444',
        'event_id_444',
        'event_id_444',
        'event_id_444',
        'event_id_444',
      ],
      自己分析: [
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
      ],
      ES: [
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
      ],
      GD: [
        'event_id_777',
        'event_id_777',
        'event_id_777',
        'event_id_777',
        'event_id_777',
        'event_id_777',
        'event_id_777',
        'event_id_777',
      ],
      面接: [
        'event_id_888',
        'event_id_888',
        'event_id_888',
        'event_id_888',
        'event_id_888',
        'event_id_888',
        'event_id_888',
        'event_id_888',
        'event_id_888',
      ],
    },
  },
  {
    user_id: 'asdf2222',
    package: {
      就活講座: ['event_id_111', 'event_id_111'],
      キャリア設計: ['event_id_222', 'event_id_222', 'event_id_222'],
      合同説明会: [
        'event_id_333',
        'event_id_333',
        'event_id_333',
        'event_id_333',
      ],
      個社説明会: [
        'event_id_444',
        'event_id_444',
        'event_id_444',
        'event_id_444',
        'event_id_444',
      ],
      自己分析: [
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
      ],
      ES: [
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
      ],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdf3333',
    package: {
      就活講座: ['event_id_2111', 'event_id_2111'],
      キャリア設計: ['event_id_2222', 'event_id_2222', 'event_id_2222'],
      合同説明会: [
        'event_id_2333',
        'event_id_2333',
        'event_id_2333',
        'event_id_2333',
      ],
      個社説明会: [
        'event_id_2444',
        'event_id_2444',
        'event_id_2444',
        'event_id_2444',
        'event_id_2444',
      ],
      自己分析: [
        'event_id_2555',
        'event_id_2555',
        'event_id_2555',
        'event_id_2555',
        'event_id_2555',
        'event_id_2555',
      ],
      ES: [
        'event_id_2666',
        'event_id_2666',
        'event_id_2666',
        'event_id_2666',
        'event_id_2666',
        'event_id_2666',
        'event_id_2666',
      ],
      GD: [
        'event_id_2777',
        'event_id_2777',
        'event_id_2777',
        'event_id_2777',
        'event_id_2777',
        'event_id_2777',
        'event_id_2777',
        'event_id_2777',
      ],
      面接: ['event_id_2888'],
    },
  },
  {
    user_id: 'asdf4444',
    package: {
      就活講座: ['event_id_111', 'event_id_111'],
      キャリア設計: ['event_id_222', 'event_id_222', 'event_id_222'],
      合同説明会: [
        'event_id_333',
        'event_id_333',
        'event_id_333',
        'event_id_333',
      ],
      個社説明会: [
        'event_id_444',
        'event_id_444',
        'event_id_444',
        'event_id_444',
        'event_id_444',
      ],
      自己分析: [
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
      ],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdf5adsf555',
    package: {
      就活講座: ['event_id_111', 'event_id_111'],
      キャリア設計: ['event_id_222', 'event_id_222', 'event_id_222'],
      合同説明会: [
        'event_id_333',
        'event_id_333',
        'event_id_333',
        'event_id_333',
      ],
      個社説明会: [
        'event_id_444',
        'event_id_444',
        'event_id_444',
        'event_id_444',
        'event_id_444',
      ],
      自己分析: [
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
        'event_id_555',
      ],
      ES: [
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
        'event_id_666',
      ],
      GD: [
        'event_id_777',
        'event_id_777',
        'event_id_777',
        'event_id_777',
        'event_id_777',
        'event_id_777',
        'event_id_777',
        'event_id_777',
      ],
      面接: [],
    },
  },
  {
    user_id: 'asdf3hhnf5555',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdfagd35551',
    package: {
      就活講座: [],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdfagd3555533',
    package: {
      就活講座: [],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdfagd35555333',
    package: {
      就活講座: [],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdfagd3555542314',
    package: {
      就活講座: [],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdfagd355554444',
    package: {
      就活講座: [],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdfagd355553412341',
    package: {
      就活講座: [],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdfagd3555532214',
    package: {
      就活講座: [],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdfagd355553309',
    package: {
      就活講座: [],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdfadsf5555',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: ['event_id_777'],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'lasdfadsf5555',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: ['event_id_777'],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'llasdfadsf5555',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: ['event_id_777'],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'lllasdfadsf5555',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: ['event_id_777'],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'llllasdfadsf5555',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: ['event_id_777'],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'lllllasdfadsf5555',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: ['event_id_777'],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'llllllllasdfadsf5555',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: ['event_id_777'],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdf3g5555',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: ['event_id_777'],
      合同説明会: ['event_id_777'],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'aggsdf5555',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: ['event_id_777'],
      合同説明会: ['event_id_777'],
      個社説明会: ['event_id_777'],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'addsdf555335',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: ['event_id_777'],
      合同説明会: ['event_id_777'],
      個社説明会: ['event_id_777'],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'asdaeef5555',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: ['event_id_777'],
      合同説明会: ['event_id_777'],
      個社説明会: ['event_id_777'],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'ad5ffffff',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'ad5fffff',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'ad5ffff',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'ad5fff',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'ad5ff',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
  {
    user_id: 'ad5f',
    package: {
      就活講座: ['event_id_777'],
      キャリア設計: [],
      合同説明会: [],
      個社説明会: [],
      自己分析: [],
      ES: [],
      GD: [],
      面接: [],
    },
  },
]

let histgram = []
const loginUserId = 'aggsdf5555'
let level = -1
let rank = -1
let numUsers = -1

histgram = getHistgram(sampleUsersData)
level = getLevel(loginUserId, sampleUsersData)
rank = getRank(loginUserId, sampleUsersData)
numUsers = getNumUsers(sampleUsersData)
console.log('Chart.js: rank: ' + rank)
console.log('Chart.js: level: ' + level)

function getNumUsers(users) {
  return users.length
}
function getHistgram(users) {
  const hist = Array(9)
  hist.fill(0)
  for (const id in users) {
    const level = getUserLevel(users[id])
    hist[level] += 1
  }
  return hist
}
function getUserLevel(user) {
  let level = 0
  for (const key of eventKindList) {
    level += user.package[key].length > 0 ? 1 : 0
  }
  return level
}
function getLevel(userId, users) {
  let level = -1
  for (const user of users) {
    if (user.user_id === userId) {
      level = getUserLevel(user)
      break
    }
  }
  return level
}
function getRank(userId, users) {
  let rank = 1
  for (let i = level + 1; i < 9; i += 1) {
    rank += histgram[i]
  }
  return rank
}
function getHistColor() {
  const colors = Array(9)
  colors.fill('#ffffff')
  colors[level] = '#ff0000'
  return colors
}

export default {
  extends: Bar,
  name: 'chart',
  data() {
    return {
      data: {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        // datasets: [
        //   {
        //     label: 'Bar Dataset',
        //     data: [10, 20, 30, 40, 50, 30],
        //     backgroundColor: [
        //       'rgba(255, 99, 132, 0.2)',
        //       'rgba(54, 162, 235, 0.2)',
        //       'rgba(255, 206, 86, 0.2)',
        //       'rgba(75, 192, 192, 0.2)',
        //       'rgba(153, 102, 255, 0.2)',
        //       'rgba(255, 159, 64, 0.2)'
        //     ],
        //     borderColor: [
        //       'rgba(255, 99, 132, 1)',
        //       'rgba(54, 162, 235, 1)',
        //       'rgba(255, 206, 86, 1)',
        //       'rgba(75, 192, 192, 1)',
        //       'rgba(153, 102, 255, 1)',
        //       'rgba(255, 159, 64, 1)'
        //     ],
        //     borderWidth: 1
        //   },
        //   {
        //     label: 'Line Dataset',
        //     data: [10, 50, 20, 30, 30, 40],
        //     borderColor: '#CFD8DC',
        //     fill: false,
        //     type: 'line',
        //     lineTension: 0.3,
        //   }
        // ]
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
            backgroundColor: getHistColor(),
            data: histgram,
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
      userrank: rank,
      userlevel: level,
      numberOfUsers: numUsers,
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
}
