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
                        <v-flex v-if='item.audio_step'>
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
                        <v-flex v-if='item.class_step'>
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
      task_type: 2,
      step: 1,
      items: [
        {
          audio_step: false,
          class_step: false,
          bet_step: false,
          confidence: 50,
          file: 'https://drive.google.com/uc?export=download&id=1NEmYdc_P49JfULEEk1lbMJaQTxNLoYzc',
          question: 'kangaroo',
          classification: null,
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
      console.log(window.mturksession)
      let session = window.mturksession
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
      formdata.append('assignmentId', JSON.stringify(session.assignment_id))
      formdata.append('workerId', JSON.stringify(session.worker_id))
      formdata.append('hitId', JSON.stringify(session.hit_id))
      axios.post(session.amazon_host, formdata)
    }
  },
  filters: {
    dollars: function (value) {
      if (!value) value = 0
      //two decimal places
      value = Number.parseFloat(value).toFixed(2).toString()
      return '$'+value
    }
  }
}
</script>
