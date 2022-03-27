<template>
  <v-app>
    <v-content>
      <v-card class="mt-5 mt-8" color="black">

        <v-card-title> 就活講座イベント</v-card-title>

        <v-card-text>
          <v-container>
            <v-row class="justify" align="center">
              <v-col class="justify" cols="12" md="6" sm="12">
                <v-row v-for="event in events" :key="event.id" justify="center">
                  <v-col cols="12" sm="10">
                    <v-card color="black" outlined tile class="py-5">
                      <v-card-title>
                        {{ event.comments }}
                      </v-card-title>
                      <v-subheader>
                        {{ event.url }}
                      </v-subheader>
                      <v-card-text>
                        {{ event }}
                      </v-card-text>
                      <button @click="externalLink(event.url)">
                        <v-btn
                          color="primary"
                          style="text-transform: none"
                        >                    
                          Click
                        </v-btn>
                      </button>            
                    </v-card>
                  </v-col>
                </v-row>
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
  name: 'EventListPage1',

  computed: {
    events() {
      return this.$store.getters['events/all']
    },
  },

  methods: {
    externalLink(url) {
      window.open(url, '_blank')
    }
  }  
}
</script>
