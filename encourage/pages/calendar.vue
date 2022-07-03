<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="height*0.2">
        <v-toolbar flat>
          <v-btn outlined nuxt to="/">
            <v-icon> mdi-chevron-left </v-icon>Top Page
          </v-btn>
          <v-spacer></v-spacer>
          <v-menu bottom right offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <v-icon left :color="category[nowCategory].color">
                  mdi-circle
                </v-icon>
                <span>{{ category[nowCategory].label }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="cat in category"
                :key="cat.label"
                @click="viewSelectedCategory(cat.label)"
              >
                <v-icon left :color="cat.color"> mdi-circle </v-icon>
                <v-list-item-title>{{ cat.label }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="height*0.2">
        <v-toolbar flat>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-toolbar-title v-if="!$refs.calendar">
            {{ defaultCalendarTitle }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet :height="height * 0.75">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          locale="ja-jp"
          :day-format="(timestamp) => new Date(timestamp.date).getDate()"
          :month-format="
            (timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'
          "
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        >
          <template v-slot:event="{ event }">
            &thinsp; {{ event.name }}
          </template>
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
          offset-y
          :min-width="width < 600 ? width * 0.7 : 600 * 0.7"
        >
          <v-card color="grey lighten-4" :width="width < 600 ? width * 0.7 : 600 * 0.7" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title v-html="selectedEvent.name" />
            </v-toolbar>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                閉じる
              </v-btn>
              <v-spacer></v-spacer>
              <button @click="externalLink(selectedEvent.url)">
                <v-btn color="orange" style="text-transform: none">
                  詳細URL
                </v-btn>
              </button>
            </v-card-actions>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CalendarPage',
  data: () => ({
    user: {},
    username: '',
    isLogined: false,
    loginUserId: '', // this.$fire.auth.currentUser.uid, // ログインid
    width: window.innerWidth,
    height: window.innerHeight,
    defaultCalendarTitle: '',
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    nowCategory: 'すべて',
    category: {
      すべて: {
        label: 'すべて',
        color: 'white',
      },
      就活講座: {
        label: '就活講座',
        color: 'red',
      },
      キャリア設計: {
        label: 'キャリア設計',
        color: 'blue',
      },
      合同説明会: {
        label: '合同説明会',
        color: 'indigo',
      },
      '個社説明会・インターン': {
        label: '個社説明会・インターン',
        color: 'deep-purple',
      },
      自己分析: {
        label: '自己分析',
        color: 'cyan',
      },
      ES: {
        label: 'ES',
        color: 'green',
      },
      GD: {
        label: 'GD',
        color: 'orange',
      },
      面接: {
        label: '面接',
        color: 'grey darken-1',
      },
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    allEvents: [],
    events: [],
  }),
  created() {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.loginUserId = user.photoURL // encourage_idを利用！
        this.user = user
        this.username = user
        this.isLogined = !!user
        if (this.user.photoURL === 'sample') {
          this.user.photoURL = null
        }
        const univ = this.$store.getters['users/univ'](this.loginUserId) // Bc={名古屋大学, 名古屋工業大学}
        let obtainedEvents = []
        if (univ === '名古屋大学') {
          obtainedEvents = this.$store.getters['NUevents/all']
        } else if (univ === '名古屋工業大学') {
          obtainedEvents = this.$store.getters['NITevents/all']
        }

        const events = []
        for (const e of obtainedEvents) {
          if (!Object.prototype.hasOwnProperty.call(e, 'daytime')) continue;
          for (const d of e.daytime) {
            const date = d.day.split('(')
            const yearMonthDay = date[0].split('/')
            const startHourMinute = d.start.split(':')
            const endHourMinute = d.end.split(':')
            events.push({
              name: e.ctitle,
              start: new Date(
                yearMonthDay[0],
                yearMonthDay[1] - 1,
                yearMonthDay[2],
                startHourMinute[0],
                startHourMinute[1]
              ),
              end: new Date(
                yearMonthDay[0],
                yearMonthDay[1] - 1,
                yearMonthDay[2],
                endHourMinute[0],
                endHourMinute[1]
              ),
              timed: !(startHourMinute[0]===endHourMinute[0] && startHourMinute[1]===endHourMinute[1]),
              details: e.zcom,
              category: e.category,
              color: this.category[e.category].color,
              url: e.url,
            })
          }
        }
        this.allEvents = events
        this.events = events
      } else {
        this.user = null
      }
    })

    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    this.defaultCalendarTitle = month + '月' + ' ' + year
  },
  mounted() {
    this.$refs.calendar.checkChange()
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.selectedOpen = true
          })
        })
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    externalLink(url) {
      window.open(url, '_blank')
    },
    viewSelectedCategory(category) {
      this.nowCategory = category
      if (category === 'すべて') {
        this.events = this.allEvents
      } else {
        this.events = this.allEvents.filter((e) => e.category === category)
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>
