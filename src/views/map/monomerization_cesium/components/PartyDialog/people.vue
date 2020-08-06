<template>
  <div>
    <div style="float:right">
      检索：
      <el-input
        v-model="search"
        size="small"
        style="width:150px;"
        clearable
      />
    </div>
    <div style="width:100%">
      <el-table
        :data="datas.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)"
        style="width: 100%;padding-top: 15px;"
        height="400px"
      >
        <el-table-column
          label="姓名"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">
            {{ scope.row['姓名'] }}
          </template>
        </el-table-column>
        <el-table-column
          label="身份证号"
          align="center"
          width="180px"
        >
          <template slot-scope="scope">
            {{ scope.row['身份证号码'] }}
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
          align="center"
          width="50px"
        >
          <template slot-scope="scope">
            {{ scope.row['性别'] }}
          </template>
        </el-table-column>
        <el-table-column
          label="民族"
          align="center"
          width="60px"
        >
          <template slot-scope="scope">
            {{ scope.row['民族'] }}
          </template>
        </el-table-column>
        <el-table-column
          label="年龄"
          align="center"
          width="50px"
        >
          <template slot-scope="scope">
            {{ scope.row['年龄'] }}
          </template>
        </el-table-column>
        <el-table-column
          label="联系方式"
          align="center"
          width="120px"
        >
          <template slot-scope="scope">
            {{ scope.row['手机号码'] }}
          </template>
        </el-table-column>
        <el-table-column
          label="入党日期"
          align="center"
          width="120px"
        >
          <template slot-scope="scope">
            {{ scope.row['入党日期'] }}
          </template>
        </el-table-column>
        <el-table-column
          label="所在党支部"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row['所在党支部'] }}
          </template>
        </el-table-column>
        <el-table-column
          label="现居住地"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row['现居住地'] }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="width:98%;margin:0 auto;margin-top:20px;margin-bottom:0">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="datas.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// import { getPeopleByBuilding } from '@/api/people.js'
import { splitByComma } from '@/utils/index.js'
import partyMemberJson from '@/assets/json/partyMember.json'

export default {
  name: '',
  props: {
    title: {
      type: String,
      default: 'G12'
    },
    people: {
      type: Array,
      default() {
        return []
      }
    }

  },
  data() {
    return {
      list: [],
      search: '',
      currentPage: 1,
      pagesize: 20
    }
  },
  computed: {
    datas: function() {
      const search = this.search
      if (search) {
        var searchList = splitByComma(search)
        return this.list.filter(dataNews => {
          return searchList.every(a => {
            return Object.keys(dataNews).some(key => {
              return String(dataNews[key]).toLowerCase().indexOf(a) > -1
            })
          })
        })
      }
      // console.log(this.tableData);
      return this.list || []
    }
  },
  // watch: {
  //   people(newVal) {
  //     this.list = newVal
  //   }
  // },
  mounted() {
    // var arr = []
    // partyMemberJson.map(people => {

    // })
    this.list = partyMemberJson
    // debugger
    // getPeopleByBuilding(this.title).then(res => {
    //   this.list = res.data
    // })
  },
  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style>
.el-table {
  overflow-x: visible;
}
</style>
