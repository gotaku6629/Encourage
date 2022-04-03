import { firestoreAction } from 'vuexfire'

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

function getUserLevel(user) {
  let level = 0
  for (const key of eventKindList) {
    level += user[key].length > 0 ? 1 : 0
  }
  return level
}

export const state = () => ({
  items: [],
})

export const getters = {
  all: (state) => {
    return state.items
  },
  byId: (state) => (userId) => {
    const res = state.items.filter((user) => user.id === userId)
    return res.length > 0 ? res[0] : null
  },
  numberOfAll: (state) => {
    return state.items.length
  },
  hist: (state) => {
    const histgram = Array(9)
    histgram.fill(0)
    for (const user of state.items) {
      const level = getUserLevel(user)
      histgram[level]++
    }
    return histgram
  },
  level: (state) => (userId) => {
    const user = state.items.filter((u) => u.id === userId)
    return user.length === 1 ? getUserLevel(user[0]) : -1
  },
  rank: (state) => (userId) => {
    const histgram = Array(9)
    histgram.fill(0)
    for (const user of state.items) {
      const level = getUserLevel(user)
      histgram[level]++
    }

    const user = state.items.filter((u) => u.id === userId)
    const level =  user.length === 1 ? getUserLevel(user[0]) : -1
    if (level < 0) {
      console.log('level < 0')
      return -1
    }

    let rank = 1
    for (let i = level + 1; i < 9; i++) {
      rank += histgram[i]
    }
    return rank
  }
}

export const actions = {
  bind: firestoreAction(function ({ bindFirestoreRef }) {
    return bindFirestoreRef('items', this.$fire.firestore.collection('users'))
  }),
  add: firestoreAction(function (_, userId) {
    // console.log(userId)
    return this.$fire.firestore
      .collection('users')
      .doc(userId)
      .set({ '就活講座': [], 'キャリア設計': [], '合同説明会': [], '個社説明会・インターン': [], '自己分析': [], 'ES': [], 'GD': [], '面接': []})
  }),
  sampleSet: firestoreAction(function (_, users) {
    for (const user of users) {
      this.$fire.firestore
        .collection('users')
        .doc(user.userId)
        .set(user.package)
    }
  }),
}
