<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.filter" placeholder="过滤(社区，网格，楼栋)" clearable style="width: 180px;" class="filter-item" />
      <el-select v-model="listQuery.community" placeholder="社区" clearable style="width: 150px" class="filter-item" @change="getNetGridData">
        <el-option v-for="item in filteredCommunities" :key="item.id" :label="item.name + '社区' " :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.netGrid" placeholder="网格" clearable style="width: 100px" class="filter-item" @change="getBuildingsData">
        <el-option v-for="item in filteredNetGrids" :key="item.id" :label="'网格' + item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.building" placeholder="楼栋" clearable class="filter-item" style="width: 150px">
        <el-option v-for="item in filteredBuildings" :key="item.id" :label="item.address + '-' + item.name + '栋'" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        楼栋查询
      </el-button>
      <el-input v-model="listQuery.sname" placeholder="请输入姓名、身份证号、电话查询" style="width: 280px;" class="filter-item" @keyup.enter.native="searchPerson" />
      <el-button class="filter-item" type="success" icon="el-icon-search" @click="searchPerson">
        全区人员查询
      </el-button>
      <el-button class="filter-item" type="success" icon="el-icon-search" @click="dialogVisible = true">高级检索</el-button> 


      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getSpecialGroupsData">
        特殊人群
      </el-button> 
			  <!-- 导出数据为xlsx格式表格 -->
			<export-to-xlsx :table-header="tableHeaderForXlsx" :filter-fields="filterValForXlsx" :person-house-data="personHouseList"></export-to-xlsx>
    </div>

    <el-table :data="personHouseList" height="835" border style="width: 100%" :row-class-name="tableRowClassName" @row-dblclick="handleDoubleClick">
			
      <el-table-column 	align="center" type="index" :index="customizeIndex"	width="80" label="ID">
			</el-table-column>
      <el-table-column prop="roomNO" label="房号" sortable width="80" :sort-method="sortRoomNO" />
      <el-table-column  label="姓名" width="80">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <ul>
              <li v-for="item in scope.row.specialGroup" :key="item.Id">特殊人群：{{ item.type }}</li> 
            </ul>
            <div slot="reference" class="name-wrapper" >
              <el-tag  size="medium">{{ scope.row.person.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="person.personId" label="身份证" width="170" />
      <el-table-column prop="person.phone" label="电话" width="120" />
      <el-table-column prop="person.ethnicGroups" label="民族" width="80" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="isOwner" label="产权人" width="80" />
      <el-table-column prop="isHouseholder" label="户主" width="80" />
      <el-table-column prop="relationWithHouseholder" label="与户主关系" />
      <el-table-column prop="isLiveHere" label="在此居住" width="80" />
      <el-table-column prop="populationCharacter" label="人口性质" />
      <el-table-column prop="lodgingReason" label="寄住原因" />
      <el-table-column prop="person.domicileAddress" label="户籍地址" />
      <el-table-column prop="person.company" label="公司" />
      <el-table-column prop="person.isOverseasChinese" label="海外华人" />
      <el-table-column prop="person.politicalState" label="政治面貌" />
      <el-table-column prop="person.organizationalRelation" label="组织关系" />
      <el-table-column prop="communityName" label="社区" />
      <el-table-column prop="netGridName" label="网格" />
      <el-table-column prop="subdivsionName" label="小区" />
      <el-table-column prop="bulidingName" label="楼栋" />
      <el-table-column prop="bulidingAddress" label="地址" />
      <el-table-column prop="type" label="类型" >
      </el-table-column>
    </el-table>
    
  <el-dialog title="高级检索(1000条)" :visible.sync="dialogVisible"	width="40%" center>                                        
		<el-form  class="advanced-search" label-width="100px">
      <el-form-item  v-for="queryitem in dataForms" :key="queryitem.key">
          <el-select v-model="queryitem.field" placeholder="字段" clearable style="width: 100px;" @change="filteroperato">
            <el-option v-for="(item, index) in fields" :key="index" :label="item" :value="item"/>
          </el-select>
          <el-select v-model="queryitem.operato" placeholder="运算符" clearable style="width: 100px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"> </el-option>
          </el-select>
          <el-input v-model="queryitem.sname" placeholder="请输入" clearable style="width: 180px;"></el-input>  
          <el-button @click.prevent="removeform(queryitem)">删除</el-button>
			</el-form-item>	
      
    </el-form>	
    <span slot="footer" class="dialog-footer">
			<el-button type="warning" icon="el-icon-refresh" @click="dialogVisible = false" >取 消</el-button>
      <el-button type="primary" @click="addform">新增</el-button>
			<el-button type="primary" icon="el-icon-check" @click="superQuery">查 询</el-button>
		</span>
	</el-dialog>

	<!-- 分页显示 -->
	<pagination :total-num="total" :page.sync="paginationSetting.curPage" :limit.sync="paginationSetting.limit" ></pagination>
  </div>
</template>

<script>
import {getCommunityPersons, getCommunitys, getNetGridInCommunity, getBuildingInNetGrid, getPersonsByNetGrid, getPersons, getPersonsByBuilding,getRoomId, getPersonsBySearch, getSpecialGroups,getFields,getDataByQuery } from '@/api/person.js'
import exportToXlsx from './components/exportToXlsx';
import pagination from '../../components/pagination.vue';

export default {
  name: 'PersonHouseData',
  data() {
    return {
      roomInfo:{},
      communities:[],
      netGrids:[],
      buildings: [],
      personHouseInfo: [],
      filterdPersonHouseInfo: [],
      specialGroups: [],
      dialogVisible: false,
      fields:[],
      dataForms:[
        {
          field:'',
          operato:'',
          sname:'',          
        }
      ],
      options: [],
      listQuery: {
        page: 1,
        limit: 200,
        name: '',
        community:'',
        netGrid:'',
        subdivsion: '',
        building: undefined,
        filter: '',
        sort: '+id',
        sname: ''
      },

      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      myStyle: {
        display: "none"
			},

			//xlsx表配置项（表头、数据）
			tableHeaderForXlsx: ['房号', '姓名', '身份证', '电话','民族','产权人','户主','与户主关系','在此居住','人口性质','寄住原因','户籍地址','公司','海外华人','政治面貌','组织关系','社区','小区','楼栋','类型'],
			filterValForXlsx: ['roomNO', 'person.name', 'person.personId','person.phone','person.ethnicGroups','isOwner','isHouseholder','relationWithHouseholder','isLiveHere','populationCharacter'
													,'lodgingReason','person.address','person.company','person.isOverseasChinese','person.politicalState','person.organizationalRelation','communityName','subdivsionName'
													,'bulidingName','type'],
			//分页默认配置
			paginationSetting: {
				limit: 200,
				curPage: 1
			}
    }
	},
	components: {
		exportToXlsx,
		pagination
	},
  // 数据管理，小区楼栋筛选
  computed: {
       filteredCommunities() {
       //debugger
      if (this.listQuery.filter) {
      	//debugger;
        const value = this.listQuery.filter.split(/[，,]/g)
        return this.communities.filter(item => item.name.indexOf(value[0]) !== -1)
      } else {
        return this.communities
      }
    },
    filteredNetGrids() {
       //debugger
      if (this.listQuery.filter) {
        	//debugger;
        const value = this.listQuery.filter.split(/[，,]/g)
        if (value[1]){
         // debugger
          return this.netGrids.filter(item => item.name.indexOf(value[1]) !== -1)
          }
      } 
       return this.netGrids       
    },
    filteredBuildings() {
     // debugger
      if (this.listQuery.filter) {
       // debugger
        const value = this.listQuery.filter.split(/[，,]/g)
        if (value[2]) { 
          return this.buildings.filter(item => item.name.indexOf(value[2]) !== -1) 
          }
      }
      //debugger
      return this.buildings
		},
		total(){
			return this.filterdPersonHouseInfo.length;
		},
		personHouseList(){
			return this.filterdPersonHouseInfo.filter((item, index) => {
				return index >= (this.paginationSetting.curPage - 1) * this.paginationSetting.limit && index < this.paginationSetting.curPage * this.paginationSetting.limit;
			})
		},
		customizeIndex(){
			return (this.paginationSetting.curPage - 1) * this.paginationSetting.limit + 1;
		}
  },
  created() {
    this.getCommunitysPersonsData()
    this.getFieldsData()
    this.getCommunitysData()
  },
  mounted() {
  },
  methods: {
		removeform(item) {
			var index = this.dataForms.indexOf(item)
			if (index !== -1) {
				this.dataForms.splice(index, 1)
			}
		},
		addform() {
			this.dataForms.push({
				field:'',
				operato: '',
				sname:'',
				key: Date.now()
			});
		},
    getCommunitysPersonsData() {
      getCommunityPersons().then(response => {
        this.filterdPersonHouseInfo = response
      }).catch(error => {
        console.log(error)
      })
    },
    getSpecialGroupsData() {  
      getSpecialGroups().then(response => {
          debugger
        this.filterdPersonHouseInfo = response;
        if(this.filterdPersonHouseInfo.length < 1){   
          this.$message.error('查询完毕，无数据记录');
        }  
        this.resetPaginationSetting();				
      }).catch(error => {
        console.log(error)
      })
    },
    getFieldsData() {
      //debugger
      getFields().then(response => {
        // debugger
        this.fields = response
      }).catch(error => {
        console.log(error)
      })
    },
     superQuery() {
      debugger         
      getDataByQuery(this.dataForms).then(response => {
				this.filterdPersonHouseInfo = response;
        debugger
        if(this.filterdPersonHouseInfo.length < 1){
          this.$message.error('查询完毕，无数据记录，请输入正确检索条件')
        }
				this.resetPaginationSetting();
      }).catch(error => {
        console.log(error)
      })
      this.dialogVisible =false 
    },
      getCommunitysData() {
      //debugger
      getCommunitys().then(response => {
        // debugger
        this.communities = response
      }).catch(error => {
        console.log(error)
      })
    },
     getNetGridData(item) {
      // debugger
      if (!item) { // 如果取消社区选取
        this.netGrids = []
        return
      }
      getNetGridInCommunity(item).then(response => {
         //debugger
        this.netGrids = response
      }).catch(error => {
        console.log(error)
      })
    },
    getBuildingsData(item) {
      // debugger
      if (!item) { // 如果取消网格选取
        this.buildings = []
        return
      }
      getBuildingInNetGrid(item).then(response => {
        // debugger
        this.buildings = response
      }).catch(error => {
        console.log(error)
      })
    },
    getPersonsData() {
      getPersons().then(response => {
        // debugger
        this.filterdPersonHouseInfo = this.personHouseInfo = response
      }).catch(error => {
        console.log(error)
      })
    },
    getPersonsByNetGridData() {
       debugger
      getPersonsByNetGrid(this.listQuery.netGrid).then(response => {
        debugger
        this.filterdPersonHouseInfo = this.personHouseInfo = response;
				this.resetPaginationSetting();
      }).catch(error => {
        console.log(error)
      })
    },
    getPersonsByBuildingData() {
       //debugger
      getPersonsByBuilding(this.listQuery.building).then(response => {
        // debugger
				this.filterdPersonHouseInfo = this.personHouseInfo = response;
				this.resetPaginationSetting();
      }).catch(error => {
        console.log(error)
      })
    },
    handleFilter() {
      debugger
     if(this.listQuery.community == "" && this.listQuery.netGrid == "" && this.listQuery.building == ""){
           this. getCommunitysPersonsData();
     }else
      if (this.listQuery.netGrid) { // 如果选择网格
      debugger
        if (this.listQuery.building) { // 如果选取建筑物
          this.getPersonsByBuildingData()
        } else {
          this.getPersonsByNetGridData()
        }
      }
    },
    searchPerson() {
      var advancedname = this.listQuery.sname 
      getPersonsBySearch(advancedname).then(response => {
				this.filterdPersonHouseInfo = response;
        if(this.filterdPersonHouseInfo.length < 1){   
           this.$message.error('查询完毕，无数据记录');
        }
				this.resetPaginationSetting();
      }).catch(error => {
        console.log(error)
      })
    },
    tableRowClassName({ row }) {
       //debugger     
       if (row.specialGroup) {
         if(row.specialGroup.length){
            return 'warning-row'
         }              
       }
    },
    // 将房号转换为数值，进行排序
    sortRoomNO(row, column) {
      try {
        if (row.roomNO.lenght === 5) {
          return row.roomNO.replace('-', '-0')
        }
      } catch {
        return row.roomNO
      }
      // const str = row.roomNO.replace('-', '.')
      // const value = Number(str)
      // // debugger
      // return value
    },
    filteroperato(val){
      if (val == "社区" ||val == "网格" || val == "楼栋" || val == "房间" || val == "姓名" || val == "电话" || val == "身份证" || val == "姓名"  || val == "性别" ){
         debugger
        this.options =  [{
          value: '选项1',
          label: '='
        }]
       }else if(val == "年龄"){
        this.options =  [{
          value: '选项1',
          label: '='
        }, {
          value: '选项2',
          label: '介于'
        }]
       }else
       {
         return this.options
       }
		},
		// customizeIndex(index){
		// 	return (this.pagination.curPage - 1)
		// }

		//重置queryList为默认值
		resetPaginationSetting(){
			this.paginationSetting = {
				limit: 200,
				curPage: 1
			}
		},
    handleDoubleClick(row){
			this.$router.push({name: 'PersonHouseMap'});
      //debugger
      this.roomInfo = {
        NetGridName:row.netGridName,
        AddressName:row.bulidingAddress,
        BuildingName:row.bulidingName,
        RoomNO:row.roomNO
        }
        //debugger
        getRoomId(this.roomInfo).then(response => {
         debugger
         const position = { // 70-2-1002
          long: response[0].longitude,
          lat: response[0].latitude,
          height: response[0].height
        }
        var roomname = response[0].name
         debugger
        this.bus.$emit("transferRoomId", position,roomname);
      }).catch(error => {
        console.log(error)
      })
      
		},
  }
}
</script>

<style>
  .el-table .warning-row {
    background:	#faebd7;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
