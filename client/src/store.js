import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


function addAttributes(item) {
  return Object.assign(item, {
      confidence: 50,
      classification: null,
      choices: [],
      won: -1,
      chose: 0,
      type: 1,
      chance: 0,
  })
}

function makeItems(arr) {
  let arr2 = []
  for (let obj of arr) {
    arr2.push(addAttributes(obj))
  }
  return arr2
}


let args = window.surveydata
if (!args) {
  console.error("No data recieved from server! Demo only. ")
  args = {}
  var demo = true
}

args["practice_items"] = []
for (let i = 0; i < 20; i++) {
  args["practice_items"].push({
    file: 'practice/' + (i < 10 ? 'positive/' : 'negative/') + i % 10 + '.wav',
    truth: (i < 10),
  })
}

export default new Vuex.Store({
  state: {
    id: args['id'] || "tH1s-i5-A-s4mpL3-c0D3",
    survey_type: parseInt(args['task_type'], 10) || Math.floor(Math.random() * 2) + 1,
    debug: false,
    items: makeItems(args["practice_items"]),
    is_practice: true,
    step: 0,
    audio_step: false,
    class_step: false,
    bet_step: false,

    // round_response: {
    //   chose: 0,
    //   type: 1,
    //   chance: 0,
    //   pending: false,
    //   complete: true,
    // },
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
      return state.is_practice ? '(practice)' : state.step + 1
    },
    max_round_number(state) {
      return state.is_practice ? '~' : state.items.length
    },
    is_last_item(state) {
      return state.step + 1 == state.items.length
    },
    current_item(state) {
      return state.items[state.step]
    },
  },
  mutations: {
    toggleDebug(state) {
      state.debug = !state.debug
    },
    setItem(state, data, index = state.step) {
      for (let key in data) {
        if (state.items[index].hasOwnProperty(key))
          state.items[index][key] = data[key]
        else
          console.error("Invalid key: " + key)
      }
    },
    endPractice(state) {
      if (demo)
        state.items = makeItems(args["practice_items"])
      else
        state.items = makeItems(args["items"])
      state.step = 0
      state.is_practice = false
      state.audio_step = false
      state.class_step = false
      state.bet_step = false
    },
    nextItem(state) {
      if (state.step + 1 == state.items.length) {
        state.step = 0
        state.items = makeItems(args["practice_items"])
      }
      else
        state.step++
      state.audio_step = false
      state.class_step = false
      state.bet_step = false
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
  }
})
