<template>
  <el-row
    :gutter="40"
    class="panel-group"
  >
    <el-col
      :xs="12"
      :sm="12"
      :lg="5"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="changeRouter('party-building')"
      >
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon
            icon-class="party-building"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          基层党建
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="5"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="changeRouter('city-management')"
      >
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon
            icon-class="city"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          城市管理
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="4"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="changeRouter('public-service')"
      >
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon
            icon-class="public-service"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          公共服务
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="5"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="changeRouter('economic-development')"
      >
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon
            icon-class="money"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          经济发展
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="5"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="changeRouter('governance')"
      >
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon
            icon-class="safety"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          综治维稳
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import CountTo from 'vue-count-to'

export default {
  components: {
    // CountTo
  },
  methods: {
    changeRouter(router) {
      // this.$emit('handleSetLineChartData', type)
      debugger
      this.$router.push({ path: `/map/${router}` })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      // margin: 26px;
      margin-right: 26px;
      line-height: 108px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 25px;
      // margin-bottom: 12px;
      // .card-panel-text {
      //   line-height: 18px;
      //   color: rgba(0, 0, 0, 0.45);
      //   font-size: 16px;
      //   margin-bottom: 12px;
      // }
      // .card-panel-num {
      //   font-size: 20px;
      // }
    }
  }
}
</style>
<style scoped>
.Grid {
  display: flex;
}

.Grid-cell {
  flex: 1;
}

.Grid-cell.u-full {
  flex: 0 0 100%;
}

.Grid-cell.u-1of2 {
  flex: 0 0 50%;
}

.Grid-cell.u-1of3 {
  flex: 0 0 33.3333%;
}

.Grid-cell.u-1of4 {
  flex: 0 0 25%;
}
</style>
