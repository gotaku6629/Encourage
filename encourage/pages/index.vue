<template>
  <v-app>
    <v-row justify="center" align="center" v-if="isLogined">
      <v-col cols="12" sm="8" md="6">
        <v-card color="light-blue">
          <v-card-text>
            <ranking-card :login-user-id="loginUserId" />
          </v-card-text>
          <v-card-actions>
            <v-btn class="mx-2" fab dark small color="primary" @click="reload"> 
              <v-icon dark>mdi-cached</v-icon> 
            </v-btn>
            <v-spacer />
            <v-btn style="text-transform: none" color="primary" nuxt to="/ranking"> ランキングページ > </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <v-main>
      <!--
      <v-card class="mt-5 mt-8" color="black">
      -->
      <v-card class="mt-5 mt-8" color="red lighten-5">
        <v-tabs
          background-color="pink lighten-1"
          centered
          dark
          icons-and-text>
          <v-tabs-slider></v-tabs-slider>
    
          <v-tab href="#tab-1" @click="checkMypage" v-if="isLogined">
            マイページ
            <v-icon>mdi-account</v-icon>
          </v-tab>
    
          <v-tab href="#tab-2" @click="viewEventCalendar" v-if="isLogined">
            イベントカレンダー
            <v-icon>mdi-calendar</v-icon>
          </v-tab>
    
          <v-tab href="#tab-3" @click="externalLink('https://sites.google.com/en-courage.net/10en-counter/%E3%83%9B%E3%83%BC%E3%83%A0')" v-if="isLogined">
            エンカウンター
            <v-icon>mdi-account-box</v-icon>
          </v-tab>

          <v-tab href="#tab-4" @click="recommendEvent" v-if="isLogined">
            おすすめイベント
            <v-icon>mdi-heart</v-icon>
          </v-tab>
        </v-tabs>

        <v-card-title> 就活イベント (参加数) </v-card-title>
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
import { mapActions } from 'vuex'  
import RankingCard from '../components/RankingCard.vue'
import CategoryButton from '../components/CategoryButton.vue'


const eventKindList = [
  'キャリア設計',  
  '合同説明会',  
  '面接',
  'ES',  
  'GD',
  '自己分析',
  '就活講座',
  '個社説明会・インターン',
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
    univ: '',
    niturl: '',
    nuurl: '',    
    eventKindList,
    loginUserId: '', // this.$fire.auth.currentUser.uid, // ログインid
    userdata: {
      updateusername: '',  // ユーザー情報更新用
      updateuniv: '',
    },
  }),
  created() {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("----- index -----")
        this.user = user
        this.loginUserId = user.photoURL // encourage_idを利用！
        this.isLogined = !!user
     
        // displaynameの分解⇒ username:univ
        const fidx = user.displayName.indexOf(':');
        const lidx = user.displayName.length
        let username = '';
        for (let i=0; i<fidx; i++){
          username += user.displayName[i];
        }
        console.log("username", username)
        this.username = username;
        let univ = '';
        for (let i=fidx+1; i<lidx; i++){
          univ += user.displayName[i];
        }
        console.log("univ", univ)
        this.univ = univ;

        // ユーザー情報の更新
        this.userdata.updateusername = username;
        this.userdata.updateuniv = univ;
        this.updateUserdata()

        this.niturl = 'https://upload.wikimedia.org/wikipedia/commons/6/61/Nit-logo.gif'
        this.nuurl  = 'https://pbs.twimg.com/profile_images/1432505324192239620/P-iOmlp2_400x400.jpg' 

      } else {
        this.user = null
      }
    })
  },
  mounted() {
    window.onload = ()=>{
      // alert('window.onload')
      this.$fire.auth.onAuthStateChanged((user) => {
        if (user) {
          // alert('ユーザー認証しました')
          this.bindUser(this.user.photoURL).then(() => {
            // alert('bindUserが終了')  // ここまでOK
            this.bindHistgram().then(() => { // 多分、ここができてない...
              // alert('bindHistgramが終了')  // ここまでOK
              this.$router.push('/mypage')
            })
          })       
        }
      })
    }          
  },

  methods: {
    ...mapActions({
      bindUser: 'users/bindUser',
      bindHistgram: 'users/bindHistgram',
    }),    
    test () {
      console.log('loading test')
    },
    reload() {
      location.reload();
    },    
    updateUserdata() {
      console.log("updateUserdata", this.userdata)
      this.$nuxt.$emit('updateUserdata', this.userdata)
    },
    viewEventList(idx) {
      // ここは使ってない！
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
      // const univ = this.$store.getters['users/univ'](this.loginUserId) // Bc={名古屋大学, 名古屋工業大学}
      const univ = 'test'
      console.log("univ:", univ);
      const link = '/event/' + eventList[idx] // 名古屋大学=NU, 名工大=NIT
      console.log(link)
      return function () {
        this.$router.push(link)
      }
    },
    viewEventCalendar() {
      this.$router.push('/calendar')
    },
    checkMypage() {
      this.$router.push('/mypage')
    },
    externalLink(url) {
      window.open(url, '_blank')
    },
    recommendEvent() {
      this.$router.push('/recommend')
    },       
  },
  computed: {
  },
}
</script>
