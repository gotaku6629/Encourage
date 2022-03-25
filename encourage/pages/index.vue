<template>
  <v-app>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-text>
            <v-card color="#000000">
              <v-card-title class="justify-center">Level</v-card-title>
              <center>
                <v-card-text>8 </v-card-text>
                <v-card-text> 1st / 100000 </v-card-text>
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
              <v-col cols="6">
                <v-card @click="viewEventList1">
                  <v-card-title class="justify-center"> 就活講座 </v-card-title>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card @click="viewEventList2">
                  <v-card-title class="justify-center"> キャリア設計 </v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card @click="viewEventList3">
                  <v-card-title class="justify-center">合同説明会</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card @click="viewEventList4">
                  <v-card-title class="justify-center">個社説明会</v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card @click="viewEventList5">
                  <v-card-title class="justify-center">自己分析</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card @click="viewEventList6">
                  <v-card-title class="justify-center">ES</v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card @click="viewEventList7">
                  <v-card-title class="justify-center">GD</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="6">
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
  }),
  created() {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
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
      this.$router.push('/ranking')
    },
    viewEventList2() {
      this.$router.push('/ranking')
    },
    viewEventList3() {
      this.$router.push('/ranking')
    },
    viewEventList4() {
      this.$router.push('/ranking')
    },
    viewEventList5() {
      this.$router.push('/ranking')
    },
    viewEventList6() {
      this.$router.push('/ranking')
    },
    viewEventList7() {
      this.$router.push('/ranking')
    },
    viewEventList8() {
      this.$router.push('/ranking')
    },
  },
}
</script>
