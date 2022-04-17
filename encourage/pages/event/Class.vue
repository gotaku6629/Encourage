<template>
  <v-app>
    <v-content>
      <v-btn outlined nuxt to="/">
        <v-icon left> mdi-chevron-left </v-icon>Top Page
      </v-btn>

      <v-card class="mt-5 mt-8" color="red lighten-5">
        <v-card-title> 就活講座イベント</v-card-title>

        <v-card-text>
          <v-container>
            <v-row class="justify" align="center">
              <v-col v-for="event in events" :key="event.id" justify="center" cols="12" md="6" sm="12">
                <v-col>
                  <!-- Event for each other -->
                  <v-card class="mx-auto my-12" max-width="600" color="white">
                    <v-img
                      height="250"
                      :src="event.img"
                    ></v-img>

                    <v-card-title> {{ event.title }} </v-card-title>

                    <v-card-text>                      
                      <v-row align="center" class="mx-0">
                        <v-rating
                          :value="4.5"
                          color="amber"
                          dense
                          half-increments
                          readonly
                          size="14"
                        ></v-rating>
                          <div class="grey--text ms-4">
                            4.5 (413)
                          </div>
                      </v-row>
                      
                      <div class="my-4 text-subtitle-1">
                        {{ event.start }} ~ {{ event.end }}
                      </div>                                                                                 
                    
                      <v-card-text> {{ event.zcom }} </v-card-text>

                      <button @click="externalLink(event.url)">
                        <v-btn
                          color="orange"
                          style="text-transform: none"
                        >
                          Click
                        </v-btn>
                      </button>
                    </v-card-text>

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
      return this.$store.getters['events/byCategory']("就活講座")
    },
  },

  methods: {
    externalLink(url) {
      window.open(url, '_blank')
    }
  }  
}
</script>
