<template>
	<div class="filterBar">
		<el-select class="filter-select" v-model="operationValue" clearable placeholder="全部" @change="selectOperation">
			<el-option
				v-for="item in operationOptions"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
		<el-select class="filter-select" v-model="statusValue" clearable placeholder="全部" @change="selectStatus">
			<el-option
				v-for="item in statusOptions"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
		<el-date-picker
		  class="filter-time-picker"
      v-model="dateTimeValue"
      type="datetimerange"
      align="right"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['09:00:00', '17:00:00']"
			@change="selectTime">
    </el-date-picker>
	</div>
</template>

<script>
export default {
	name: 'historyFilterPanel',
	data(){
		return {
			operationValue: '',
			operationOptions: [
				{
          value: 'creating',
          label: '新建'
				},{
          value: 'updating',
          label: '修改'
        },{
          value: 'deleting',
          label: '删除'
        }
			],

			statusValue: '',
			statusOptions: [
		    {
					value: 'committed&rejected',
					label: '待审核'
				},{
					value: 'verified',
					label: '通过审核'
				},{
					value: 'failed',
					label: '未通过审核'
				}
			],

			dateTimeValue: ''
		}
	},
	methods: {
		//重置函数
		resetFilter(){
			this.operationValue = '';
			this.statusValue = '';
			this.dateTimeValue = '';
			this.$emit('reset');
		},
		selectOperation(operationVal){
			if(operationVal != ''){
				this.$emit('operationChange', operationVal);
			}else{
				this.resetFilter();
			}
		},
		selectStatus(statusVal){
			if(statusVal != ''){
				this.$emit('statusChange', statusVal);
			}else{
				this.resetFilter();
			}
		},
		selectTime(timeVal){
      if(timeVal != null){
				//回调参数为Date对象，getTime方法返回时间戳
				let startTime = timeVal[0].getTime();
				let endTime = timeVal[1].getTime();
				this.$emit('timePicked', startTime, endTime);
			}else{
				this.resetFilter();
			}
		}
	}
}
</script>

<style scoped>
  .filterBar{
		display: inline-block;
	}
	.filter-select{
		width: 110px;
	}
	.filterBar >>> input {
		padding-left: 5px;
	}
</style>