<template lang="html">
  <v-app>
    <v-container>
      <v-layout justify-center align-center fill-height>
        <v-flex>
          <v-card :color='is_practice ? "yellow lighten-5" : "deep-purple lighten-5"'>
            <!-- Help -->
            <v-tooltip left v-model='instructions_tooltip'>
              <template v-slot:activator="{ on }">
                <v-btn v-on='on' flat icon color="grey" large
                @click='instructions_dialog=true'
                style='position:absolute;right:0;top:0;z-index:100;'>?</v-btn>
              </template>
              <span>Instructions</span>
            </v-tooltip>
            <!--  -->
            <v-card-title primary-title>
              <v-layout column align-center>
                <h3 class="headline">
                  Audio Classification {{is_practice ? " (Practice)":null}}
                </h3>
                <span class="subheading">Click Play to begin</span>
              </v-layout>
            </v-card-title>
            <!-- Tasks -->
            <!--       -->
            <v-window v-model='step'>
              <v-window-item v-for='(item, index) in current_items'
              :key='index' lazy>
                <v-container grid-list-lg>
                  <v-layout column>
                    <!-- Audio -->
                    <!--       -->
                    <v-flex>
                      <v-audio :file='"assets/audio/" + (group ? (group + "/"):"") + item.file'
                      :ended='() => {item.audio_step=true}'>
                        <v-btn outline round class="teal--text"
                        @click='audiosample_dialog=true'>
                            <span>{{item.label}} only recording</span>
                        </v-btn>
                      </v-audio>
                    </v-flex>
                    <!-- Classification -->
                    <!--                -->
                    <v-flex>
                      <v-card>
                        <v-card-title>
                          <span>Is there a(n) {{item.label}} present in the recording?</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions v-show='item.audio_step || debug'>
                          <v-radio-group row
                          v-model='item.classification'
                          @change='item.class_step=true'>
                            <v-radio label="Yes" :value="true"></v-radio>
                            <v-radio label="No" :value="false"></v-radio>
                          </v-radio-group>
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                    <!-- Confidence & Lottery -->
                    <!--                      -->
                    <template v-if='task_type===1'>
                      <!-- Type 1: Confidence -->
                      <v-flex v-show='item.class_step'>
                        <v-card>
                          <v-card-title>
                            How confident are you with your answer?
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-tooltip bottom class='v-input'>
                              <span>I am {{ item.confidence }}% confident in my answer that there is {{ !item.classification ? "not" : ""}} a {{ item.label }} present in the recording.</span>
                              <v-slider thumb-label :step='10'
                              slot='activator'
                              :color='item.bet_step ? "" : "grey"'
                              v-model="item.confidence"
                              @change='item.bet_step=true'>
                                <span slot='prepend'>0%</span>
                                <span slot='append'>100%</span>
                              </v-slider>
                            </v-tooltip>
                          </v-card-actions>
                        </v-card>
                      </v-flex>
                    </template>
                    <template v-if='task_type===2'>
                      <!-- Type 2: Lottery -->
                      <v-flex v-show='item.class_step'>
                        <v-card>
                          <v-card-title>
                            <span>
                              <b>You have the chance to win a dollar in one of the following ways (choose one):</b> <br>
                              1) by lottery (<flash v-model='animate'>{{item.confidence}}%</flash> chance of winning), or<br>
                              2) by correctly answering the question
                            </span>
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-actions class='layout justify-space-around row wrap'>
                              <v-btn color="primary"
                              :disabled='item.bet_step'
                              @click='addChoice(item, false)'>
                                <span><flash v-model='animate'>{{item.confidence}}%</flash> chance lottery</span>
                              </v-btn>
                              <v-btn color="primary"
                              :disabled='item.bet_step'
                              @click='addChoice(item, true)'>
                                <span>Correctly answering the question</span>
                              </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-flex>
                    </template>
                  </v-layout>
                </v-container>
              </v-window-item>
            </v-window>
            <!-- Navigation -->
            <!--            -->
            <v-card-actions class="center-text-xs">
              <v-spacer></v-spacer>
              <v-btn depressed block
                :color=" !is_final ? 'primary' : 'success'"
                :disabled='!current_items[step].bet_step'
                @click="processRound(current_items[step])">
                {{ !is_final ? 'Next Recording' : 'Finish'}}
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-flex xs12 justify-center>
            <v-card flat color='transparent'>
              <v-card-text class="text-xs-center">
                <span class="grey--text">{{is_practice ? '~' : current_round}}/{{items.length}}</span>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-flex>
        <!-- Round Submit Message -->
        <!--                      -->
        <round-dialog v-model='round_dialog'
        :item='current_items[step]'
        :task_type='task_type'
        :round='current_round'
        :demo="is_practice"
        @submit='next_round()'
        @repeat='newPractice()'>
        </round-dialog>
        <!-- Instructions Message -->
        <!--                      -->
        <instructions-dialog
        v-model='instructions_dialog'
        :consent_form='instructions_consent'
        :instructions='(task_type == 1) ? instructions_type1 : instructions_type2'
        @active_parent_change='showTooltip()'>
        </instructions-dialog>
        <!-- Process Message -->
        <!--                      -->
        <v-dialog persistent
          v-model="submit_dialog"
          width="500">
          <v-card v-if='items.length'>
            <v-card-title>
              <span class="heading">Round #{{ submit_step + 1 }}</span>
            </v-card-title>
            <v-window v-model='submit_step'>
              <v-window-item :value='-1'>
                <v-card-text>
                  <template v-if='task_type==2'>
                    <p>This is your computer clock, presenting the time down to the millisecond (1/1000th of a second).</p>
                    <p>If the last two digits of the stopped clock are strictly less than the lottery winning chances you win the $1 bonus, and if they are more, then you win nothing.</p>
                    <p>Now, try to stop the clock showing the current time to millisecond precision. Because of the human reaction time, it is not possible for you to control these last two digits of the millisecond clock. The purpose of this is to generate a random number, and match your probability of winning to the selected round chances. </p>
                    <stopwatch></stopwatch>
                    <p>For questions in which you chose to test your answer, your win will depending on if your answer was correct.</p>
                  </template>
                  <template v-else>
                    <p>Now your answers will be tested. Whether you win or not depends on if your answer is correct for that round.</p>
                  </template>
                </v-card-text>
              </v-window-item>
              <v-window-item v-for='(item, index) in items'
              :key='item.file'
              :value='index'>
                <v-card-text v-if='task_type==1 || item.type == 1'
                class='text-xs-center'>
                  <h1>Answer Test</h1>
                  <h3>In round {{ submit_step + 1 }} your answer was selected for testing.</h3>
                  <span v-if='item.won'>
                    <h3>Your answer was correct</h3>
                    <h1 class='green--text'>You won a dollar!</h1>
                  </span>
                  <span v-else>
                    <h3>Your answer was incorrect</h3>
                    <h1 class='red--text'>No dollar won :(</h1>
                  </span>
                </v-card-text>
                <v-card-text v-else
                class='text-xs-center'>
                  <h1>Lottery</h1>
                  <h3>In round {{ submit_step + 1 }} a(n) <b>{{item.chance}}</b>% lottery was selected. To determine if you win the bonus, we will let you stop the clock below. </h3>
                  <p>The last two digits must be less than <b>{{item.chance}}</b> for you to win.</p>
                  <stopwatch @stop='setWon($event, item)'></stopwatch>
                  <template v-if='item.won != -1'>
                    <span v-if='item.won'>
                      <h3>You won the lottery</h3>
                      <h1 class='green--text'>You won a dollar!</h1>
                    </span>
                    <span v-else>
                      <h3>You lost the lottery</h3>
                      <h1 class='red--text'>No dollar won :(</h1>
                    </span>
                  </template>
                </v-card-text>
              </v-window-item>
            </v-window>
            <v-card-actions class="center-text-xs">
              <v-spacer></v-spacer>
              <v-btn depressed block
                :color="!is_final_submit ? 'primary' : 'success'"
                :disabled='submit_step >= 0 && items[submit_step].won == -1'
                @click="next_submit()">
                {{ !is_final_submit ? 'Next' : 'Finish'}}
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Final Submit Message -->
        <!--                      -->
        <code-dialog
        v-model='code_dialog'
        :uuid='id'
        :reward='wins'/>
        <!-- Sample Dialog -->
        <!--               -->
        <v-dialog v-model="audiosample_dialog" max-width="500">
          <v-audio v-if="audiosample_dialog" minimal file='assets/audio/demo.wav'>
          </v-audio>
        </v-dialog>
        <!-- Error Message -->
        <!--               -->
        <error-dialog
        v-model='error_dialog'
        :message='error_message'/>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style lang="css">
  .v-tooltip>span {
    width: 100%;
  }
  iframe {
    border: none;
  }
</style>

<script>
import VuetifyAudio from './components/VuetifyAudio'
import TextHighlight from './components/TextHighlight'
import InstructionsDialog from './components/InstructionsDialog'
import ErrorDialog from './components/ErrorDialog'
import Stopwatch from './components/Stopwatch.vue'
import CodeDialog from './components/CodeDialog'
import RoundDialog from './components/RoundDialog'
import consentForm from './consent_form.js'
import type1instr from './components/instructions/type1.js'
import type2instr from './components/instructions/type2.js'

export default {
  name: 'App',
  components: {
    'v-audio': VuetifyAudio,
    'flash': TextHighlight,
    'instructions-dialog': InstructionsDialog,
    'error-dialog': ErrorDialog,
    'stopwatch': Stopwatch,
    'code-dialog': CodeDialog,
    'round-dialog': RoundDialog
  },
  data () {
    return {
      id: "05cdbc17-fc15-4e48-a29f-756029933bc5",
      practice: true,
      code_dialog: false,
      submit_dialog: false,
      round_dialog: false,
      audiosample_dialog: false,
      instructions_dialog: true,
      instructions_consent: consentForm,
      instructions_type1: type1instr,
      instructions_type2: type2instr,
      instructions_tooltip: false,
      error_dialog: false,
      error_message: {
        data: "Cause unknown."
      },
      round_response: {
        chose: 0,
        type: 1,
        chance: 70,
        pending: false,
        complete: true,
      },
      task_type: 1,
      step: 0,
      submit_step: -1,
      group: null,
      practice_item: [{
        file: "demo.wav",
        label: "jackhammer",
        audio_step: false,
        class_step: false,
        bet_step: false,
        confidence: 50,
        classification: null,
        choices: [],
        practicekey: ''
      }],
      items: [  ],
      animate: false,
      debug: false,
      is_practice: true,
    }
  },
  computed: {
    is_final() {
      return this.current_round == this.items.length
    },
    current_items() {
      return (this.is_practice ? this.practice_item : this.items)
    },
    current_round() {
      return this.step + 1
    },
    is_final_submit() {
      return this.current_submit_round == this.items.length
    },
    current_submit_round() {
      return this.submit_step + 1
    },
    wins() {
      return this.items.filter((obj) => obj.won).length
    }
  },
  methods: {
    next_submit() {
      if (this.is_final_submit) {
        this.submit_dialog = false
        this.submitAll()
      } else {
        this.submit_step++
      }
    },
    setWon(e, item) {
      if (item.won === -1)
        item.won = (e < item.chance)
    },
    showTooltip() {
      this.instructions_tooltip = true;
      setTimeout(() => {
        this.instructions_tooltip = false;
      }, 3000);
    },
    next_round() {
      if (this.is_practice)
        this.is_practice = false
      else if (this.is_final)
        this.submit_dialog = true
      else
        this.step++

    },
    handleError(error) {
      this.error_message = error.response;
      this.error_dialog = true;
      this.submit_dialog = this.round_dialog = false;
    },
    addChoice(item, choice) {
      item.choices.push(choice)
      item.confidence += 10
      item.bet_step=(item.confidence == 100)
      this.animate = true
    },
    processRound(item) {
      if (this.task_type == 2) {
        let r = Math.floor(Math.random() * 5)
        item.chose = r
        item.type = item.choices[r]
        if (item.type == 0)
          item.chance = (r + 5) * 10
      }
      if (this.task_type == 1 || item.type == 1) {
        let data = {
          'id': this.id,
          'item': item,
        }
        this.$axios.post("/truth", data).then(response => {
          item.won = response.data
        }).catch(error => {
          this.handleError(error)
        })
      }
      this.round_dialog = true
    },
    submitAll() {
      let data = {
        'id': this.id,
        'items': this.items,
      }
      this.$axios.post("/post/all", data).then(() => {
        this.code_dialog = true
      }).catch(error => {
        this.handleError(error)
      })
    },
    newPractice() {
      if (this.items.length == 0)
        return
      this.practice_item = [Object.assign({},this.items[Math.floor(Math.random()*this.items.length)])]
      this.practice_item[0].practice_key = "practice"
      this.practice_item[0].choices = []
    }
  },
  created() {
    let args = window.surveydata
    if (!args) {
      console.error("No data recieved from server! Demo only. ")
      this.task_type = Math.floor(Math.random() * 2) + 1
      return
    }
    this.task_type = parseInt(args['task_type'], 10)
    console.log("task: " + this.task_type)
    this.id = args['id']
    this.group = args['group']

    // add defaults
    for (let i = 0; i < args['items'].length; i++) {
      args['items'][i] = Object.assign(args['items'][i], {
          'audio_step': false,
          'class_step': false,
          'bet_step': false,
          'confidence': 50,
          'classification': null,
          'choices': [],
          'won': -1,
          'practicekey': ''
      })
    }

    this.items = args.items
    this.newPractice();
  }
}
</script>
