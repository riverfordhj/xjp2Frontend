<template>
  <div class="table">
    <div style="float:right">
      检索：
      <el-input
        v-model="search"
        size="small"
        style="width:150px;"
        clearable
      />
    </div>

    <el-table
      :data="datas.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)"
      style="width: 100%;padding-top: 15px;"
      height="350px"
      class="table-fixed"
    >
      <el-table-column
        label="房屋号"
        min-width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.HouseNumber }}
        </template>
      </el-table-column>
      <el-table-column
        label="单元号"
        min-width="200"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.UnitNumber }}
        </template>
      </el-table-column>
      <el-table-column
        label="房屋面积"
        min-width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.HouseArea }}
        </template>
      </el-table-column>
      <el-table-column
        label="房屋用途"
        min-width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.Use }}
        </template>
      </el-table-column>
    </el-table>

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
// import { getHousesByBuildingName } from '@/api/house.js'
import { splitByComma } from '@/utils/index.js'

export default {
  name: '',
  props: {
    title: {
      type: String,
      default: 'G12'
    },
    houses: {
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
    houses(newVal) {
      this.list = newVal
    }
  },
  mounted() {
    // getHousesByBuildingName(this.title).then(res => {
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
.table {
  height: 450px;
}
.el-table__fixed-right {
  height: 100% !important;
}
</style>
