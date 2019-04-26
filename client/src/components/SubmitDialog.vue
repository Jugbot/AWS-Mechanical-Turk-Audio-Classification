<template lang="html">
  <v-dialog persistent
    v-model="active"
    width="500">
    <v-card>
      <v-card-title class="headline">Submit</v-card-title>
      <v-window v-model='step'>
        <v-window-item :value='0'>
          <v-card-text>
            <p>Copy the code below to the MTurk assignment to get approved and paid.</p>
          </v-card-text>
        </v-window-item>
        <v-window-item v-for='(item, index) in items'
        :key='item.file'
        :value='index + 1'>
          <v-card-title>
            Round #{{ step-1 }}
          </v-card-title>
          <v-card-text v-if='task_type==1 || item.type == 1'>
            <span v-if='item.won'>
              <h3>Your answer was correct</h3>
              <h1 class='green--text'>You won a dollar!</h1>
            </span>
            <span v-else>
              <h3>Your answer was incorrect</h3>
              <h1 class='red--text'>No dollar won :(</h1>
            </span>
          </v-card-text>
          <v-card-text v-else>
            <h3>Click the timer below to run the lottery.</h3>
            <template v-if='"won" in item'>
              <span v-if='item.won'>
                <h3>You won the lottery</h3>
                <h1 class='green--text'>You won a dollar!</h1>
              </span>
              <span v-else>
                <h3>You lost the lottery</h3>
                <h1 class='red--text'>No dollar won :(</h1>
              </span>
            </template>
            <stopwatch v-else @hit='item.won=($event < item.chance)'></stopwatch>
          </v-card-text>
        </v-window-item>
      </v-window>
      <v-card-actions class="center-text-xs">
        <v-spacer></v-spacer>
        <v-btn depressed block
          :color="step !== items.length ? 'primary' : 'success'"
          :disabled='step!=0 && !("won" in items[step-1])'
          @click="next()">
          {{ step !== items.length ? 'Next' : 'Finish'}}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Stopwatch from './Stopwatch.vue'

export default {
  name: 'submit-dialog',
  components: {
    'stopwatch': Stopwatch
  },
  model: {
    prop: 'active_parent',
    event: 'active_parent_change',
  },
  props: {
    active_parent: Boolean,
    items: Array,
    task_type: Number,
  },
  data() {
    return {
      active: this.active_parent,
      step: 0,
    }
  },
  methods: {
    next() {
      if (this.items.length == this.step) {
        this.$emit("finished", this.items)
        this.active = false
      }
      else
        this.step++
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
