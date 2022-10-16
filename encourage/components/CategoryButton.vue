<template>
  <v-col cols="12" md="6" sm="12">
    <v-card @click="viewEventList" :color="color">
      <v-card-title class="justify-center">
        {{ category }} ({{ joinedEventListLength }})
      </v-card-title>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'RankingCard',
  props: ['isLogined', 'loginUserId', 'category'],
  data() {
    return {}
  },
  created() {},
  methods: {
    joinedColor(num) {
      let color = ''
      if (num <= 0) color = 'gray'
      else if (num === 1) color = 'pink lighten-3'
      else if (num === 2) color = 'pink lighten-2'
      else if (num === 3) color = 'pink lighten-1'
      else if (num === 4) color = 'pink lighten-0'
      else color = 'pink lighten-0'
      return color
    },
    viewEventList() {
      const eventList = {
        就活講座: 'Class',
        キャリア設計: 'Career',
        合同説明会: 'JointSession',
        '個社説明会・インターン': 'IndividSession',
        自己分析: 'SelfAnalysis',
        ES: 'EntrySheet',
        GD: 'GroupDiscussion',
        面接: 'Interview',
      }
      let link = ''
      const univ = this.$store.getters['users/univ'](this.loginUserId) // Bc={名古屋大学, 名古屋工業大学}
      console.log('univ:', univ);
      if (univ === '名古屋大学')
        link = '/NU_event/' + eventList[this.category]
      else if (univ === '名古屋工業大学')
        link = '/NIT_event/' + eventList[this.category]
      console.log(link)
      this.$router.push(link)
    },
  },
  computed: {
    joinedEventListLength() {
      // console.log('userId:', this.loginUserId);
      // console.log('category:', this.category);
      return this.$store.getters['users/joinedEventListLength']( // this!
        this.loginUserId,
        this.category
      )
    },
    color() {
      return this.isLogined
        ? this.joinedColor(this.joinedEventListLength)
        : 'gray'
    },
  },
}
</script>
