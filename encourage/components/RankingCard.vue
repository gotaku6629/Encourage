<template>
  <!--
  <v-card color="#000000">
  -->
  <v-card color="white">
    <v-card-title class="justify-center">
      <h1>level {{ level }}</h1>
    </v-card-title>
    <center>
      <v-card-text>
        <h4>{{ level }}種類のイベントに参加</h4>
      </v-card-text>
      <v-card-text>
        <h1>{{ rank }} 位 / {{ numberOfAll }}</h1>
      </v-card-text>
    </center>
  </v-card>
</template>

<script>
export default {
  name: 'RankingCard',
  props: ['loginUserId'],
  data() {
    return {}
  },
  computed: {
  // mounted: {
    rank() {
      return this.$store.getters['users/rank'](this.loginUserId)
    },
    level() {
      return this.$store.getters['users/level'](this.loginUserId)
    },
    numberOfAll() {
      return this.$store.getters['users/numberOfAll']
    },
  },
}
</script>
