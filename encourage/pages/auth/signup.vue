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
              <!--
              <td> {{ encourage_Id }} </td>
              --> 
              <div class="log-in-main">
                <div class="box">
                  <div class="field">
                    <input
                      v-model="univ"
                      type="radio" 
                      id="one" 
                      value="名古屋大学"
                    >
                    <label for="one">名古屋大学</label>
                    <input 
                      v-model="univ"
                      type="radio" 
                      id="one" 
                      value="名古屋工業大学" 
                    >
                    <label for="one">名古屋工業大学</label>
                  </div>                                    
                  <div class="field">
                    <input
                      v-model="username"
                      class="input"
                      type="email"
                      placeholder="ユーザー名"
                      name="email"
                      style="margin-top: 20px"
                    />
                  </div>
                  <!--
                  <div class="field">
                    <input
                      v-model="univ"
                      class="input"
                      type="email"
                      placeholder="大学名：{名古屋大学, 名古屋工業大学}"
                      name="email"
                      style="margin-top: 20px"
                    />
                  </div>
                  -->                
                  <div class="field">
                    <input
                      v-model="phonenumber"
                      class="input"
                      type="email"
                      placeholder="電話番号"
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
                    <v-btn color="orange" @click="signup2">Sign up</v-btn>
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
      username: '',
      encourage_Id: '',
      email: '',
      phonenumber: '',
      password: '',
      user: {},
      idError: '',
      univ: '',
    }
  },
  methods: {
    ...mapActions({
      createUser: 'users/add',
      bindUser: 'users/bindUser',
      bindHistgram: 'users/bindHistgram',
    }),
    // GASからencourage_Idを取得
    async getUsers(username, phonenumber){  // 非同期関数
      console.log('------ getUsers --------')
      this.$nuxt.$loading.start();
      this.encourage_Id = await this.$axios.$get('/api', {
        params: {username, phonenumber},
      })
      this.$nuxt.$loading.finish();
      // console.log(this.encourage_Id)
      this.encourage_Id = String(this.encourage_Id)
      // console.log(this.encourage_Id)
    },
    async signup2() {
      await this.getUsers(this.username, this.phonenumber)
      console.log('waiting...')
      this.signup();
    },
    signup() {
      // this.$nuxt.$loading.start()
      // this.username = '小島のどか';
      // this.phonenumber = '09081856766';
      // this.univ = '名古屋工業大学'
      // this.getUsers(this.username, this.phonenumber); // GASからencourage_Idの取得
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)     
        .then((userCredential) => {
          this.user = userCredential.user
          // this.getUsers(this.username, this.phonenumber)
          this.user.updateProfile({        // ユーザー表示名とプロフィール写真のURLを更新する！
              displayName: this.username+':'+this.univ,
              photoURL: this.encourage_Id, // photoURLで回してみる！
          })
          .then(() => {
              // const res = this.createUser(this.user)
              console.log('------ singup --------')
              console.log('encourage_Id', this.encourage_Id)
              console.log('univ', this.univ)
              this.createUser(this.user).then(() => {
              // this.createUser(this.encourage_Id, this.username, this.univ).then(() => {
                  // ユーザーデータをfirestoreから持ってくる
                  this.bindUser(this.encourage_Id).then(() => {
                      this.bindHistgram().then(() => {
                        // this.$nuxt.$loading.finish()
                        this.$router.push('/')
                      })
                  })
              })
            })
            .catch((error) => {
              this.idError = 'error'
              console.log('------ error1 --------')
              console.error(error)
            })
        })
        .catch((error) => {
          this.idError = 'error'
          console.log('------ error2 --------')
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
