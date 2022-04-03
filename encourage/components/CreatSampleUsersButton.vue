<template>
  <v-btn color="secondary" @click="create">create sample users</v-btn>
</template>

<script>
import { mapActions } from 'vuex'
import sampleUsers from '../assets/SampleUsers.json'

export default {
  data() {
    return {
      sampleUsers
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({ createSampleUsers: 'users/sampleSet' }),
    async create() {
      await this.createSampleUsers(this.sampleUsers)
    },
  },
}
</script>

<style></style>
