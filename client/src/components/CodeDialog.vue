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
        <v-data-table
          light
          class='elevation-2'
          :items="tableItems"
          :headers="tableHeaders"
          disable-initial-sort
          hide-actions
        >
          <template #items="props">
            <td>{{ props.item.round }}</td>
            <td>{{ props.item.type }}</td>
            <td>{{ props.item.won }}</td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'CodeDialog',
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
  computed: {
    ...mapState(['items']),
    // ...mapGetters(['is_type1', 'is_type2']),
    tableItems() {
      return this.items.map((o, i) => {
        return {
          round: i+1,
          won: (o.won ? 'YES' : 'NO'),
          type: (o.type==0 ? 'Lottery' : 'Answer' )
        }
      })
    },
    tableHeaders() {
      return [
        {text: 'Round', value:'round', sortable: false},
        {text: 'Type', value:'type', sortable: false},
        {text: 'Won', value:'won', sortable: false}
      ]
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
