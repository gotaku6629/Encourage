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
  },
  byRecommend: (state) => (userdata = "") => {
    // console.log(userdata)
    if (!userdata) {
      return state.items
    }
    const industry = userdata.業界
    const work = userdata.職種
    const recommendEvent = []
    for (const ev of state.items) {
      for (const ind of industry){
        console.log(ind)
        if (ev.業界 === ind){
          recommendEvent.push(ev)
        }
      }
      for (const wrk of work){
        console.log(wrk)
        if (recommendEvent.indexOf(ev) & ev.職種 === wrk){
          recommendEvent.push(ev)
        }
      }
    }
    // return state.items.filter(event => event.業界 === industry || event.職種 === work)
    // return state.items.filter(event => event.業界 === industry)
    return recommendEvent
  },  
}

export const actions = {
  bind: firestoreAction(function ({ bindFirestoreRef }) {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('items', this.$fire.firestore.collection('NUevents'))
  }),
}