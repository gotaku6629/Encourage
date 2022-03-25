import { firestoreAction } from 'vuexfire'

export const state = () => ({
  items: [],
})

export const getters = {
  all: state => {
    return state.items
  },
  byId: (state) => (movieId) => {
    const res = state.items.filter(movie => movie.id === movieId)
    return res.length > 0 ? res[0] : null
  },
}

export const actions = {
  bind: firestoreAction(function ({ bindFirestoreRef }) {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('items', this.$fire.firestore.collection('users'))
  }),
}