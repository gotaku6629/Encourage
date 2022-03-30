<template>
  <v-app>
    <v-row justify="center" align="center" v-if="isLogined">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-text>
            <v-card color="#000000">
              <v-card-title class="justify-center">
                <h2>Level</h2>
              </v-card-title>
              <center>
                <v-card-text>
                  <!--
                  <h1> {{ username }} </h1>
                  <h1> {{ isLogined }} </h1>
                  -->
                  <h1>4</h1>
                </v-card-text>
                <v-card-text> 
                  <h1>6 位 / 31</h1>  
                </v-card-text>
              </center>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" nuxt to="/ranking"> Go to Ranking </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-content>
      <v-card class="mt-5 mt-8" color="black">
        <v-card-title> 就活イベント</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6" sm="12">
                <v-card @click="viewEventList1" color="pink lighten-2" v-if="isLogined">
                  <v-card-title class="justify-center"> 就活講座 </v-card-title>
                </v-card>
                <v-card @click="viewEventList1" v-else>
                  <v-card-title class="justify-center"> 就活講座 </v-card-title>
                </v-card>            
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-card @click="viewEventList2" color="pink lighten-2" v-if="isLogined">
                  <v-card-title class="justify-center"> キャリア設計 </v-card-title>
                </v-card>
                <v-card @click="viewEventList2" v-else>
                  <v-card-title class="justify-center"> キャリア設計 </v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="12">
                <v-card @click="viewEventList3" color="pink lighten-2" v-if="isLogined">
                  <v-card-title class="justify-center">合同説明会</v-card-title>
                </v-card>
                <v-card @click="viewEventList3" v-else>
                  <v-card-title class="justify-center"> 合同説明会 </v-card-title>
                </v-card>            
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-card @click="viewEventList4" color="pink lighten-2" v-if="isLogined">
                  <v-card-title class="justify-center">個社説明会</v-card-title>
                </v-card>
                <v-card @click="viewEventList4" v-else>
                  <v-card-title class="justify-center"> 個社説明会 </v-card-title>
                </v-card>                
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="12">
                <v-card @click="viewEventList5">
                  <v-card-title class="justify-center">自己分析</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-card @click="viewEventList6">
                  <v-card-title class="justify-center">ES</v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="12">
                <v-card @click="viewEventList7">
                  <v-card-title class="justify-center">GD</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-card @click="viewEventList8">
                  <v-card-title class="justify-center">面接</v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'IndexPage',
  data: () => ({
    justify: ['start', 'center', 'end', 'space-around', 'space-between'],
    username: "",
    isLogined: false,
  }),
  created() {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.username = user
        this.isLogined = !!user
        if (this.user.photoURL === 'sample') {
          this.user.photoURL = null
        }
      } else {
        this.user = null
      }
    })
  },
  methods: {
    viewEventList1() {
      this.$router.push('/Class')
    },
    viewEventList2() {
      this.$router.push('/Career')
    },
    viewEventList3() {
      this.$router.push('/JointSession')
    },
    viewEventList4() {
      this.$router.push('/IndividSession')
    },
    viewEventList5() {
      this.$router.push('/SelfAnalysis')
    },
    viewEventList6() {
      this.$router.push('/EntrySheet')
    },
    viewEventList7() {
      this.$router.push('/GroupDiscussion')
    },
    viewEventList8() {
      this.$router.push('/Interview')
    },
  },
  computed: {
    // users() {
    //  const question = this.$store.getters['users/byId'](this.$route.params.id)
    //  return question
    // },
    users() {
        const users = this.$store.getters['users/all']
        return users
    },
    events() {
        const events = this.$store.getters['events/all']
        return events
    },    
  }
}
</script>
