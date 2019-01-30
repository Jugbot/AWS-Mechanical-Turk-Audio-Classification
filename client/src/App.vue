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
              <!-- Dev instructions if no data is passed -->
              <v-card-actions v-if='no_data' class="blue-grey lighten-5">
                <v-container fluid>
                  <p>There were no url parameters provided for content.</p>
                  <p>Requires <code>task_type</code> and <code>items</code>.</p>
<code>task_type: 1 or 2
items: jsonified list of item objects such as
[{
'question': 'some_type',
'file': 'soundscape_train_bimodal0.wav'
}]</code>
                  <p>For example, add</p>
                  <code style="width: 100%;word-wrap: break-word;">?items=%5B%7B%22question%22%3A+%22some_type%22%2C+%22file%22%3A+%22soundscape_train_bimodal0.wav%22%7D%5D&task_type=1</code>
                  <p>to the url</p>
                </v-container>
              </v-card-actions>
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
                        <v-flex>
                          <v-card>
                            <v-card-title>
                              <span>Does this contain a(n) {{item.question}}</span>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-actions v-show='item.audio_step'>
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
                                How confident are you with your answer?
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
                                How confident are you with your answer?
                              </v-card-title>
                              <v-card-text>
                                If you could win a dollar in a <v-chip small>{{item.confidence}}:{{100-item.confidence}}</v-chip> lottery or
                                if your answer is correct,
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
                                  @click='item.confidence += 10;
                                  item.bet_step=(item.confidence == 100)'>
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
      no_data: false,
      read_only: false,
      instructions_dialog: true,
      args: null,
      task_type: 0,
      step: 1,
      random: {
        m_w: 123456789,
        m_z: 987654321
      },
      items: [
        // {
        //   audio_step: false,
        //   class_step: false,
        //   bet_step: false,
        //   confidence: 50,
        //   classification: null,
        //   file: 'soundscape_train_bimodal5.wav',
        //   question: 'this is a test question',
        // }
      ],
    }
  },
  methods: {
    submit() {
      let data = []
      for (let item in this.items) {
        data.push({
          'file': item.file,
          'question': item.question,
          'classification': item.classification,
          'confidence': item.confidence
        })
      }

      var form = document.createElement('form')
      document.body.appendChild(form)
      var addFormData = function(formel,key,value) {
        var input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value
        formel.appendChild(input)
      }
      addFormData(form,"assignmentId", this.args['assignmentId'])
      addFormData(form, "data", JSON.stringify(data))
      // submit the form
      form.action = this.args['turkSubmitTo'] + "/mturk/externalSubmit"
      form.method = "POST"
      form.submit()

    },
    getUrlVars() {
      var vars = {}
      decodeURIComponent(window.location.href.replace(/\+/g, '%20')).replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) => {
          vars[key] = key=='items' || key=='task_type' ? JSON.parse(value) : value
      });
      return vars
    },
    rand() {
      // Returns number between 0 (inclusive) and 1.0 (exclusive)
      var mask = 0xffffffff
      this.random.m_z = (36969 * (this.random.m_z & 65535) + (this.random.m_z >> 16)) & mask
      this.random.m_w = (18000 * (this.random.m_w & 65535) + (this.random.m_w >> 16)) & mask
      var result = ((this.random.m_z << 16) + (this.random.m_w & 65535)) >>> 0
      result /= 4294967296
      return result

    }
  },
  created() {
    let args = this.getUrlVars()

    if (!('items' in args)) {
      console.log("Improper url parameters provided.")
      console.log(args)
      this.no_data = true
      return
    }

    if (!('assignmentId', 'turkSubmitTo', 'workerId' in args)) {
      console.log("Amazon params not provided, read-only mode.")
      this.read_only = true
    } else {
      let i = args['workerId'] // seed
      let mask = 0xffffffff
      this.random.m_w = (123456789 + i) & mask
      this.random.m_z = (987654321 - i) & mask
    }

    if ('task_type' in args) { // use param if given
      this.task_type = parseInt(args['task_type'], 10)
    } else { // generate random type instead
      this.task_type = Math.floor(1 + this.rand() * 2)
    }

    // add defaults
    for (let i = 0; i < args['items'].length; i++) {
      args['items'][i] = Object.assign(args['items'][i], {
          'audio_step': false,
          'class_step': false,
          'bet_step': false,
          'confidence': 50,
          'classification': null,
      })
    }
    this.items = args['items']
    this.args = args
  }
}
</script>
