<template>
  <div>
    <v-btn outlined nuxt to="/">
      <v-icon> mdi-chevron-left </v-icon>Top Page
    </v-btn>

    <!-- ログイン画面 -->
    <div v-if="isAuthenticated">
      <div id="app" align="center">
        <section class="user-log-in">
          <v-card color="grey lighten-3">
            <div class="user-log-in-body">
              <div class="log-in_phrase">Encourage Sign in</div>
              <div class="log-in-main">
                <div class="box">
                  <div class="field">
                    <input
                      v-model="email"
                      class="input"
                      type="email"
                      placeholder="メールアドレス"
                      name="email"
                    />
                  </div>
                  <div class="field">
                    <input
                      v-model="password"
                      class="input"
                      type="password"
                      placeholder="パスワード"
                      maxlength="20"
                      name="password"
                    />
                  </div>

                  <div class="field">
                    <input type="checkbox" />
                    サインインしたままにする
                  </div>
                  <button class="button"></button>
                </div>
                <p class="has-text-grey">
                  <a href="/auth/resetPass">パスワードを忘れた方はこちら</a>
                </p>
              </div>
              <div class="buttons">
                <v-form ref="form" lazy-validation>
                  <v-btn color="primary" @click="login">Sign in</v-btn>
                </v-form>
              </div>

              <div class="buttons">
                <v-form ref="form" lazy-validation>
                  <v-btn color="orange" @click="signup"
                    >アプリを初めて利用する方 >
                  </v-btn>
                </v-form>
              </div>
            </div>
          </v-card>
        </section>
      </div>
    </div>
    <!-- ログインに失敗した時の画面 -->
    <div v-else>
      ログインに失敗しました。もう一度戻ってやり直してください<br />
      <button @click="back">Back</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: '',
      user: {},
      isAuthenticated: 'init',
    }
  },
  methods: {
    ...mapActions({
      bindUser: 'users/bindUser',
      bindHistgram: 'users/bindHistgram',
    }),
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed in
          this.user = userCredential.user
          // bind User Data (firestoreからデータを持ってくる)
          this.bindUser(this.user.photoURL).then(() => {
            this.bindHistgram().then(() => {
              this.$router.push('/')
            })
          })
        })
        .catch((error) => {
          console.error(error)
          this.isAuthenticated = ''
        })
    },
    signup() {
      this.$router.push('/auth/signup')
    },
    back() {
      this.isAuthenticated = 'init'
      this.$router.push('/auth/login')
    },
  },
}
</script>

<style scoped="scss">
.input {
  color: rgb(0, 0, 0);
  margin-top: 1px;
  font-size: 16px;
  width: 20em; /* 横幅 */
  height: 25px; /* 高さ */
  border: 1px solid rgb(55, 63, 55); /* 枠線 */
}
.log-in_phrase {
  margin-top: auto;
  margin-top: 100px;
  font-size: 30px;
}
.user-log-in-body {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  width: 430px; /* 横幅 */
  height: 500px; /* 高さ */
  margin-top: 50px;
  border: 1px solid rgb(239, 236, 241); /* 枠線 */
}
.buttons {
  margin-top: 50px;
}
body {
  width: 480px;
  height: 1000px;
}
</style>
