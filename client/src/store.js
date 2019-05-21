import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function addAttributes(item) {
  return Object.assign(item, {
      'confidence': 50,
      'classification': null,
      'choices': [],
      'won': -1,
  })
}

let args = window.surveydata
if (!args) {
  console.error("No data recieved from server! Demo only. ")
  args = {}
} else {
  for (let i = 0; i < args['items'].length; i++) {
    args['items'][i] = addAttributes(args['items'][i])
  }
}

args["practice_items"] = []
for (let i = 0; i < 20; i++) {
  args["practice_items"].push(addAttributes({
    file: 'practice/' + (i < 10 ? 'positive/' : 'negative/') + i % 10 + '.wav',
    truth: (i < 10)
  }))
}

export default new Vuex.Store({
  state: {
    id: args['id'] || "tH1s-i5-A-s4mpL3-c0D3",
    survey_type: parseInt(args['task_type'], 10) || Math.floor(Math.random() * 2) + 1,
    debug: false,
    items: args["practice_items"] || [],
    is_practice: true,
    step: 0,
    audio_step: false,
    class_step: false,
    bet_step: false,

    round_response: {
      chose: 0,
      type: 1,
      chance: 0,
      pending: false,
      complete: true,
    },
  },
  getters: {
    is_type1(state) {
      return state.survey_type === 1
    },
    is_type2(state) {
      return state.survey_type === 2
    },
    wins(state) {
      return state.items.filter((obj) => obj.won).length
    },
    round_number(state) {
      return state.is_practice ? '~' : state.step + 1
    },
    is_last_item(state) {
      return state.step + 1 == state.items.length
    },
    current_item(state) {
      return state.items[state.step]
    }
  },
  mutations: {
    setWon(state, didwin) {
      state.items[state].won = didwin
    },
    setCurrentItem(state, data) {
      for (key : state.items[state.step])
      state.items[state.step] = Object.assign(state.items[state.step], data)
    },
    endPractice(state) {
      state.items = args["items"]
      state.step = 0
      state.practice = false
    },
    nextItem(state) {
      state.step++
      state.audio_step= false;
      state.class_step = false;
      state.bet_step = false;
    },
    audioComplete(state) {
      state.audio_step = true
    },
    classComplete(state) {
      state.class_step = true
    },
    betComplete(state) {
      state.bet_step = true
    }
  },
  actions: {
    // processRound({ commit, state, getters }, index) {
    //   if (getters.is_type2) {
    //     let r = Math.floor(Math.random() * 5)
    //     item.chose = r
    //     item.type = item.choices[r]
    //     if (item.type == 0)
    //       item.chance = (r + 5) * 10
    //   }
    //   if (getters.is_type1 || item.type == 1) {
    //     commit('setWon', index, item.truth == item.classification)
    //   }
    //   this.round_dialog = true
    // },
  }
})
