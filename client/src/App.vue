<template>
  <v-app>
    <v-container>
      <v-layout justify-center align-center fill-height>
        <v-flex>
          <!-- Instructions -->
          <v-dialog
            v-model="instructions_dialog"
            width="500">
            <v-card>
              <v-card-title class="headline">Instructions</v-card-title>
              <v-card-text>
                <p>Listen to short audio clips and determine if a sound is present.</p>
                <p>You will be asked to give a confidence on your answer.</p>
                <p>Your answer may determine bonus payout.</p>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- Assignments -->
          <v-form>
            <v-card color='deep-purple lighten-5' v-if='items.length'>
              <!-- Price -->
              <v-card-title primary-title>
                <v-layout justify-center>
                  <h3 class="headline">
                    Audio Classification
                  </h3>
                </v-layout>
              </v-card-title>
              <!-- Current Task -->
              <v-window v-model='step'>
                <v-window-item v-for='item, index in items'
                :key='item.label+item.file'
                :value='index+1'>
                  <v-card-text>
                    <v-container grid-list-lg>
                      <v-layout column>
                        <!-- Audio -->
                        <v-flex>
                          <v-audio :file='"assets/audio/" + item.file' :ended='() => {item.audio_step=true}'></v-audio>
                        </v-flex>
                        <!-- Classification -->
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
                        <!-- Bet -->
                        <template v-if='task_type==1'>
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
                                  :color='item.bet_step? "" : "grey"'
                                  v-model="item.confidence"
                                  @change='item.bet_step=true'>
                                    <span slot='append'>
                                      {{ item.confidence }}%
                                    </span>
                                  </v-slider>
                                </v-tooltip>
                              </v-card-actions>
                            </v-card>
                          </v-flex>
                        </template>
                        <template v-if='task_type==2'>
                          <v-flex v-show='item.class_step'>
                            <v-card>
                              <v-card-title>
                                <div>
                                If you had the opportunity to choose, would you take <flash v-model='animate'>{{item.confidence}}¢</flash> now or would you keep playing?
                                Knowing that you can keep a dollar if your answer is correct or lose it all if not.
                                </div>
                              </v-card-title>
                              <v-divider></v-divider>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary"
                                :disabled='item.bet_step'
                                @click='addChoice(item, false)'>
                                  <flash v-model='animate'>{{item.confidence}}¢</flash>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary"
                                :disabled='item.bet_step'
                                @click='addChoice(item, true)'>
                                  <span>keep playing</span>
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
              <v-card-actions>
                <v-btn
                  :disabled="step === 1"
                  flat
                  @click="step--">
                  Back
                </v-btn>
                <v-spacer></v-spacer>
                {{step}}/{{items.length}}
                <v-spacer></v-spacer>
                <v-btn v-if="step !== items.length"
                  color="primary"
                  depressed
                  :disabled='!items[step-1].bet_step'
                  @click="step++">
                  Next
                </v-btn>
                <v-btn v-else
                  color="success"
                  depressed
                  :disabled='!items[step-1].bet_step'
                  @click="submit()">
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
          <!-- Submit Message -->
          <v-dialog
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

export default {
  name: 'App',
  components: {
    'v-audio': VuetifyAudio,
    'flash': TextHighlight,
  },
  data () {
    return {
      id: "05cdbc17-fc15-4e48-a29f-756029933bc5",
      no_data: false,
      read_only: false,
      instructions_dialog: true,
      submit_dialog: false,
      args: null,
      task_type: 2,
      step: 1,
      random: {
        m_w: 123456789,
        m_z: 987654321
      },
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
      animate: false
    }
  },
  methods: {
    addChoice(item, choice) {
      item.choices.push(choice)
      item.confidence += 10
      item.bet_step=(item.confidence == 100)
      this.animate = true
    },
    submit() {
      let data = {
        'id': this.id,
        'items': this.items,
      }
      axios.post("/post", data)

      this.submit_dialog = true
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
