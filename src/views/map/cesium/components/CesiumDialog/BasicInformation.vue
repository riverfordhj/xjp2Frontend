<template>
  <div>
    XX栋位于XXXXXX区，有X个单元，每个单元X梯X户，共XX层楼（一楼为架空层）。该栋共计XX户,XXX余人。其中，中共党员X人，现役、退役军人及家属X户，重点人口X人，60岁以上老年人X人。每个单元一楼大厅设有休闲座椅、监控探头，每层楼配有消防栓，X个消防通道。
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
