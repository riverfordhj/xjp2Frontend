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
        height="350px"
      >
        <el-table-column
          label="姓名"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.Name }}
          </template>
        </el-table-column>
        <el-table-column
          label="身份证号"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.IDCard }}
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.Gender }}
          </template>
        </el-table-column>
        <el-table-column
          label="民族"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.Nationality }}
          </template>
        </el-table-column>
        <el-table-column
          label="政治面貌"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.PoliticalStatus }}
          </template>
        </el-table-column>
        <el-table-column
          label="户籍地"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.HouseholdRegistration }}
          </template>
        </el-table-column>
        <el-table-column
          label="联系方式"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.PhoneNumber }}
          </template>
        </el-table-column>
        <el-table-column
          label="职业"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.Career }}
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
  watch: {
    people(newVal) {
      this.list = newVal
    }
  },
  mounted() {
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
