<template>
  <div v-loading="loading">
    该级别下现存在
    <span>{{ houses }}</span>
    栋房屋,
    <span>{{ people }}</span>
    名人员
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    houses: {
      type: Number,
      default: 10
    },
    people: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      loading: true,
      houseNumber: 0,
      peopleNumber: 0
    }
  },
  computed: {
    listenChange() {
      const { houses, people } = this
      return { houses, people }
    }
  },
  watch: {
    listenChange(newVal) {
      this.houseNumber = newVal.houses
      this.peopleNumber = newVal.people
      this.loading = false
    }
  }
}
</script>

<style scoped>
div {
  font-size: 20px;
  color: #606266;
  text-indent: 2em;
  padding: 1em;
}
</style>
