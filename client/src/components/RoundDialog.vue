<template lang="html">
  <v-dialog persistent
    v-model="active"
    width="500">
    <v-card>
      <v-card-title class="headline">
        <b v-if='demo'>Practice&nbsp;</b> Round Results
      </v-card-title>
      <template>
        <v-card-text class="subheading">
          <p>You just completed round {{round}}. </p>
          <template v-if="task_type==2">
            <span>From the 5 answers given, answer {{ item.chose + 1 }} was selected. </span>
            <span v-if='item.type == 0'>You will draw a {{ item.chance }}% chance lottery after round 20. </span>
            <span v-else>Your answer will be tested after round 20</span>
          </template>
          <template v-if="task_type==1">
            <span>Your answer will be tested after round 20</span>
          </template>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if='demo'
            color="primary"
            depressed outline
            @click="$emit('repeat');active=false">
            Try another
          </v-btn>
          <v-btn color="primary"
            depressed
            @click="$emit('submit');active=false">
            {{ demo ? "Begin Task" : "Next" }}
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  model: {
    prop: 'active_parent',
    event: 'active_parent_change',
  },
  props: {
    active_parent: Boolean,
    item: Object,
    task_type: Number,
    round: Number,
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
