import { firestoreAction } from 'vuexfire'

export const state = () => ({
  items: [],
})

export const getters = {
  all: state => {
    return state.items
  },
  byId: (state) => (eventId) => {
    const res = state.items.filter(event => event.id === eventId)
    return res.length > 0 ? res[0] : null
  },
  byCategory: (state) => (category = "") => {
    if (!category) {
      return state.items
    }
    return state.items.filter(event => event.category === category)
  }  
}

export const actions = {
  bind: firestoreAction(function ({ bindFirestoreRef }) {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('items', this.$fire.firestore.collection('NITevents'))
  }),
}