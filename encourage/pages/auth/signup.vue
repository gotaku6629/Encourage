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
                      placeholder="名前 (e.g. 名工太郎)"
                      name="email"
                      style="margin-top: 20px"
                    />
                  </div>
                  <div class="field">
                    <input
                      v-model="encourage_Id"
                      class="input"
                      type="email"
                      placeholder="en-courage ID (e.g. 123456)"
                      name="email"
                      style="margin-top: 20px"
                    />
                  </div>
                  <div class="field">
                    <input
                      v-model="phonenumber"
                      class="input"
                      type="email"
                      placeholder="電話番号 (e.g. 09012345678)"
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
                      placeholder="パスワード (6文字以上)"
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
      // 愚直なREST API参考：https://pg-log.com/nuxt-vue-wp-rest-api/
      if (this.univ === '名古屋工業大学'){
        this.encourage_Id = await this.$axios.$get(
          'https://script.google.com/macros/s/AKfycbyFlxjRDK_SXU5jO8eHB811l4l86kvxF41hZYg3KmbUxNJFANfep1KVLu33m_Jqle6y/exec',
          { params: {username, phonenumber},}
        )
      } else if(this.univ === '名古屋大学'){
        this.encourage_Id = await this.$axios.$get(
          'https://script.google.com/macros/s/AKfycbz0lak_DYyssEHMA3Z_3WtLaFQlFtUyLpQzeJtbqOLFk_v0ioOmh-mb8LS59yl7oIUb/exec',
          { params: {username, phonenumber},}
        )
      }
      // .catch(err => { // リクエスト失敗時
      //   console.log('Get Method Error')
      //   console.log(err.response)
      // }
      // )
      this.$nuxt.$loading.finish();
      // console.log(this.encourage_Id)
      this.encourage_Id = String(this.encourage_Id)
      // console.log(this.encourage_Id)
    },
    async signup2() {
      /*
      await this.getUsers(this.username, this.phonenumber)
      console.log('waiting...')
      this.signup();
      */
      await this.getUsers(this.username, this.phonenumber)
      .then(() => {
        this.signup();
      })
    },
    signup() {  
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)     
        .then((userCredential) => {
          this.user = userCredential.user
          console.log('------ update --------')
          console.log('username', this.username)
          console.log('univ', this.univ)
          console.log('encourage_Id', this.encourage_Id)
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
                        this.$router.push('/mypage')
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
