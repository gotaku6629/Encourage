import { firestoreAction } from 'vuexfire'

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
}

export const actions = {
  bind: firestoreAction(function ({ bindFirestoreRef }) {
    return bindFirestoreRef('items', this.$fire.firestore.collection('users'))
  }),
  // add: firestoreAction(function (_, { userId }) {
  //   return this.$fire.firestore.collection('users').doc('fdaaaaaaaaa').set({ userId, hoge: userId })
  // }),
  sampleSet: firestoreAction(function (_, users) {
    for (const user of users) {
      console.log(user)
      this.$fire.firestore
        .collection('users')
        .doc(user.userId)
        .set(user.package)
    }
  }),
}
