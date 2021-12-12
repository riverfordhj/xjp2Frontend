<template>
    <div class="app-container">
         <el-table :data="rainPoint" height="835" border style="width: 100%"  @row-dblclick="handleDoubleClick">
			
      <el-table-column 	align="center" type="index" width="80" label="ID">
	</el-table-column>
    
      <el-table-column prop="name" label="名称"  width="80" />
      <el-table-column prop="longitude" label="经度" width="170" />
      <el-table-column prop="latitude" label="纬度" width="170" />
      <el-table-column prop="height" label="高度" width="80" />
      <el-table-column prop="report" label="上报人" width="80" />
      <el-table-column prop="status" label="状态" width="80" />
      <el-table-column prop="type" label="类型" width="80" />
      <el-table-column prop="address" label="地址"  width="170" />
      <el-table-column prop="note" label="备注"  />
    
      
    </el-table>
    </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
import {GetRainPoint } from '@/api/person.js'
import checkPermission from '@/utils/permission.js';//权限判断函数
export default {
    name:'rain',
    data(){
        return{
            rainPoint:[],
        }
    },
    components: {
	
	},
    computed:{

    },
    created(){
       this.getRainPoint();
    },
    methods:{
        getRainPoint(){
            GetRainPoint().then(res =>{
                this.rainPoint = res;
            }).catch(error =>{
                console,log(error);
            })
        },
        handleDoubleClick(row){
            if(checkPermission('Administrator')){
                this.$router.push({name: 'PersonHouseMap'});   
                      debugger          
                const position = { 
                    long: row.longitude,
                    lat: row.latitude,
                    height: row.height
                }
                this.bus.$emit("transferRoomId", position);
           
            }     
        },
    },
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