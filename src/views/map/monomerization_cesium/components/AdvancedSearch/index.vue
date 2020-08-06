<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>高级查询</span>
      <el-button
        style="float: right; padding: 3px 0;"
        type="text"
      >关闭</el-button>
    </div>
    <el-form
      ref="form"
      label-width="50px"
      :model="formData"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="formData.name"
          style="width:100%"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="年龄">
        <el-col :span="9">
          <el-select
            v-model="formData.ageType"
            placeholder="请选择判断类型"
            @change="ageTypeChanged"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col
          class="line"
          :span="2"
        >-</el-col>
        <el-col :span="13">
          <el-input
            v-if="ageInputType"
            v-model="formData.age"
            style="width:100%"
            placeholder="请输入内容"
          />
          <div v-else>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-input
                  v-model="formData.maxAge"
                  style="width:100%"
                  placeholder="请输入内容"
                />
              </el-col>
              <el-col :span="12">
                <el-input
                  v-model="formData.minAge"
                  style="width:100%"
                  placeholder="请输入内容"
                />
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-switch
          v-model="formData.sex"
          active-text="男"
          inactive-text="女 "
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="man"
          inactive-value="woman"
        />
      </el-form-item>
      <el-form-item label="社区">
        <el-checkbox-group v-model="formData.community">
          <el-row :gutter="0">
            <el-col :span="12">
              <el-checkbox
                label="水岸星城社区"
                name="type"
              />
            </el-col>
            <el-col :span="12">
              <el-checkbox
                label="湖北大学社区"
                name="type"
              />
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-checkbox
                label="油料所社区"
                name="type"
              />
            </el-col>
            <el-col :span="12">
              <el-checkbox
                label="徐东社区"
                name="type"
              />
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-checkbox
                label="团结社区"
                name="type"
              />
            </el-col>
            <el-col :span="12">
              <el-checkbox
                label="国际城社区"
                name="type"
              />
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-checkbox
                label="喻家湖社区"
                name="type"
              />
            </el-col>
            <el-col :span="12">
              <el-checkbox
                label="长轮社区"
                name="type"
              />
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-checkbox
                label="惠誉花园社区"
                name="type"
              />
            </el-col>
            <el-col :span="12">
              <el-checkbox
                label="秦园路社区"
                name="type"
              />
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-checkbox
                label="三角路社区"
                name="type"
              />
            </el-col>
            <el-col :span="12">
              <el-checkbox
                label="秦臻路社区"
                name="type"
              />
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-checkbox
                label="武车四村社区"
                name="type"
              />
            </el-col>
            <el-col :span="12">
              <el-checkbox
                label="水岸国际社区"
                name="type"
              />
            </el-col>
          </el-row>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="bottom clearfix">
      <el-button
        type="text"
        style="float: right; padding: 3px 0"
        @click="confirm"
      >确定</el-button>
      <el-button
        type="text"
        style="float: right; padding: 3px 0;margin-right:10px"
      >重置</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      formData: {
        name: '',
        sex: 'man',
        community: [],
        ageType: '',
        age: '',
        maxAge: '',
        minAge: ''

      },
      options: [{
        value: '大于',
        label: '大于'
      }, {
        value: '小于',
        label: '小于'
      }, {
        value: '等于',
        label: '等于'
      }, {
        value: '大于等于',
        label: '大于等于'
      }, {
        value: '小于等于',
        label: '小于等于'
      }, {
        value: '范围',
        label: '范围'
      }],
      ageInputType: true
    }
  },
  methods: {
    confirm() {
      console.log(this.formData)
      this.$emit('asComfirm')
    },
    ageTypeChanged(val) {
      console.log(val)
      if (val === '范围') {
        this.ageInputType = false
      } else {
        this.ageInputType = true
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 480px;
  position: absolute;
  top: 10px;
  right: 10px;
}
.line {
  text-align: center;
}
</style>
