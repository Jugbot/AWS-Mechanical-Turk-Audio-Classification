<template lang="html">
  <v-dialog persistent
    v-model="active"
    width="500">
    <v-card>
      <v-card-title class="headline">Survey Code</v-card-title>
      <v-card-text>
        <p>Copy the code below to the MTurk assignment to get approved.</p>
        <v-text-field
        outline solo readonly
        :value='uuid'>
        </v-text-field>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'submit-dialog',
  model: {
    prop: 'active_parent',
    event: 'active_parent_change',
  },
  props: {
    active_parent: Boolean,
    uuid: String,
  },
  data() {
    return {
      active: this.active_parent,
    }
  },
  watch: {
    active_parent(newval, oldval) {
      this.active = newval
    },
    active(newval, oldval) {
      this.$emit('active_parent_change', newval)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
