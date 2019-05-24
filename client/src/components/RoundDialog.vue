<template lang="html">
  <v-dialog
    persistent
    v-model="active"
    width="500"
  >
    <v-card>
      <v-card-title class="headline">
        <b v-if="is_practice">Practice&nbsp;</b> Round Results
      </v-card-title>
      <template>
        <v-card-text class="subheading">
          <p>You just completed round {{ round_number }}. </p>
          <template v-if="is_type2">
            <span>From the 5 answers given, answer {{ current_item.chose + 1 }} was selected. </span>
            <span v-if="current_item.type == 0">You will draw a {{ current_item.chance }}% chance lottery after round 20. </span>
            <span v-else>Your answer will be tested after round 20</span>
          </template>
          <template v-if="is_type1">
            <span>Your answer will be tested after round 20</span>
          </template>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="is_practice"
            color="primary"
            depressed
            outline
            @click="$emit('start');active=false"
          >
            Begin Task
          </v-btn>
          <v-btn
            color="primary"
            depressed
            @click="$emit('next');active=false"
          >
            {{ is_practice ? "Try another" : "Next" }}
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  model: {
    prop: 'active_parent',
    event: 'active_parent_change',
  },
  props: {
    active_parent: Boolean,
  },
  data() {
    return {
      active: this.active_parent,
    }
  },
  computed: {
    ...mapState(['is_practice']),
    ...mapGetters(['is_type1', 'is_type2', 'round_number', 'is_last_item', 'current_item']),
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
