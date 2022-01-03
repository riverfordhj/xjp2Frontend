<template>
  <div class="center-cmp">
       <buildingeco-Map></buildingeco-Map> 
  </div>
</template>

<script>
import LabelTag from './LabelTag'
import buildingecoMap from '../buildingEconomy/buildingEcoMap/buildingEcoMap.vue'
export default {
  name: 'CenterCmp',
  components: {
    LabelTag,
    buildingecoMap
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
.center-cmp {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}
</style>
