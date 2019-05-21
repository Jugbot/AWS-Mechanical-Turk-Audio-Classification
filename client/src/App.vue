<template lang="html">
  <v-app>
    <v-container>
      <v-layout justify-center align-center fill-height>
        <v-flex>
          <v-card :color='is_practice ? "yellow lighten-5" : "deep-purple lighten-5"'>
            <!-- Help -->
            <v-tooltip left v-model='instructions_tooltip'>
              <template v-slot:activator="{ on }">
                <v-btn v-on='on' flat icon color="grey" large
                @click='instructions_dialog=true'
                style='position:absolute;right:0;top:0;z-index:100;'>?</v-btn>
              </template>
              <span>Instructions</span>
            </v-tooltip>
            <!--  -->
            <v-card-title primary-title>
              <v-layout column align-center>
                <h3 class="headline">
                  Audio Classification {{is_practice ? " (Practice)":null}}
                </h3>
                <span class="subheading">Click Play to begin</span>
              </v-layout>
            </v-card-title>
            <!-- Tasks -->
            <!--       -->
            <survey-list
            @sample='audiosample_dialog=true'
            :debug='debug'>
            </survey-list>
            <!-- Navigation -->
            <!--            -->
            <v-card-actions class="center-text-xs">
              <v-spacer></v-spacer>
              <v-btn depressed block
                :color=" !is_last_item ? 'primary' : 'success'"
                :disabled='!bet_step'
                @click="processRound(current_item)"><!-- TODO -->
                {{ !is_last_item ? 'Next Recording' : 'Finish'}}
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-flex xs12 justify-center>
            <v-card flat color='transparent'>
              <v-card-text class="text-xs-center">
                <span v-if='!is_practice' class="grey--text">{{round_number}}/{{items.length}}</span>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-flex>
        <!-- Round Submit Message -->
        <!--                      -->
        <!-- <round-dialog v-model='round_dialog'
        @submit='next_round()'
        @repeat='newPractice()'>
        </round-dialog> -->
        <!-- Instructions Message -->
        <!--                      -->
        <instructions-dialog
        v-model='instructions_dialog'
        :consent_form='instructions_consent'
        :instructions='is_type1 ? instructions_type1 : instructions_type2'
        @active_parent_change='showTooltip()'>
        </instructions-dialog>
        <!-- Process Message -->
        <!--                 -->
        <!-- <submit-dialog
        v-model='submit_dialog'>
        </submit-dialog> -->
        <!-- Final Submit Message -->
        <!--                      -->
        <code-dialog
        v-model='code_dialog'
        :uuid='id'
        :reward='wins'/>
        <!-- Sample Dialog -->
        <!--               -->
        <v-dialog v-model="audiosample_dialog" max-width="500">
          <v-audio v-if="audiosample_dialog" minimal file='assets/audio/demo.wav'>
          </v-audio>
        </v-dialog>
        <!-- Error Message -->
        <!--               -->
        <error-dialog
        v-model='error_dialog'
        :message='error_message'/>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style lang="css">
  .v-tooltip>span {
    width: 100%;
  }
  iframe {
    border: none;
  }
</style>

<script>
import VuetifyAudio from '@/components/VuetifyAudio'
import InstructionsDialog from '@/components/InstructionsDialog'
import ErrorDialog from '@/components/ErrorDialog'
import CodeDialog from '@/components/CodeDialog'
import SubmitDialog from '@/components/SubmitDialog'
import RoundDialog from '@/components/RoundDialog'
import consentForm from '@/consent_form.js'
import SurveyList from  '@/components/SurveyList'
import type1instr from '@/components/instructions/type1.js'
import type2instr from '@/components/instructions/type2.js'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    'v-audio': VuetifyAudio,
    'instructions-dialog': InstructionsDialog,
    'error-dialog': ErrorDialog,
    'code-dialog': CodeDialog,
    'round-dialog': RoundDialog,
    'survey-list': SurveyList,
    'submit-dialog': SubmitDialog
  },
  data () {
    return {
      // DIALOGS
      code_dialog: false,
      submit_dialog: false,
      round_dialog: false,
      instructions_dialog: true,
      instructions_consent: consentForm,
      instructions_type1: type1instr,
      instructions_type2: type2instr,
      instructions_tooltip: false,
      audiosample_dialog: false,
      error_dialog: false,
      error_message: {
        data: "Cause unknown."
      },
      // END
      submit_step: -1,
      animate: false,
    }
  },
  computed: {
    ...mapState(['debug', 'bet_step', 'audio_step', 'is_practice', 'id']),
    ...mapGetters(['is_type1', 'is_type2', 'wins', 'round_number', 'is_last_item', 'current_item']),
    is_final_submit() {
      return this.submit_step + 1 == this.items.length
    },
    submit_round_number() {
      return this.submit_step + 1
    },
  },
  methods: {
    next_submit() {
      if (this.is_final_submit) {
        this.submit_dialog = false
        this.submitAll()
      } else {
        this.submit_step++
      }
    },
    processLottery(e, item) {
      if (item.won === -1)
        item.won = (e < item.chance)
    },
    showTooltip() {
      this.instructions_tooltip = true;
      setTimeout(() => {
        this.instructions_tooltip = false;
      }, 3000);
    },
    next_round() {
      if (this.is_practice)
        this.is_practice = false
      else if (this.is_last_item)
        this.submit_dialog = true
      else
        this.step++

    },
    handleError(error) {
      this.error_message = error.response;
      this.error_dialog = true;
      this.submit_dialog = this.round_dialog = false;
    },
    submitAll() {
      let data = {
        'id': this.id,
        'wins': this.wins,
        'items': this.items,
      }
      this.$axios.post("/post/all", data).then(() => {
        this.code_dialog = true
      }).catch(error => {
        this.handleError(error)
      })
    },
    // newPractice() {
    //   if (this.items.length == 0)
    //     return
    //   this.practice_item = [Object.assign({},this.items[Math.floor(Math.random()*this.items.length)])]
    //   this.practice_item[0].practice_key = "practice"
    //   this.practice_item[0].choices = []
    // }
  },
  created() {

  }
}
</script>
