<template lang="html">
  <v-dialog
    persistent
    v-model="active"
    width="600">
    <v-card color='blue' dark>
      <v-card-title class="headline">Instructions</v-card-title>
      <v-window v-model='step'>
        <v-window-item :value='0'>
          <iframe :srcdoc='consent_form'
          style='width: 100%; height:400px; background-color: #fff;'>
          </iframe>
        </v-window-item>
        <v-window-item :value='1'>
          <v-window v-model='step_instr'>
            <v-window-item v-for='instruction in instructions'>
              <v-card-text v-html='instruction'>
              </v-card-text>
            </v-window-item>
          </v-window>
          <v-card-actions class="justify-center">
            <v-item-group
              v-model="step_instr"
              class="text-xs-center"
              mandatory>
              <v-item
                v-for="n in instructions.length"
                :key="n">
                <v-btn
                  slot-scope='{active: btn_active, toggle}'
                  icon
                  :input-value="btn_active"
                  @click="toggle">
                  {{n}}
                </v-btn>
              </v-item>
            </v-item-group>
          </v-card-actions>
        </v-window-item>
      </v-window>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if='step == 0'
        color="primary"
        depressed
        @click="step++">
        Agree &amp; Continue
        </v-btn>
        <v-btn v-else-if='step == 1'
        color="primary"
        depressed
        @click="$emit('active_parent_change', false)">
        Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'instructions-dialog',
  model: {
    prop: 'active_parent',
    event: 'active_parent_change',
  },
  props: {
    active_parent: Boolean,
    consent_form: String,
    instructions: Array,
  },
  data() {
    return {
      active: this.active_parent,
      step: 0,
      step_instr: 0,
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
