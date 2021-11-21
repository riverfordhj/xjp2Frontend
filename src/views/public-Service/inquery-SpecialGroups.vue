<template>
    <div class="app-container">
        <div class="filter-container">
            <el-select v-model="typevalue" placeholder="特殊人群类型" clearable style="width: 150px" class="filter-item" @change="filterType" @clear = "getSpecialGroupsData">
                <el-option v-for="item in this.specialType" :key="item.type" :label="item.type" :value="item.type" />
            </el-select>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getSpecialGroupsData">特殊人群</el-button> 
			  <!-- 导出数据为xlsx格式表格 -->
			<export-to-xlsx :table-header="tableHeaderForXlsx" :filter-fields="filterValForXlsx" :person-house-data="personHouseList"></export-to-xlsx>
        </div>   

    
        <el-table :data="personHouseList" height="835" border style="width: 100%"  @row-dblclick="handleDoubleClick">		
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

        <pagination :total-num="total" :page.sync="paginationSetting.curPage" :limit.sync="paginationSetting.limit" ></pagination>
    </div>
</template>
<script>
import {getSpecialGroups,getRoomId,getSpecialType } from '@/api/person.js';
import exportToXlsx from '../population/components/exportToXlsx.vue';
import pagination from '../../components/pagination.vue';
import { deepClone } from '@/utils/tools.js';
import checkPermission from '@/utils/permission.js';//权限判断函数

export default {
    name: 'SpecialGroup',
    data(){
        return {
            filterdPersonHouseInfo: [],
            tempfilterData: [],
            specialType:[],
            typevalue:'',

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
		pagination,
	},
    computed: {
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
        this.getSpecialGroupsData();
        this.getTypeData();
    },
    methods:{
     getTypeData() {
            getSpecialType().then(response => {
                this.specialType = response
            }).catch(error => {
                console.log(error)
            })
     },
    getSpecialGroupsData() {  
        getSpecialGroups().then(response => {
            debugger
            this.filterdPersonHouseInfo = response;
            this.tempfilterData = deepClone(this.filterdPersonHouseInfo, []);
            if(this.filterdPersonHouseInfo.length < 1){   
            this.$message.error('查询完毕，无数据记录');
            }  
            this.resetPaginationSetting();				
        }).catch(error => {
            console.log(error)
        })
    },
    		resetPaginationSetting(){
			this.paginationSetting = {
				limit: 200,
				curPage: 1
			}
		},
        sortRoomNO(row, column) {
      try {
        if (row.roomNO.lenght === 5) {
          return row.roomNO.replace('-', '-0')
        }
      } catch {
        return row.roomNO
      }
    },
      handleDoubleClick(row){
      debugger
      if(checkPermission('Administrator')){
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
      }     
		},

    filterType(){
        this.filterdPersonHouseInfo = this.tempfilterData.filter( item => {
          return item.type === this.typevalue;
          })
    } 
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
