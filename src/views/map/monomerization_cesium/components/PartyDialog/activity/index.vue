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
          label="活动主题"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column
          label="活动时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column
          label="活动地点"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.location }}
          </template>
        </el-table-column>

        <el-table-column
          label="活动内容"
          align="center"
        >
          <el-button
            type="text"
            @click="openArticle"
          >点击查看</el-button>
        </el-table-column>
        <el-table-column
          label="参加人数"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.number }}
          </template>
        </el-table-column>
        <el-table-column
          label="图片"
          align="center"
        >
          <!-- <template slot-scope="scope">
            {{ scope.row.picture }}
          </template> -->
          <el-button
            type="text"
            @click="openPicture"
          >点击查看</el-button>
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
    <articleDialog :aopend="aopend" />
    <pictures :popened="popened" />
  </div>
</template>

<script>
// import { getPeopleByBuilding } from '@/api/people.js'
import { splitByComma } from '@/utils/index.js'
import articleDialog from './article'
import pictures from './pictures'

export default {
  name: '',
  components: {
    articleDialog,
    pictures
  },
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
      list: [{
        title: '前进脚步不停滞,奋力谱写新华章',
        time: '2019年1月3日',
        location: '社区会议室',
        number: '45',
        content: '..',
        picture: '..'

      }],
      search: '',
      currentPage: 1,
      pagesize: 20,
      popened: false,
      aopend: false
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
    },
    openArticle() {
      this.aopend = !this.aopend
    },
    openPicture() {
      this.popened = !this.popened
    }
  }

}
</script>

<style>
.el-table {
  overflow-x: visible;
}
</style>
