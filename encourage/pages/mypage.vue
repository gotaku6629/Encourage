<template>
  <v-content>
    <v-btn outlined nuxt to="/">
      <v-icon> mdi-chevron-left </v-icon>Top Page
    </v-btn>

    <v-card
      class="mx-auto"
      max-width="500"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">
            ユーザープロフィール
          </div>
          <v-list-item-title class="text-h5 mb-1">
            {{ userdata.Am }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ userdata.Bc}}
          </v-list-item-subtitle>
        </v-list-item-content>
  
        <v-list-item-avatar>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/Nit-logo.gif" height="500">
        </v-list-item-avatar>
        <v-icon>mdi-account</v-icon>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> 志望業界 </v-list-item-title>
          <v-list-item-subtitle> {{ userdata.業界 }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> 志望職種 </v-list-item-title>
          <v-list-item-subtitle> {{ userdata.職種 }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-spacer />
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
              Update
          </v-btn>
        </template>        
        <v-card>
          <v-card-title>
            <span class="headline">ユーザー編集</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="user.業界" label="業界" />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="user.職種" label="職種" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="user.メモ" label="メモ" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
              <v-btn @click="close">閉じる</v-btn>
              <v-btn class="primary" @click="update">更新する</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-card>
  </v-content> 
</template>
  
<script>
  import { mapActions } from 'vuex'  
  export default {
    name: 'MyPage',
    components: {},
    data() {
      return {
        // loginUserId: this.$fire.auth.currentUser.uid,   // ログインid
        loginUserId: this.$fire.auth.currentUser.photoURL, // 変更！
        dialog: false,
        user: {},
      }
    },
    computed: {
      userdata() {
        console.log("---- mypage userdata ----")
        console.log(this.loginUserId)
        const user = this.$store.getters['users/byId'](this.loginUserId)
        console.log(user)
        return user
      },
    },
    methods: {
      ...mapActions({ updates: 'users/updateUser' }),
      update () {
        console.log("---- mypage update ----")
        console.log(this.user)
        console.log(this.loginUserId)
        this.user.loginUserId = this.loginUserId
        this.updates(this.user)
        this.close()
      },
      close () {
        this.dialog = false
        // this.user = {}
      },        
    },
  }
</script>
  
<style>
  .small {
    max-width: 600px;
    margin: 50px auto;
  }
</style>
  