<template>
  <v-app>
    <v-row justify="center" align="center" v-if="isLogined">
      <v-col cols="12" sm="8" md="6">
        <v-card color="light-blue">
          <v-card-text>
            <ranking-card :login-user-id="loginUserId" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn style="text-transform: none" color="primary" nuxt to="/ranking"> Go to Ranking > </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-main>
      <!--
      <v-card class="mt-5 mt-8" color="black">
      -->
      <v-card class="mt-5 mt-8" color="red lighten-5">
        <v-card-title> 就活イベント</v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-for="i in 4" :key="i">
              <category-button
                :is-logined="isLogined"
                :login-user-id="loginUserId"
                :category="eventKindList[2 * (i - 1)]"
              />
              <category-button
                :is-logined="isLogined"
                :login-user-id="loginUserId"
                :category="eventKindList[2 * (i - 1) + 1]"
              />
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import RankingCard from '../components/RankingCard.vue'
import CategoryButton from '../components/CategoryButton.vue'

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

export default {
  name: 'IndexPage',
  components: {
    RankingCard,
    CategoryButton,
  },
  data: () => ({
    justify: ['start', 'center', 'end', 'space-around', 'space-between'],
    user: {},
    username: '',
    isLogined: false,
    eventKindList,
    loginUserId: '', // this.$fire.auth.currentUser.uid, // ログインid
  }),
  created() {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        // this.loginUserId = user.uid   // 変更
        this.loginUserId = user.photoURL
        this.user = user
        this.username = user
        this.isLogined = !!user
        // console.log(user)
        if (this.user.photoURL === 'sample') {
          this.user.photoURL = null
        }
      } else {
        this.user = null
      }
    })
  },
  methods: {
    viewEventList(idx) {
      const eventList = [
        'Class',
        'Career',
        'JointSession',
        'IndividSession',
        'SelfAnalysis',
        'EntrySheet',
        'GroupDiscussion',
        'Interview',
      ]
      const link = '/event/' + eventList[idx]
      console.log(link)
      return function () {
        this.$router.push(link)
      }
    },
  },
  computed: {
  },
}
</script>
