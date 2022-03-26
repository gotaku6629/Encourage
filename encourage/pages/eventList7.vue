<template>
  <v-app>
    <v-content>
      <v-card class="mt-5 mt-8" color="black">
        <v-card-title> GDイベント</v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="justify" align="center">
              <v-col class="justify" md="6" sm="12">
                <v-card class="ma-5" @click="$router.push('/')">
                  <v-card-title> event1 </v-card-title>
                  <v-card-text> イベント概略 </v-card-text>
                </v-card>
              </v-col>
              <v-col class="justify" md="6" sm="12">
                <v-card class="ma-5" @click="$router.push('/')">
                  <v-card-title> event2 </v-card-title>
                  <v-card-text> イベント概略 </v-card-text>
                </v-card>
              </v-col>
              <v-col class="justify" md="6" sm="12">
                <v-card class="ma-5" @click="$router.push('/')">
                  <v-card-title> event3 </v-card-title>
                  <v-card-text> イベント概略 </v-card-text>
                </v-card>
              </v-col>
              <v-col class="justify" md="6" sm="12">
                <v-card class="ma-5" @click="$router.push('/')">
                  <v-card-title> event4 </v-card-title>
                  <v-card-text> イベント概略 </v-card-text>
                </v-card>
              </v-col>
              <v-col class="justify" md="6" sm="12">
                <v-card class="ma-5" @click="$router.push('/')">
                  <v-card-title> event5 </v-card-title>
                  <v-card-text> イベント概略 </v-card-text>
                </v-card>
              </v-col>
              <v-col class="justify" md="6" sm="12">
                <v-card class="ma-5" @click="$router.push('/')">
                  <v-card-title> event6 </v-card-title>
                  <v-card-text> イベント概略 </v-card-text>
                </v-card>
              </v-col>
              <v-col class="justify" md="6" sm="12">
                <v-card class="ma-5" @click="$router.push('/')">
                  <v-card-title> event7 </v-card-title>
                  <v-card-text> イベント概略 </v-card-text>
                </v-card>
              </v-col>
              <v-col class="justify" md="6" sm="12">
                <v-card class="ma-5" @click="$router.push('/')">
                  <v-card-title> event8 </v-card-title>
                  <v-card-text> イベント概略 </v-card-text>
                </v-card>
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
  name: 'EventListPage7',
}
</script>
