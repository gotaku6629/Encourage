<template>
  <v-app dark>
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
            <v-avatar size="36" color="primary">
              <v-img v-if="user.photoURL" :src="user.photoURL"></v-img>
              <span v-else class="white--text text-h5">{{
                user.displayName.slice(0, 2)
              }}</span>
            </v-avatar>
            <strong class="mx-3">{{ user.displayName }}</strong>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center px-3">
              <v-avatar color="primary">
                <v-img v-if="user.photoURL" :src="user.photoURL"></v-img>
                <span v-else class="white--text text-h5">{{
                  user.displayName.slice(0, 2)
                }}</span>
              </v-avatar>
              <h3>{{ user.displayName }}</h3>
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
    }
  },
  created() {
    this.bindUsers()
    this.bindEvents()
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        if (this.user.photoURL === "sample") {
          this.user.photoURL = null
        }
      } else {
        this.user = null
      }
    })
  },
  methods: {
    ...mapActions({ bindUsers: 'users/bind', bindEvents: 'events/bind'}),
    // ...mapActions({ bindUsers: 'users/bind'}),
    async logout() {
      await this.$fire.auth.signOut()
      this.user = null
    },
  },
}
</script>