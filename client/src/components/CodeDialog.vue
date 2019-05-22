<template lang="html">
  <v-dialog
    persistent
    v-model="active"
    width="500"
  >
    <v-card
      dark
      color="blue"
    >
      <v-card-title class="headline">
        Survey Code
      </v-card-title>
      <v-card-text>
        <p>Thank you for participating, your bonus is ${{ reward }}.00</p>
        <p>Copy the code below to the MTurk assignment to get approved and paid.</p>
        <v-text-field
          light
          class="centered"
          solo
          readonly
          :value="uuid"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'SubmitDialog',
  model: {
    prop: 'active_parent',
    event: 'active_parent_change',
  },
  props: {
    active_parent: Boolean,
    uuid: {
      type: String,
      default: ""
    },
    reward: {
      type: Number,
      default: 0
    },
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
