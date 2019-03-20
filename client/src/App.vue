<template lang="html">
  <v-app>
    <v-container>
      <v-layout justify-center align-center fill-height>
        <v-flex>
          <v-card color='deep-purple lighten-5' v-if='items.length'>
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
              <v-layout justify-center>
                <h3 class="headline">
                  Audio Classification
                </h3>
              </v-layout>
            </v-card-title>
            <!-- Tasks -->
            <!--       -->
            <v-window v-model='step'>
              <v-window-item v-for='item, index in items'
              :key='item.file'
              :value='index+1'>
                <v-card-text>
                  <v-container grid-list-lg>
                    <v-layout column>
                      <!-- Audio -->
                      <!--       -->
                      <v-flex>
                        <v-audio :file='"assets/audio/" + group + "/" + item.file' :ended='() => {item.audio_step=true}'></v-audio>
                      </v-flex>
                      <!-- Classification -->
                      <!--                -->
                      <v-flex>
                        <v-card>
                          <v-card-title>
                            <span>Is there a(n) {{item.label}} present in the recording?</span>
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-actions v-show='item.audio_step'>
                            <v-radio-group row
                            :disabled='item.class_step'
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
                                <span>I am {{ item.confidence }}% confident in my answer.</span>
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
                </v-card-text>
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
                {{ step !== items.length ? 'Next' : 'Finish'}}
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
            <!-- Round Submit Results -->
            <!--                      -->
            <v-dialog persistent
              v-model="round_dialog"
              width="500">
              <v-card>
                <v-card-title class="headline">Round Results</v-card-title>
                <template v-if="round_response.pending">
                  <v-card-text class='text-sm-center'>
                    <v-progress-circular
                      color="primary"
                      indeterminate
                      :size="64">
                    </v-progress-circular>
                  </v-card-text>
                </template>
                <template v-else>
                  <v-card-text v-if='task_type == 2'
                  class="subheading">
                    <span>From the 5 answers given, answer {{round_response.chose+1}} was selected. You have chosen to </span>
                    <span v-if='round_response.type == 0'>draw a {{ round_response.chance }}% chance lottery. </span>
                    <span v-else>test your answer. </span>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text v-if='round_response.type == 0'>
                    <v-layout>
                      <v-flex grow xs10 offset-xs1>
                        <spinner :chance='round_response.chance'
                        :result='round_response.spin'
                        :activate='round_response.spinner_activate'
                        @complete='round_response.complete = true'
                        class='elevation-10'/>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-text :style="{visibility: (round_response.complete || round_response.type == 1) ? 'visible' : 'hidden'}"
                  class='text-sm-center'>
                    <span v-if='round_response.won'>
                      <h1 class='green--text'>You won a dollar!</h1>
                      <h3 v-if='round_response.type == 1'>Answer is correct</h3>
                      <h3 v-else>You won the lottery</h3>
                    </span>
                    <span v-else>
                      <h1 class='red--text'>No dollar won :(</h1>
                      <h3 v-if='round_response.type == 1'>Answer is incorrect</h3>
                      <h3 v-else>You lost the lottery</h3>
                    </span>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary"
                      depressed
                      @click="round_dialog=false;
                      if(step === items.length)submit_dialog=true;
                      else step++;">
                      Next
                    </v-btn>
                  </v-card-actions>
                </template>
              </v-card>
            </v-dialog>
          </v-card>
          <v-flex xs12 justify-center>
            <v-card flat color='transparent'>
              <v-card-text class="text-xs-center">
                <span class="grey--text">{{step}}/{{items.length}}</span>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-flex>
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
        :uuid='id'/>
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
import VuetifyAudio from 'vuetify-audio'
import TextHighlight from './components/TextHighlight'
import Spinner from './components/Spinner'
import InstructionsDialog from './components/InstructionsDialog'
import ErrorDialog from './components/ErrorDialog'
import SubmitDialog from './components/SubmitDialog'
import consentForm from './consent_form.js'
import type1instr from './components/instructions/type1.js'
import type2instr from './components/instructions/type2.js'

export default {
  name: 'App',
  components: {
    'v-audio': VuetifyAudio,
    'flash': TextHighlight,
    'spinner': Spinner,
    'instructions-dialog': InstructionsDialog,
    'error-dialog': ErrorDialog,
    'submit-dialog': SubmitDialog
  },
  data () {
    return {
      id: "05cdbc17-fc15-4e48-a29f-756029933bc5",
      no_data: false,
      read_only: false,
      submit_dialog: false,
      round_dialog: false,
      instructions_dialog: true,
      instructions_consent: consentForm,
      instructions_type1: type1instr,
      instructions_type2: type2instr,
      instructions_tooltip: false,
      error_dialog: false,
      error_message: "Cause unknown.",
      round_response: {
        spinner_activate: false,
        chose: 0,
        type: 0,
        won: 1,
        spin: 0.574,
        chance: 70,
        pending: false,
        complete: false,
      },
      task_type: 1,
      step: 1,
      group: '.',
      items: [
        {"file": "demo.wav", "label": "test",
            'audio_step': false,
            'class_step': false,
            'bet_step': false,
            'confidence': 50,
            'classification': null,
            'choices': [],}
      ],
      animate: false,
    }
  },
  methods: {
    showTooltip() {
      this.instructions_tooltip = true;
      setTimeout(() => {
        this.instructions_tooltip = false;
      }, 3000);
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
        'item': item,
      }

      this.round_response.pending = true
      this.round_dialog = true
      axios.post("/post/one", data).then(response => {
        for (let key in response.data)
          if (response.data.hasOwnProperty(key))
            this.round_response[key] = response.data[key]
        console.log(this.round_response)
        this.round_response.pending = false
        setTimeout(() => {
          this.round_response.spinner_activate = true
        }, 500);
      }).catch(error => {
        this.handleError(error)
      })
    },
  },
  created() {
    let args = window.surveydata
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
    this.items = args['items']
  }
}
</script>
