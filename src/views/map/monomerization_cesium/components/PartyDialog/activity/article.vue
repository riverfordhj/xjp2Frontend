<template>
  <el-dialog
    width="30%"
    title="活动内容"
    :visible.sync="innerVisible"
    append-to-body
  >
    <article>
      <h3>1月3日上午，水岸星城社区分5个支部分别以主题为“前进脚步不停滞 奋力谱写新华章”开展支部主题党日活动</h3>
      <p>活动流程如下：</p>
      <p>1.按月缴纳党费；</p>
      <p>2.开展“温誓词、忆初心，赠良言、送诤语”活动（吴磊）</p>
      <p>3.诵读《党章》总纲（第十一段至第十四段）(胡蝶)</p>
      <p>4.深入学习习近平总书记在庆祝改革开放 40 周年大会上的讲话精神</p>
      <p>5.认真学习中央、全省、全市经济工作会议精神（禹秋香）</p>
      <p>6.认真学习全市“两会”精神（刘梅）</p>
      <p>7.组织学习《中国共产党支部工作条例（试行）》（刘静）</p>
      <p>8.认真学习《中共中央组织部办公厅关于严格做好党员徽章制作、佩戴和管理工作</p>
      <p>的通知》（程震）</p>
      <p>9.开展生活困难党员摸底和走访慰问工作（吴磊）</p>
      <p>10、认真学习全省村（社区）“两委”换届工作突出问题</p>
      <p>11.落实公开制度（吴磊）</p>
      <p>12.观看十九大微视频100讲</p>
    </article>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  props: {
    aopend: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerVisible: false
    }
  },
  watch: {
    aopend() {
      this.innerVisible = true
    }
  }
}
</script>

<style scoped>
h3 {
}
p {
  font-size: 14px;
  color: #606266;
  text-indent: 2em;
}
</style>
