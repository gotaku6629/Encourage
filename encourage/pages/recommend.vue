<template>
  <v-app>
    <v-content>
      <v-btn outlined nuxt to="/">
        <v-icon left> mdi-chevron-left </v-icon>Top Page
      </v-btn>

      <v-card class="mt-5 mt-8" color="red lighten-5">
        <v-card-title> おすすめイベント</v-card-title>

        <v-card-text>
          <v-container>
            <v-row class="justify" align="center">
              <v-col v-for="event in events" :key="event.id" justify="center" cols="12" md="6" sm="12">
                <v-col>
                  <!-- Event for each other -->
                  <v-card class="mx-auto my-12" max-width="600" color="white">
                    <v-img
                      height="250"
                      :src="event.img"
                    ></v-img>

                    <v-card-title> {{ event.title }} </v-card-title>

                    <v-card-text>                      
                      <v-row align="center" class="mx-0">
                        <v-rating
                          :value=event.level
                          color="amber"
                          dense
                          half-increments
                          readonly
                          size="14"
                        ></v-rating>
                          <div class="grey--text ms-4">
                            {{ event.level }}
                            <!--({{ event.number }}人参加中)-->
                          </div>
                      </v-row>
                      
                      <div class="my-4 text-subtitle-2">
                        <div v-if="event.end">
                          イベント日時：<br>
                          {{ event.start }} ~ {{ event.end }}
                        </div>
                        <div v-if="event.deadline">
                          申し込み締め切り：<br>
                          {{ event.deadline }}
                        </div>
                      </div>
                                          
                      <v-card-text> {{ event.zcom }} </v-card-text>

                      <button @click="externalLink(event.url)">
                        <v-btn
                          color="orange"
                          style="text-transform: none"
                        >
                          Click
                        </v-btn>
                      </button>
                    </v-card-text>

                  </v-card>
                </v-col>
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
  name: 'RecommendEvent',
  data() {
      return {
        // loginUserId: this.$fire.auth.currentUser.uid,   // ログインid
        loginUserId: this.$fire.auth.currentUser.photoURL, // 変更
      }
    },
  computed: {
    events() {
      console.log('---- recommend ----')
      const user = this.$store.getters['users/byId'](this.loginUserId)
      console.log(user)
      if (user.Bc === '名古屋工業大学'){
        return this.$store.getters['NITevents/byRecommend'](user)
      } else if (user.Bc === '名古屋大学'){
        return this.$store.getters['NUevents/byRecommend'](user)
      } else {
        return -1
      }
      // console.log('return', this.$store.getters['NITevents/byRecommend'](user))
    },
  },

  methods: {
    externalLink(url) {
      window.open(url, '_blank')
    }
  }
}
</script>
