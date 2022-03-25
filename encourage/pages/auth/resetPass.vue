<template>
  <div>
    <div v-if="isSent == 'error'">
      <p style="margin-left: 15%; margin-top: 10%; margin-right: 10%">
        そのメールアドレスは登録されていないようです。お手数ですがやり直してください。<br />
      </p>
      <button
        style="
          background-color: darkorange;
          width: 20%;
          margin-left: 45%;
          margin-top: 10%;
        "
        @click="back"
      >
        Back
      </button>
    </div>
    <div v-else-if="isSent == 'sent'">
      <p style="margin-left: 15%; margin-top: 10%; margin-right: 10%">
        ご登録のメールアドレスにメールを送信しました。メールが届かない場合はお手数ですが、やり直してください。<br />
      </p>
      <img
        src="/sending.png"
        style="width: 40%; margin-left: 30%; margin-top: 10px"
      />
      <button
        style="
          background-color: darkorange;
          width: 20%;
          margin-left: 40%;
          margin-top: 10%;
        "
        @click="back"
      >
        Back
      </button>
    </div>
    <div v-else>
      <p style="margin-left: 15%; margin-top: 10%">
        ご登録のアドレスにメールを送信します<br />
      </p>
      <p style="margin-left: 15%; margin-top: 5%">メールアドレス<br /></p>
      <input
        v-model="email"
        type="text"
        style="background-color: white; width: 70%; margin-left: 15%"
      /><br />
      <button
        style="
          background-color: darkorange;
          width: 20%;
          margin-left: 65%;
          margin-top: 10%;
        "
        @click="send"
      >
        Send mail
      </button>
      <button
        style="
          background-color: darkorange;
          width: 20%;
          margin-left: 65%;
          margin-top: 10px;
        "
        @click="back_login"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat'
export default {
  data() {
    return {
      email: '',
      isSent: '',
    }
  },
  methods: {
    send() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.isSent = 'sent'
        })
        .catch((error) => {
          console.error(error)
          this.isSent = 'error'
        })
    },
    back() {
      this.isSent = ''
    },
    back_login() {
      this.$router.push('/auth/login')
    },
  },
}
</script>