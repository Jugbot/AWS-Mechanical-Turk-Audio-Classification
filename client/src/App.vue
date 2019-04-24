<template lang="html">
  <v-app>
    <v-container>
      <v-layout justify-center align-center fill-height>
        <v-flex>
          <v-card :color='is_practice ? "yellow lighten-5" : "deep-purple lighten-5"' v-if='items.length'>
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
              <v-window-item v-for='(item, index) in items'
              :key='item.file'
              :value='index+1'>
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
                    <template v-if='task_type==1'>
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
                    <template v-if='task_type==2'>
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
                :color="step !== items.length ? 'primary' : 'success'"
                :disabled='!items[step-1].bet_step'
                @click="submitOne(items[step-1])">
                {{ step !== items.length ? 'Next Recording' : 'Finish'}}
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-flex xs12 justify-center>
            <v-card flat color='transparent'>
              <v-card-text class="text-xs-center">
                <span class="grey--text">{{is_practice ? '~' : step-1}}/{{items.length-1}}</span>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-flex>
        <!-- Round Submit Message -->
        <!--                      -->
        <round-dialog v-model='round_dialog'
        :round_data='round_response'
        :task_type='task_type'
        :demo="is_practice"
        @submit='round_toggle()'
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
        <!-- Final Submit Message -->
        <!--                      -->
        <submit-dialog
        v-model='submit_dialog'
        :reward='total_wins'
        :uuid='id'/>
        <!-- Sample Dialog -->
        <!--               -->
        <v-dialog v-model="audiosample_dialog" max-width="500">
          <!-- Note the v-if is for stopping the sound when user exits -->
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
import SubmitDialog from './components/SubmitDialog'
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
    'submit-dialog': SubmitDialog,
    'round-dialog': RoundDialog
  },
  data () {
    return {
      id: "05cdbc17-fc15-4e48-a29f-756029933bc5",
      practice: true,
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
        spinner_activate: false,
        chose: 0,
        type: 1,
        won: 1,
        spin: 0.574,
        chance: 70,
        pending: false,
        complete: false,
      },
      total_wins: 0,
      task_type: 1,
      step: 1,
      group: null,
      items: [
        {
          file: "demo.wav",
          label: "jackhammer",
          audio_step: false,
          class_step: false,
          bet_step: false,
          confidence: 50,
          classification: null,
          choices: [],
        },
      ],
      animate: false,
      debug: false,
    }
  },
  computed: {
    is_practice() {
      return this.step == 1;
    }
  },
  methods: {
    showTooltip() {
      this.instructions_tooltip = true;
      setTimeout(() => {
        this.instructions_tooltip = false;
      }, 3000);
    },
    round_toggle() {
      if (this.items.length == this.step)
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
    submitOne(item) {
      let data = {
        'id': this.id,
        'practice': this.is_practice,
        'item': item,
      }
      this.round_response.complete = false
      this.round_response.pending = true
      if (this.task_type==1 && !this.is_practice)
        this.step++
      else
        this.round_dialog = true
      this.$axios.post("/post/one", data).then(response => {
        console.log(response)
        for (let key in response.data)
          if (response.data.hasOwnProperty(key))
            this.round_response[key] = response.data[key]
        if (this.round_response.won)
          this.total_wins++
        this.round_response.pending = false
        setTimeout(() => {
          this.round_response.spinner_activate = !this.round_response.spinner_activate
        }, 500);
      }).catch(error => {
        this.handleError(error)
      })
    },
    newPractice() {
      if (this.items.length == 0)
        return
      this.items[0] = this.items[1+Math.floor(Math.random()*(this.items.length-1))]
    }
  },
  created() {
    let args = window.surveydata
    if (!args) {
      console.error("No data recieved from server! Demo only. ")
      this.task_type = Math.floor(Math.random() * Math.floor(2)) + 1
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
      })
    }

    this.items = this.items.concat(args.items)
    this.newPractice();
  }
}
</script>
