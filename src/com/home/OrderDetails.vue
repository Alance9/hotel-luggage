<template>
  <el-card class="ca">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>寄存行李</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 提示 -->

    <!-- 选项卡 -->
    <el-card class="card">
      <h2>订单详情</h2>
      <el-form :label-position="left" label-width="220px">
        <el-form-item label="编号: ">00000001</el-form-item>

          <el-form-item label="姓名: " class="input">Alan</el-form-item>

          <el-form-item label="联系方式: ">136xxxx7646</el-form-item>

          <el-form-item label="行李件数: " class="input">1</el-form-item>

          <el-form-item label="行李描述: ">黑色大箱子</el-form-item>
          <el-form-item label="寄存时间: ">2019-11-20</el-form-item>
          <el-form-item label="预取时间: ">2019-11-28</el-form-item>
           <el-form-item label="寄存人: ">Alan</el-form-item>

          <el-form-item style="margin-left:-60px">
            <el-button type="primary">修 改</el-button>
            <el-button type="primary">领取</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      pos: "right"
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style>

</style>
