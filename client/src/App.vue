<template>
  <v-app>
    <v-container>
      <v-layout justify-center align-center fill-height>
        <v-flex>
          <!-- Instructions -->
          <v-dialog
            v-model="instructions_dialog"
            width="300">
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
                :key='item.question+item.file'
                :value='index+1'>
                  <v-card-text>
                    <v-container grid-list-lg>
                      <v-layout column>
                        <!-- Audio -->
                        <v-flex>
                          <v-audio :file='"train_audio/" + item.file' :ended='() => {item.audio_step=true}'></v-audio>
                        </v-flex>
                        <!-- Classification -->
                        <v-flex v-show='item.audio_step'>
                          <v-card>
                            <v-card-title>
                              <span>Does this contain a(n) {{item.question}}</span>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-actions>
                              <v-radio-group row
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
                                Confidence
                              </v-card-title>
                              <v-divider></v-divider>
                              <v-card-actions>
                                <v-slider thumb-label :step='10'
                                :color='item.bet_step? "" : "grey"'
                                v-model="item.confidence"
                                @change='item.bet_step=true'>
                                  <span slot='append'>
                                    {{ item.confidence }}%
                                  </span>
                                </v-slider>
                              </v-card-actions>
                            </v-card>
                          </v-flex>
                        </template>
                        <template v-if='task_type==2'>
                          <v-flex v-show='item.class_step'>
                            <v-card>
                              <v-card-title>
                                Confidence
                              </v-card-title>
                              <v-card-text>
                                If you could win money using a lottery or
                                the correctness of your answer,
                                which would you chose?
                              </v-card-text>
                              <v-divider></v-divider>
                              <v-card-actions>
                                <template v-if='!item.bet_step || item.confidence < 100'>
                                  <v-spacer></v-spacer>
                                  <v-btn color="primary"
                                  :disabled='item.bet_step'
                                  @click='item.bet_step=true'>
                                    {{item.confidence}}:{{100-item.confidence}} lottery
                                  </v-btn>
                                </template>
                                  <v-spacer></v-spacer>
                                <template v-if='!item.bet_step || item.confidence == 100'>
                                  <v-btn color="primary"
                                  :disabled='item.bet_step'
                                  @click='item.confidence+=10; item.bet_step=(item.confidence == 100)'>
                                    your answer
                                  </v-btn>
                                  <v-spacer></v-spacer>
                                </template>
                              </v-card-actions>
                            </v-card>
                          </v-flex>
                        </template>
                        <!--  -->
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
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import VuetifyAudio from 'vuetify-audio'

export default {
  name: 'App',
  components: {
    'v-audio': VuetifyAudio
  },
  data () {
    return {
      instructions_dialog: true,
      args: null,
      task_type: 0,
      step: 1,
      items: [
        // {
        //   audio_step: false,
        //   class_step: false,
        //   bet_step: false,
        //   confidence: 50,
        //   classification: null,
        //   file: 'https://',
        //   question: 'kangaroo',
        // }
      ],
    }
  },
  methods: {
    submit() {
      // <form id = "endForm" action="{{ name.amazon_host }}" method="POST">
      // <input type="hidden" id="user-input" value="" name="user-input"/>
      // <input type="hidden" id="assignmentId" value="{{ name.assignment_id }}" name="assignmentId"/>
      // <input type="hidden" id="workerId" value="{{ name.worker_id }}" name="workerId"/>
      // <input type="hidden" id="hitId" value="{{ name.hit_id }}" name="hitId"/>
      // </form>
      let data = []
      for (let item in this.items) {
        data.push({
          'file': item.file,
          'question': item.question,
          'classification': item.classification,
          'confidence': item.confidence
        })
      }
      let formdata = new FormData()
      formdata.append('user-input', JSON.stringify(data))
      formdata.append('assignmentId', JSON.stringify(this.args['assignmentId']))
      axios.post(this.args['turkSubmitTo'] + '/mturk/externalSubmit', formdata)
    },
    getUrlVars() {
      var vars = {};
      decodeURIComponent(window.location.href.replace(/\+/g, '%20')).replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) => {
          vars[key] = key=='items' || key=='task_type' ? JSON.parse(value) : value;
      });
      return vars;
    }
  },
  mounted() {
    let args = this.getUrlVars()
    if (!('items', 'task_type' in args)) {
      console.log("Improper url parameters provided.")
      console.log(args)
      return
    }
    if (!('assignmentId', 'workerId', 'hitId', 'turkSubmitTo' in args)) {
      console.log("Amazon params not provided, read-only mode.")
      console.log(args)
    }

    // defaults
    for (let i = 0; i < args['items'].length; i++) {
      args['items'][i] = Object.assign(args['items'][i], {
          'audio_step': false,
          'class_step': false,
          'bet_step': false,
          'confidence': 50,
          'classification': null,
      })
    }
    this.args = args
    this.task_type = parseInt(args['task_type'], 10)
    this.items = args['items']
  }
}
</script>
