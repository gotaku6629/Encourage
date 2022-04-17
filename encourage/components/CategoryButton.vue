<template>
  <v-col cols="12" md="6" sm="12">
    <v-card @click="viewEventList" :color="color">
      <v-card-title class="justify-center">
        {{ category }}
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
      const link = '/event/' + eventList[this.category]
      console.log(link)
      this.$router.push(link)
    },
  },
  computed: {
    joinedEventListLength() {
      return this.$store.getters['users/joinedEventListLength'](
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
