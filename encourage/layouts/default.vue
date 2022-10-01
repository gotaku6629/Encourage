<template>
  <!--<v-app dark>-->
  <v-app>
    <v-app-bar fixed app>
      <v-spacer />
      <v-toolbar-title style="padding-right: 10px" v-text="title" />
      <nuxt-link to="/">
        <img src="/icon.png" style="width: 50px" />
      </nuxt-link>
      <v-spacer />
      <v-btn v-if="!user" color="primary" nuxt to="/auth/login">
        Sing In / Sign Up
      </v-btn>

      <v-menu v-else offset-y>
        <template #activator="{ on }">
          <v-btn v-on="on">
            <v-avatar size="36" color="white">
              <v-img v-if="userdata.updateuniv === '名古屋工業大学'" :src="niturl"></v-img>
              <v-img v-else-if="userdata.updateuniv === '名古屋大学'" :src="nuurl"></v-img>
            </v-avatar>
            <strong class="mx-3">{{ userdata.updateusername }}</strong>
          </v-btn>
        </template>

        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center px-3">
              <v-avatar color="white">
                <v-img v-if="userdata.updateuniv === '名古屋工業大学'" :src="niturl"></v-img>
                <v-img v-else-if="userdata.updateuniv === '名古屋大学'" :src="nuurl"></v-img>
              </v-avatar>
              <h3>{{ userdata.updateusername }}</h3>
              <p class="text-caption mt-1">
                {{ univ }}
              </p>              
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <!-- <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Edit Account </v-btn> -->
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logout"> Logout </v-btn>
            </div>
          </v-list-item-content>
        </v-card>

      </v-menu>

    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      title: 'en-courage',
      user: null,
      username: '',
      univ: '',
      niturl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Nit-logo.gif',
      nuurl: 'https://pbs.twimg.com/profile_images/1432505324192239620/P-iOmlp2_400x400.jpg',
      userdata: {},
    }
  },
  created() {
    this.bindNITEvents()
    this.bindNUEvents()
    this.setListener()
    
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        if (this.user.photoURL === "sample") {
          this.user.photoURL = null
        }
        // displaynameの分解⇒ username:univ
        console.log("----- default -----")
        console.log("user", user)
        console.log("user.displayName", user.displayName)

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

        this.niturl = 'https://upload.wikimedia.org/wikipedia/commons/6/61/Nit-logo.gif'
        this.nuurl  = 'https://pbs.twimg.com/profile_images/1432505324192239620/P-iOmlp2_400x400.jpg' 
      } else {
        this.user = null
      }
    })
  },
  methods: {
    ...mapActions({ bindNITEvents: 'NITevents/bind', bindNUEvents: 'NUevents/bind'}),
    async logout() {
      await this.$fire.auth.signOut()
      this.user = null
    },
    setListener() {
      // emitで発火させたイベント名にする
      this.$nuxt.$on('updateUserdata', this.setHeader)
    },
    setHeader(userdata) {
      // 第1引数にはemitで渡した値が入ってくる。
      // 第2引数以降を渡す場合も同様に、それ以降の引数で受け取れる
      this.userdata = userdata || ''      
    }
  },
}
</script>