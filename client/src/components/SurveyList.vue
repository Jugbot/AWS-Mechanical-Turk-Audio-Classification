<template lang="html">
  <v-window :value='step'>
    <v-window-item v-for='(item, index) in items'
    :key='index' lazy>
      <v-container grid-list-lg>
        <v-layout column>
          <!-- Audio -->
          <!--       -->
          <v-flex>
            <v-audio :file='"assets/audio/" + item.file'
            @ended='audioComplete()'>
              <v-btn outline round class="teal--text"
              @click='$emit("sample")'>
                  <span>Jackhammer only recording</span>
              </v-btn>
            </v-audio>
          </v-flex>
          <!-- Classification -->
          <!--                -->
          <v-flex>
            <v-card>
              <v-card-title>
                <span>Is there a jackhammer present in the recording?</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions v-show='audio_step || debug'>
                <v-radio-group row
                @change='classComplete();setCurrentItem({"classification": $event})'>
                  <v-radio label="Yes" :value="true"></v-radio>
                  <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Confidence & Lottery -->
          <!--                      -->
          <template v-if='is_type1'>
            <!-- Type 1: Confidence -->
            <v-flex v-show='class_step'>
              <v-card>
                <v-card-title>
                  How confident are you with your answer?
                </v-card-title>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-tooltip bottom class='v-input'>
                    <span>I am {{ item.confidence }}% confident in my answer that there is {{ !item.classification ? "not" : ""}} a jackhammer present in the recording.</span>
                    <v-slider thumb-label :step='10'
                    slot='activator'
                    :color='bet_step ? "" : "grey"'
                    v-model="item.confidence"
                    @change='betComplete'>
                      <span slot='prepend'>0%</span>
                      <span slot='append'>100%</span>
                    </v-slider>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
            </v-flex>
          </template>
          <template v-if='is_type2'>
            <!-- Type 2: Lottery -->
            <v-flex v-show='class_step'>
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
                    :disabled='bet_step'
                    @click='addChoice(item, false)'>
                      <span><flash v-model='animate'>{{item.confidence}}%</flash> chance lottery</span>
                    </v-btn>
                    <v-btn color="primary"
                    :disabled='bet_step'
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
</template>

<script>
import TextHighlight from '@/components/TextHighlight'
import VuetifyAudio from '@/components/VuetifyAudio'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: "SurveyList",
  model: {
    prop: 'items',
  },
  components: {
    'v-audio': VuetifyAudio,
    'flash': TextHighlight,
  },
  data() {
    return {
      animate: false,
    }
  },
  computed: {
    // ...mapGetters(['*']),
    ...mapGetters(['is_type1', 'is_type2', 'wins', 'round_number', 'is_last_item', 'current_item']),
    ...mapState(['items', 'debug', 'bet_step', 'class_step', 'audio_step', 'step']),
  },
  methods: {
    ...mapMutations(['betComplete', 'classComplete', 'audioComplete']),
    addChoice(item, choice) {
      item.choices.push(choice)
      item.confidence += 10
      item.bet_step=(item.confidence == 100)
      this.animate = true
    },
  }
}
</script>

<style lang="css" scoped>
</style>
