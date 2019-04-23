<template lang="html">
  <v-dialog persistent
    v-model="active"
    width="500">
    <v-card>
      <v-card-title class="headline">
        <b v-if='demo'>Practice&nbsp;</b> Round Results
      </v-card-title>
      <template v-if="round_data.pending">
        <v-card-text class='text-sm-center'>
          <v-progress-circular
            color="primary"
            indeterminate
            :size="64">
          </v-progress-circular>
        </v-card-text>
      </template>
      <template v-else>
        <v-card-text v-if='task_type == 2'
        class="subheading">
          <span>From the 5 answers given, answer {{round_data.chose+1}} was selected. You have chosen to </span>
          <span v-if='round_data.type == 0'>draw a {{ round_data.chance }}% chance lottery. </span>
          <span v-else>test your answer. </span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text v-if='round_data.type == 0'>
          <v-layout>
            <v-flex grow xs10 offset-xs1>
              <spinner :chance='round_data.chance'
              :result='round_data.spin'
              :activate='round_data.spinner_activate'
              @complete='round_data.complete = true'
              class='elevation-10'/>
            </v-flex>
          </v-layout>
        </v-card-text>
        <!-- <v-card-text :style="{visibility: (round_data.complete || round_data.type == 1) ? 'visible' : 'hidden'}"
        class='text-sm-center'>
          <span v-if='round_data.won'>
            <h1 class='green--text'>You won a dollar!</h1>
            <h3 v-if='round_data.type == 1'>Answer is correct</h3>
            <h3 v-else>You won the lottery</h3>
          </span>
          <span v-else>
            <h1 class='red--text'>No dollar won :(</h1>
            <h3 v-if='round_data.type == 1'>Answer is incorrect</h3>
            <h3 v-else>You lost the lottery</h3>
          </span>
        </v-card-text> -->
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if='demo'
            color="primary"
            depressed outline
            @click="$emit('repeat');round_dialog=false">
            Try another
          </v-btn>
          <v-btn color="primary"
            depressed
            @click="$emit('submit');active=false">
            Next
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import Spinner from '@/components/Spinner'

export default {
  name: 'round-dialog',
  components: {
    'spinner': Spinner,
  },
  model: {
    prop: 'active_parent',
    event: 'active_parent_change',
  },
  props: {
    active_parent: Boolean,
    round_data: Object,
    task_type: Number,
    demo: Boolean,
  },
  data() {
    return {
      active: this.active_parent,
    }
  },
  watch: {
    active_parent(newval) {
      this.active = newval
    },
    active(newval) {
      this.$emit('active_parent_change', newval)
    }
  }
}
</script>

<style lang="css">
.v-text-field.centered input {
  text-align: center !important;
}
</style>
