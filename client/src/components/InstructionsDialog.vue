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
          <!-- <v-window v-model='step_instr'>
            <v-window-item v-for='instruction in instructions'>
              <v-card-text v-html='instruction'>
              </v-card-text>
            </v-window-item>
          </v-window> -->
          <v-card-text class='subheading' 
          v-for='instruction in instructions' v-html='instruction'>
          </v-card-text>
          <v-card-actions>
            <v-btn color="light-green" block large
            @click='active=false'>
              Begin Practice Round
            </v-btn>
          </v-card-actions>
        </v-window-item>
      </v-window>
      <v-card-actions v-if='step==0'>
        <v-spacer></v-spacer>
        <v-btn
        color="primary"
        depressed
        @click="step++">
        Agree &amp; Continue
        </v-btn>
      </v-card-actions>
      <!-- <v-card-actions v-else
      class="justify-center">
        <v-item-group
          v-model="step_instr"
          class="text-xs-center"
          mandatory>
          <v-item
            v-for="n in (instructions.length+1)"
            :key="n">
            <v-btn v-if='n<=instructions.length'
              slot-scope='{active: btn_active, toggle}' icon
              :disabled='n > step_authority'
              :input-value="btn_active"
              @click="toggle();step_authority = Math.max(step_authority, n+1);">
              {{n}}
            </v-btn>
            <v-btn v-else icon
              :disabled='n > step_authority'
              @click="active=false">
              &gt;
            </v-btn>
          </v-item>
        </v-item-group>
      </v-card-actions> -->
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
      step_authority: 2,
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
</style>
