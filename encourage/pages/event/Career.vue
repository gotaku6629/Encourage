<template>
  <v-app>
    <v-content>
      <v-card class="mt-5 mt-8" color="black">

        <v-card-title> キャリア設計イベント</v-card-title>

        <v-card-text>
          <v-container>
            <v-row class="justify" align="center">
              <v-col v-for="event in events" :key="event.id" justify="center" cols="12" md="6" sm="12">
                <v-col cols="12" sm="10">
                  <v-card color="black" outlined tile class="py-5">
                    <v-card-title>
                      {{ event.title }}
                    </v-card-title>
                    <v-card-sub-title>
                      {{ event.start }} ~ {{ event.end }}
                    </v-card-sub-title>                    
                    <v-card-text>
                      {{ event.zcom }}
                    </v-card-text>
                    <button @click="externalLink(event.url)">
                      <v-btn
                        color="orange"
                        style="text-transform: none"
                      >
                        Click
                      </v-btn>
                    </button>            
                  </v-card>
                </v-col>
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
      return this.$store.getters['events/byCategory']("キャリア設計")
    },
  },

  methods: {
    externalLink(url) {
      window.open(url, '_blank')
    }
  }  
}
</script>
