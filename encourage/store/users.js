import { firestoreAction } from 'vuexfire'

const eventKindList = [
  '就活講座',
  'キャリア設計',
  '合同説明会',
  '個社説明会・インターン',
  '自己分析',
  'ES',
  'GD',
  '面接',
]

const univList = [
  '名古屋工業大学',
  '名古屋大学',
]

function getUserLevel(user) {
  let level = 0
  for (const key of eventKindList) {
    console.log("User:", user);
    level += user[key].length > 0 ? 1 : 0
  }
  return level
}

function histgramToNumber(hists) {
  const ret = {}
  for (const univ of univList) {
    ret[univ] = hists[univ].map((i) => Number(i))
  }
  return ret
}

export const state = () => ({
  // items: [],
  user: [], // loginユーザーの情報
  hist: [], // 各大学のヒストグラム
})

export const getters = {
  // all: (state) => {
  //   return state.items
  // },
  // byId: (state) => (userId) => {
  //   const res = state.items.filter((user) => user.id === userId)
  //   return res.length > 0 ? res[0] : null
  // },
  numberOfAll: (state) => {
    let res = 0
    const hist = histgramToNumber(state.hist)
    for (const univ of univList) {
      res += hist[univ].map((i) => Number(i)).reduce((sum, e) => sum + e, 0)
    }
    return res
  },
  hist: (state) => {
    const res = {}
    for (const univ of univList) {
      res[univ] = state.hist[univ].map((i) => Number(i))
    }
    return res
  },
  hists: (state) => {
    const hist = state.items.filter((user) => user.id === 'histgram')[0]
    const res = {}
    for (const univ of univList) {
      res[univ] = hist[univ].map((i) => Number(i))
    }
    return res
  },
  level: (state) => (userId) => {
    return getUserLevel(state.user)
  },
  rank: (state) => (userId) => {
    let rank = 1
    const userLevel = getUserLevel(state.user)
    const hist = histgramToNumber(state.hist)
    for (let i = userLevel + 1; i < 9; i++) {
      for (const univ of univList) {
        rank += hist[univ][i]
      }
    }
    return rank
  },
  joinedEventListLength: (state) => (userId, category) => {
    return state.user[category].length
  },
  univ: (state) => (userId) => {
    // console.log("univ --  UserId:", userId);
    const res = state.user
    // console.log("state.user:", res);
    // const res = state.user.filter((userx) => userx.id === userId)
    // console.log("univ - - - Bc:", res.Bc);
    // console.log("univ - - - Bc:", res.Bc);
    return res.Bc
  },

}

export const actions = {
  // bind: firestoreAction(function ({ bindFirestoreRef }) {
  //   return bindFirestoreRef('items', this.$fire.firestore.collection('users'))
  // }),
  bindUser: firestoreAction(function ({ bindFirestoreRef }, docId) {
    return bindFirestoreRef('user', this.$fire.firestore.collection('users').doc(docId))
  }),
  bindHistgram: firestoreAction(function ({ bindFirestoreRef }) {
    return bindFirestoreRef('hist', this.$fire.firestore.collection('users').doc('histgram'))
  }),
  add: firestoreAction(function (_, user) {
    console.log("userData:", user)
    console.log("univ", user.photoURL)
    // すでにドキュメントにuser.photoURLがある人は, 初期化したくない！
    const docUser = this.$fire.firestore.collection('users').doc(user.photoURL)
    docUser.get().then((doc) => {
      if (doc.exists){
        console.log("Document data:", doc.data())
        this.$fire.firestore.collection('users').doc(user.photoURL).set({'Cv': 1}, { merge: true})
        return -1
      } else {
        console.log("No such document!")
        return this.$fire.firestore
        .collection('users')
        // .doc(user.uid) // ここ修正！
        .doc(user.photoURL) // とりあえず、photoURLを用いる！
        .set({'Am': user.displayName, 'Bc': user.tenantId, 'Cv': 1, '就活講座': [], 'キャリア設計': [], '合同説明会': [], '個社説明会・インターン': [], '自己分析': [], 'ES': [], 'GD': [], '面接': []})
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
      return -1
    });
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
