<!--
 * @Descripttion:
 * @version:
 * @Author: KanMing
 * @Date: 2019-06-20 20:32:18
 * @LastEditors: KanMing
 * @LastEditTime: 2019-09-24 17:36:46
 -->
<template>
  <div>
    <!-- <div></div> -->
    <div
      ref="tooltip"
      class="cesiumTooltip"
      :style="{left:`${left+40}px`,top:`${top+40}px`,display:opened?`block`:'none'}"
    >
      <!-- <el-card class="card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>卡片名称</span>
      </div>
      <div>{{ msg }}</div>
    </el-card> -->
      <div class="tip">
        <!-- <div class="box img-box"><img
        src="../../../../assets/guider.jpg"
        alt=""
      ></div> -->
        <div class="box text-box">{{ msg }}</div>
      </div>
    </div>
  </div>

</template>

<script>
import community from '../../../../assets/json/community.json'
import saxcGrid from '../../../../assets/json/saxc-grid.json'
import saxcBuilding from '../../../../assets/json/saxc-building.json'

export default {
  name: '',
  props: {
    title: {
      type: String,
      default: '属性窗口'
    },
    opened: {
      type: Boolean,
      default: false
    },
    layerType: {
      type: String,
      default: '网格'
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      json: undefined,
      msg: '信息缺失'
    }
  },
  watch: {
    title(newVal) {
      switch (this.layerType) {
        case '网格':
          this.json = saxcGrid
          break
        case '社区':
          this.json = community
          break
        default:
          this.json = saxcBuilding
          break
      }
      var str_before = newVal.split('-')[0]
      var selectedData = this.json.filter(c => str_before === c.name)
      if (selectedData.length !== 0) {
        this.msg = selectedData[0].des
      } else {
        this.msg = '信息缺失'
      }
    }
  }
}
</script>

<style scoped>
.cesiumTooltip {
  position: absolute;
  width: 500px;
  height: 500px;
}

.tip {
  /* background-color: white; */
  background-image: url(../../../../assets/div_backimg/tbg390.png);
  background-size: 100% 100%;
  padding: 20px;
  border-radius: 4px;
  -moz-box-shadow: 2px 2px 5px #333333;
  -webkit-box-shadow: 2px 2px 5px #333333;
  box-shadow: 2px 2px 5px #333333;

  line-height: 25px;
  display: flex;
}

.box {
  justify-content: space-between;
  align-items: flex-start;
}

.text-box {
  color: white;
  font-size: 18px;
  text-indent: 2em;
}
</style>
