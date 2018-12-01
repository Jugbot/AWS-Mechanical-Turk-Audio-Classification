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
                    Balance:
                    <v-chip color="green" text-color="white" label>
                      {{ money | dollars }}
                    </v-chip>
                  </h3>

                </v-layout>
              </v-card-title>
              <!-- Current Task -->
              <v-window v-model='step'>
                <v-window-item v-for='item, index in items' :value='index+1'>
                  <v-card-text>
                    <v-audio :file='item.file'></v-audio>
                    <v-subheader>Classification</v-subheader>
                    <v-text-field solo label="label" v-model="item.classification"></v-text-field>
                    <v-subheader>Confidence Bet</v-subheader>
                    <v-slider thumb-label
                    v-model="item.betval">
                      <span slot='append'>
                        {{ bet(item.betval) | dollars }}
                      </span>
                    </v-slider>
                  </v-card-text>
                </v-window-item>
              </v-window>
              <!-- Navigation -->
              <v-card-actions>
                <v-btn
                  :disabled="step === 1"
                  flat
                  @click="step--"
                >
                  Back
                </v-btn>
                <v-spacer></v-spacer>
                {{step}}/{{items.length}}
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
          classification: '',
        },
        {
          betval: 38,
          file: '',
          classification: '',
        },
      ],
    }
  },
  methods: {
    bet(value) {
      return value/100*this.money
    },
    submit() {
      //TODO
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
