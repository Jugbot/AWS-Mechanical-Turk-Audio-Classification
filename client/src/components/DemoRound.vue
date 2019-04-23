<template lang="html">
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
                  <span>I am {{ item.confidence }}% confident in my answer that there is/is not a {{ item.label }} present in the recording.</span>
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
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
