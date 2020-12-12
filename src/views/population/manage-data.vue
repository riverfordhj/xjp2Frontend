<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.filter" placeholder="过滤(小区，楼栋)" clearable style="width: 180px;" class="filter-item" />
      <el-select v-model="listQuery.subdivsion" placeholder="小区" clearable style="width: 150px" class="filter-item" @change="getBuildingsData">
        <el-option v-for="item in filteredSubdivsions" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.building" placeholder="楼栋" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in filteredBuildings" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        小区查询
      </el-button>
     
      <el-input v-model="listQuery.sname" placeholder="请输入姓名、身份证号、电话查询" style="width: 280px;" class="filter-item" @keyup.enter.native="searchPerson" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchPerson">
        人员查询
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getSpecialGroupsData">
        特殊人群
      </el-button> 
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="dialogVisible = true">高级检索</el-button> 
    </div>

    <el-table :data="filterdPersonHouseInfo" height="800" border style="width: 100%" :row-class-name="tableRowClassName">
      
      <el-table-column prop="roomNO" label="房号" sortable width="80" :sort-method="sortRoomNO" />
      <el-table-column prop="person.name" label="姓名" width="80">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <ul>
              <li v-for="item in scope.row.specialGroup" :key="item.Id">特殊人群：{{ item.type }}</li> 
            </ul>
            <div slot="reference" class="name-wrapper" v-if="scope.row.person">
              <el-tag size="medium">{{ scope.row.person.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="person.personId" label="身份证" width="170" />
      <el-table-column prop="person.phone" label="电话" width="120" />
      <el-table-column prop="person.ethnicGroups" label="民族" width="80" />
      <el-table-column prop="isOwner" label="产权人" width="80" :formatter="formatter" />
      <el-table-column prop="isHouseholder" label="户主" width="80" />
      <el-table-column prop="relationWithHouseholder" label="与户主关系" />
      <el-table-column prop="isLiveHere" label="在此居住" width="80" />
      <el-table-column prop="populationCharacter" label="人口性质" />
      <el-table-column prop="lodgingReason" label="寄住原因" />
      <el-table-column prop="person.address" label="户籍地址" />
      <el-table-column prop="person.company" label="公司" />
      <el-table-column prop="person.isOverseasChinese" label="海外华人" />
      <el-table-column prop="person.politicalState" label="政治面貌" />
      <el-table-column prop="person.organizationalRelation" label="组织关系" />
      <el-table-column prop="communityName" label="社区" />
      <el-table-column prop="subdivsionName" label="小区" />
      <el-table-column prop="bulidingName" label="楼栋" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="name" label="小区测试" />
      
      

    </el-table>
    
  <el-dialog title="高级检索" :visible.sync="dialogVisible"	width="40%" center>                                        
		<el-form  class="advanced-search" label-width="100px">
			<el-form-item label="小区:" >
				<el-input v-model="listQuery.subdivsion" placeholder="请输入小区名称" clearable style="width: 180px;"></el-input>
			</el-form-item>	
      <el-form-item  v-for="queryitem in dataForms" :key="queryitem.key">
          <el-select v-model="queryitem.field" placeholder="字段" clearable style="width: 100px;">
            <el-option v-for="(item, index) in fields" :key="index" :label="item" :value="item"/>
          </el-select>
          <el-select v-model="queryitem.operato" placeholder="运算符" clearable style="width: 100px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"> </el-option>
          </el-select>
          <el-input v-model="queryitem.sname" placeholder="请输入" clearable style="width: 180px;"></el-input>  
          <el-button @click.prevent="removeform(form)">删除</el-button>
			</el-form-item>	
      
    </el-form>	
    <span slot="footer" class="dialog-footer">
			<el-button type="warning" icon="el-icon-refresh" @click="dialogVisible = false" >取 消</el-button>
      <el-button type="primary" @click="addform">新增</el-button>
			<el-button type="primary" icon="el-icon-check" @click="superQuery">查 询</el-button>
		</span>
	</el-dialog>

    <!-- pivot 窗口 ss-->
    <el-dialog title="提示" :visible.sync="pivotdialogVisible" width="80%">
      <div id="pivot">
        <span>Pivot</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSubdivsions, getBuildingsBySub, getPersons, getPersonsByBuilding, getPersonsBySubdivision, getPersonsBySearch, getSpecialGroups,getFields,getDataByQuery } from '@/api/person.js'

// const { JSDOM } = require('jsdom')
// const { window } = new JSDOM('')
// const jquery = require('jquery')(window)
const $ = require('jquery')
// import jquery from 'jquery'
const { pivot, pivotUI } = require('pivottable')

export default {
  name: 'PersonHouseData',
  data() {
    return {
      subdivsions: [],
      personHouseInfo: [],
      filterdPersonHouseInfo: [],
      buildings: [],
      //specialGroups: [],
      dialogVisible: false,
      fields:[],
      dataForms:[
        {
          field:'',
          operato:'',
          sname:'',          
        }
      ],
      options: [{
          value: '选项1',
          label: '<'
        }, {
          value: '选项2',
          label: '>'
        }, {
          value: '选项3',
          label: '='
        }, {
          value: '选项4',
          label: '>='
        }, {
          value: '选项5',
          label: '<='
        }],

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        subdivsion: '',
        building: undefined,
        // room: undefined,
        filter: '',
        sort: '+id',
        sname: ''
      },

      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,

      pivotdialogVisible: false, // pivot 控制窗口显示
      myStyle: {
        display: "none"
      }
    }
  },
  // 数据管理，小区楼栋筛选
  computed: {
    filteredSubdivsions() {
      // debugger
      if (this.listQuery.filter) {
        //	debugger;
        const value = this.listQuery.filter.split(/[，,]/g)
        return this.subdivsions.filter(item => item.name.indexOf(value[0]) !== -1)
      } else {
        return this.subdivsions
      }
    },
    filteredBuildings() {
      if (this.listQuery.filter) {
        const value = this.listQuery.filter.split(/[，,]/g)
        if (value[1]) { return this.buildings.filter(item => item.name.indexOf(value[1]) !== -1) }
      }
      return this.buildings
    },
  },
  created() {
    this.getSubdivsionsData()
    this.getFieldsData()
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
    getSpecialGroupsData() {  
      getSpecialGroups().then(response => {
         // debugger
        this.filterdPersonHouseInfo = this.personHouseInfo = response
      }).catch(error => {
        debugger
        console.log(error)
      })
    },
    getFieldsData() {
      //debugger
      getFields().then(response => {
        debugger
        this.fields = response
      }).catch(error => {
        debugger
        console.log(error)
      })
    },
     superQuery() {
      debugger
      getDataByQuery(this.dataForms).then(response => {
        debugger
        this.filterdPersonHouseInfo = response
      }).catch(error => {
        debugger
        console.log(error)
      })
    },
    getSubdivsionsData() {
      getSubdivsions().then(response => {
        // debugger
        this.subdivsions = response
      }).catch(error => {
        debugger
        console.log(error)
      })
    },
    getBuildingsData(item) {
      // debugger
      if (!item) { // 如果取消小区选取
        this.buildings = []
        return
      }
      getBuildingsBySub(item).then(response => {
        // debugger
        this.buildings = response
      }).catch(error => {
        debugger
        console.log(error)
      })
    },
    getPersonsData() {
      getPersons().then(response => {
        // debugger
        this.filterdPersonHouseInfo = this.personHouseInfo = response
      }).catch(error => {
        debugger
        console.log(error)
      })
    },
    getPersonsBySubdivisionData() {
      // debugger
      getPersonsBySubdivision(this.listQuery.subdivsion).then(response => {
        //debugger
        this.personHouseInfo = response;
        this.filterdPersonHouseInfo  = response;
      }).catch(error => {
        debugger
        console.log(error)
      })
    },
    getPersonsByBuildingData() {
       //debugger
      getPersonsByBuilding(this.listQuery.building).then(response => {
        // debugger
        this.filterdPersonHouseInfo = this.personHouseInfo = response
      }).catch(error => {
        debugger
        console.log(error)
      })
    },
    handleFilter() {
       // debugger
      if (this.listQuery.subdivsion) { // 如果选择小区
        if (this.listQuery.building) { // 如果选取建筑物
          this.getPersonsByBuildingData()
        } else {
          this.getPersonsBySubdivisionData()
        }
      }
    },
    // handleLocalFilter() {
    //   // debugger
    //   var value = this.listQuery.sname
    //   if (this.listQuery.sname) {
    //     this.filterdPersonHouseInfo = this.personHouseInfo.filter(item => item.person.name.indexOf(value) !== -1)
    //   } else {
    //     this.filterdPersonHouseInfo = this.personHouseInfo
    //   }
    // },
    searchPerson() {
      debugger
      var subdivsionsid= this.listQuery.subdivsion.toString()
      var advancedname = this.listQuery.sname 
      getPersonsBySearch(subdivsionsid,advancedname).then(response => {
         debugger
        this.filterdPersonHouseInfo = response
      }).catch(error => {
        debugger
        console.log(error)
      })
    },
    tableRowClassName({ row, rowIndex }) {
      // debugger     
       //if (row.specialGroup.length) {
      //if (scope.row.type) {
      //   return 'warning-row'
      // }
      // return ''
    },
    formatter(row, column) {
      // debugger
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
    showPivotdialog() {
      this.pivotdialogVisible = true
      debugger
      $('#pivot').pivotUI(
        [
          { color: 'blue', shape: 'circle' },
          { color: 'red', shape: 'triangle' }
        ],
        {
          rows: ['color'],
          cols: ['shape']
        }
      )
      // click(e => console.log('jqery is ok!'))
    },
    handleSuperFilter(){

    }
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
