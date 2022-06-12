<template>
  <div>
    <v-btn outlined nuxt to="/auth/login">
      <v-icon> mdi-chevron-left </v-icon>Sign In
    </v-btn>

    <div v-if="idError">
      アカウントの作成に失敗しました。別のメールアドレスでお試しください。<br />
      <button @click="back">Back to signup</button>
    </div>

    <div v-else>
      <div id="app" align="center">
        <section class="user-log-in">
          <v-card color="grey lighten-3">
            <div class="user-log-in-body">
              <div class="log-in_phrase">ユーザー登録</div>
              <div class="log-in-main">
                <div class="box">
                  <div class="field">
                    <input
                      v-model="user_name"
                      class="input"
                      type="email"
                      placeholder="ユーザー名"
                      name="email"
                      style="margin-top: 10px"
                    />
                  </div>
                  <div class="field">
                    <input
                      v-model="encourage_Id"
                      class="input"
                      type="email"
                      placeholder="エンカレッジId"
                      name="email"
                      style="margin-top: 20px"
                    />
                  </div>
                  <div class="field">
                    <input
                      v-model="email"
                      class="input"
                      type="email"
                      placeholder="メールアドレス"
                      name="email"
                      style="margin-top: 20px"
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
                      style="margin-top: 20px"
                    />
                  </div>
                </div>
                <div class="buttons">
                  <v-form ref="form" lazy-validation>
                    <v-btn color="orange" @click="signup">Sign up</v-btn>
                  </v-form>
                </div>
              </div>
            </div>
          </v-card>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from 'firebase/compat'
export default {
  data() {
    return {
      user_name: '',
      encourage_Id: '',
      email: '',
      password: '',
      user: {},
      idError: '',
    }
  },
  methods: {
    ...mapActions({
      createUser: 'users/add',
      bindUser: 'users/bindUser',
      bindHistgram: 'users/bindHistgram',
    }),
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.user = userCredential.user
          // ユーザー名、photoURLの登録
          this.user
            .updateProfile({
              displayName: this.user_name,
              // tenantId: this.encourage_Id,
              // photoURL: 'sample'
              photoURL: this.encourage_Id, // photoURLで回してみる！
              // uid: this.encourage_Id    // uIdは指定できない
            })
            .then(() => {
              // const res = this.createUser(this.user)
              // console.log(res)
              this.createUser(this.user).then(() => {
                // ユーザーデータをfirestoreから持ってくる
                this.bindUser(this.encourage_Id).then(() => {
                  this.bindHistgram().then(() => {
                    this.$router.push('/')
                  })
                })
              })
              // this.$router.push('/')
            })
            .catch((error) => {
              this.idError = 'error'
              console.error(error)
            })
        })
        .catch((error) => {
          this.idError = 'error'
          console.error(error)
        })
    },
    back() {
      this.idError = ''
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
