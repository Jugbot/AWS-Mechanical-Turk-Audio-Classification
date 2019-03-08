<template>
  <v-app>
    <v-container>
      <v-layout justify-center align-center fill-height>
        <v-flex>
          <v-form>
            <v-card color='deep-purple lighten-5' v-if='items.length'>
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
                          <v-audio :file='"assets/audio/" + item.file' :ended='() => {item.audio_step=true}'></v-audio>
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
                                  1) by correctly answering the question, or <br>
                                  2) by lottery (<flash v-model='animate'>{{item.confidence}}%</flash> chance of winning).
                                </span>
                              </v-card-title>
                              <v-divider></v-divider>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary"
                                :disabled='item.bet_step'
                                @click='addChoice(item, false)'>
                                  <span><flash v-model='animate'>{{item.confidence}}%</flash> chance lottery</span>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary"
                                :disabled='item.bet_step'
                                @click='addChoice(item, true)'>
                                  <span>Correctly answering the question</span>
                                </v-btn>
                                <v-spacer></v-spacer>
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
              <v-card-actions>
                <v-spacer></v-spacer>
                {{step}}/{{items.length}}
                <v-spacer></v-spacer>
                <v-btn depressed
                  :color="step !== items.length ? 'primary' : 'success'"
                  :disabled='!items[step-1].bet_step'
                  @click="submitOne(items[step-1])">
                  {{ step !== items.length ? 'Next' : 'Finish'}}
                </v-btn>
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
                    <v-card-text>
                      <template v-if='task_type == 2'>
                        <span>Choosing from one of your responses, </span>
                        <span v-if='round_response.type == 0'>a {{ round_response.chance }} chance lottery will be done. </span>
                        <span v-else>your answer will be tested. </span>
                      </template>
                      <template v-if='round_response.type == 0'>
                        <spinner :chance='round_response.chance' :result='round_response.spin' :activated='round_response.spinner_activate'
                        class='elevation-10'/>
                      </template>
                      <template v-if='round_response.type == 1'
                      class='text-sm-center'>
                        <span v-if='round_response.won'>
                          <h1 class='green--text'>Answer is correct</h1>
                          <h3>You won a dollar!</h3>
                        </span>
                        <span v-else>
                          <h1 class='red--text'>Answer is incorrect</h1>
                          <h3>No dollar won :(</h3>
                        </span>
                      </template>
                    </v-card-text>
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
          </v-form>
          <!-- Instructions Message -->
          <!--                      -->
          <v-dialog
            v-model="instructions_dialog"
            width="600">
            <v-card>
              <v-card-title class="headline">Instructions</v-card-title>
              <v-card-text>
                <p>Listen to short audio clips and determine if a sound is present.</p>
                <p>You will be asked to give a confidence on your answer.</p>
                <p>Your answer may determine bonus payout.</p>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- Final Submit Message -->
          <!--                      -->
          <v-dialog persistent
            v-model="submit_dialog"
            width="500">
            <v-card>
              <v-card-title class="headline">Survey Code</v-card-title>
              <v-card-text>
                <p>Copy the code below to the MTurk assignment to get approved.</p>
                <v-text-field
                outline solo readonly
                :value='id'>
                </v-text-field>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- Error Message -->
          <!--               -->
          <v-dialog
            v-model="error_dialog"
            width="500">
            <v-card color='error'>
              <v-card-title class="headline">Fatal Error</v-card-title>
              <v-card-text>
                <p>There was an error submitting information to the server:</p>
                <code>{{error_message}}</code>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style>
.v-tooltip>span {
  width: 100%;
}
</style>

<script>
import VuetifyAudio from 'vuetify-audio'
import TextHighlight from './components/TextHighlight'
import Spinner from './components/Spinner'

export default {
  name: 'App',
  components: {
    'v-audio': VuetifyAudio,
    'flash': TextHighlight,
    'spinner': Spinner,
  },
  data () {
    return {
      id: "05cdbc17-fc15-4e48-a29f-756029933bc5",
      no_data: false,
      read_only: false,
      instructions_dialog: true,
      submit_dialog: false,
      error_dialog: false,
      error_message: "Cause unknown.",
      round_dialog: false,
      round_response: {
        spinner_activate: false,
        type: 0,
        won: 1,
        spin: 0.574,
        chance: 70,
        pending: false,
      },
      task_type: 2,
      step: 1,
      items: [
        {"file": "soundscape_train_bimodal02.wav", "label": "jackhammer",
            'audio_step': false,
            'class_step': false,
            'bet_step': false,
            'confidence': 50,
            'classification': null,
            'choices': [],},
        {"file": "soundscape_train_bimodal0.wav", "label": "jackhammer",
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
    addChoice(item, choice) {
      item.choices.push(choice)
      item.confidence += 10
      item.bet_step=(item.confidence == 100)
      this.animate = true
    },
    submitAll() {
      let data = {
        'id': this.id,
        'items': this.items,
      }
      axios.post("/post/all", data)

      this.submit_dialog = true
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

        this.round_response.pending = false
      })
    },
  },
  created() {
    let args = window.surveydata
    this.task_type = parseInt(args['task_type'], 10)
    this.id = args['id']

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
