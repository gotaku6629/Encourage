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
  byId: (state) => (userId) => {
    console.log("docUser:", state.user)
    return state.user
  },
  numberOfAll: (state) => {
    let res = 0
    if (state.hist.length === 0){
      return -1
    }
    else{
      const hist = histgramToNumber(state.hist)
      for (const univ of univList) {
        res += hist[univ].map((i) => Number(i)).reduce((sum, e) => sum + e, 0)
      }
      return res
    }
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
    // console.log("--- users level ---")
    // console.log("state.user", state.user)  // this is null
    // console.log("state.user.length", state.user.length)  // this is null
    // console.log("userId", userId) // OK
    if (state.user.length === 0){
      return -1
    }
    else{
      return getUserLevel(state.user)
    }
  },
  rank: (state) => (userId) => {
    // console.log("--- users rank ---")
    // console.log("state.user", state.user)
    // console.log("state.hist", state.hist)
    // console.log("userId", userId) // OK    
    let rank = 1
    if (state.hist.length === 0){
      return -1
    }
    else{
      const userLevel = getUserLevel(state.user)
      const hist = histgramToNumber(state.hist)
      for (let i = userLevel + 1; i < 9; i++) {
        for (const univ of univList) {
          rank += hist[univ][i]
        }
      }
      return rank
    }
  },
  joinedEventListLength: (state) => (userId, category) => {
    if (state.user.length === 0){
      return -1
    }
    else{
      return state.user[category].length
    }
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
    // console.log("-- users.js bindUser--")
    // console.log(bindFirestoreRef('user', this.$fire.firestore.collection('users').doc(docId)))
    return bindFirestoreRef('user', this.$fire.firestore.collection('users').doc(docId))
  }),
  bindHistgram: firestoreAction(function ({ bindFirestoreRef }) {
    // console.log("-- users.js bindHistgram--")
    // console.log(bindFirestoreRef('hist', this.$fire.firestore.collection('users').doc('histgram')))
    return bindFirestoreRef('hist', this.$fire.firestore.collection('users').doc('histgram'))
  }),
  add: firestoreAction(function (_, user) {
    console.log("userData:", user)
    console.log("name:univ", user.displayName)

    // univの位置を見る：
    const fidx = user.displayName.indexOf(':');
    const lidx = user.displayName.length
    let myName = '';
    for (let i=0; i<fidx; i++){
      myName += user.displayName[i];
    }
    console.log("myName", myName)
    let nameUniv = '';
    for (let i=fidx+1; i<lidx; i++){
      nameUniv += user.displayName[i];
    }
    console.log("nameUniv", nameUniv)

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
        .set({'Am': myName, 'Bc': nameUniv, 'Cv': 1, '就活講座': [], 'キャリア設計': [], '合同説明会': [], '個社説明会・インターン': [], '自己分析': [], 'ES': [], 'GD': [], '面接': []})
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
      return -1
    });
  }),
  getuser: firestoreAction(function (_, userId) {
    const docUser = this.$fire.firestore.collection('users').doc(userId)
    docUser.get().then((doc) => {
      if (doc.exists){
        console.log("Document data:", doc.data())        
        return doc.data()
      } else {
        console.log("No such document!")
        return -1
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
      return -1
    });
  }),
  updateUser: firestoreAction(function (_, updateuserdata ) {
    console.log("updateUser:", updateuserdata)
    const userId = updateuserdata.loginUserId
    console.log("userId:", userId);
    this.$fire.firestore.collection('users').doc(userId).update({ '業界': updateuserdata.業界 })
    this.$fire.firestore.collection('users').doc(userId).update({ '職種': updateuserdata.職種 })
    return -1
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
