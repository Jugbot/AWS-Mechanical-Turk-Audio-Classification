<template lang="html">
  <v-btn outline @click='$emit("hit", date % 100)'>{{date}}</v-btn>
</template>

<script>
export default {
  data() {
    return {
      date: 0,
    }
  },
  methods: {
    update() {
      this.date = Date.now()
    }
  },
  mounted() {
    setInterval(this.update, 1)
  }
}
</script>

<style lang="css" scoped>
</style>
