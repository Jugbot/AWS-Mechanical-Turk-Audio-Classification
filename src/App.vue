<template>
  <v-app>
    <v-container>
      <v-layout>
        <v-flex>
          <v-form>
            <v-card>
              <v-card-title primary-title>
                {{ money | dollars }}
              </v-card-title>

              <v-window v-model='step'>
                <v-window-item v-for='item, index in items' :value='index+1'>
                  <v-card-text>
                    <v-audio :file='item.file'></v-audio>
                    <v-subheader >Confidence Bet</v-subheader>
                    <v-slider thumb-label
                    v-model="item.betval">
                      <span slot='append'>
                        {{ bet(item.betval) | dollars }}
                      </span>
                    </v-slider>
                  </v-card-text>
                </v-window-item>
              </v-window>

              <v-card-actions>
                <v-btn
                  :disabled="step === 1"
                  flat
                  @click="step--"
                >
                  Back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn v-if="step !== 2"
                  color="primary"
                  depressed
                  @click="step++"
                >
                  Next
                </v-btn>
                <v-btn v-else
                  color="success"
                  depressed
                  @click="submit()"
                >
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
      step: 1,
      money: 57,
      items: [
        {
          betval: 10,
          file: '',
        },
        {
          betval: 38,
          file: '',
        },
      ],
    }
  },
  methods: {
    bet(value) {
      return value/100*this.money
    },
    submit() {

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
