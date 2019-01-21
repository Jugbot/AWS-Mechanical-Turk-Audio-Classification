<template>
  <v-app>
    <v-container>
      <v-layout justify-center align-center fill-height>
        <v-flex>
          <v-form>
            <v-card color='deep-purple lighten-5'>
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
                :key='item.file'
                :value='index+1'>
                  <v-card-text>
                    <v-container grid-list-lg>
                      <v-layout column>
                        <!-- Audio -->
                        <v-flex>
                          <v-audio :file='item.file' :ended='() => {item.audio_step=true}'></v-audio>
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
      args: null,
      task_type: 2,
      step: 1,
      items: [
        {
          audio_step: false,
          class_step: false,
          bet_step: false,
          confidence: 50,
          classification: null,
          file: 'https://drive.google.com/uc?export=download&id=1NEmYdc_P49JfULEEk1lbMJaQTxNLoYzc',
          question: 'kangaroo',
        },
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
      console.log("args: " + this.args)
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
      formdata.append('assignmentId', JSON.stringify(this.args['assignment_id']))
      formdata.append('workerId', JSON.stringify(this.args['worker_id']))
      formdata.append('hitId', JSON.stringify(this.args['hit_id']))
      axios.post(this.args['amazon_host'], formdata)
    },
    getUrlVars() {
      var vars = {};
      window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) => {
          vars[key] = value;
      });
      return vars;
    }
  },
  created() {
    this.args = this.getUrlVars()
    this.task_type = parseInt(this.args['task_type'], 10)
  }
}
</script>
