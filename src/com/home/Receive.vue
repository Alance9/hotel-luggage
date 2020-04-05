<template>
  <div id="dis">
    <el-card class="ca">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>领取行李</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 提示 -->

      <!-- 选项卡 -->
      <el-card class="card" shadow="hover">
        <!-- style="height: 830px;" -->
        <h2>领取行李</h2>
        <el-form
          class="form"
          :label-position="left"
          label-width="120px"
          status-icon
        >
          <el-form-item class="input" style="width:350px">
            <el-input placeholder="请输入验证码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width:230px">领取</el-button>
          </el-form-item>
        </el-form>

        <!-- <el-form :label-position="pos" class="table1">
            <el-form-item style="border:1px solid #eee"></el-form-item></el-form-item>
          <el-form-item label="编号: ">00000001</el-form-item>

          <el-form-item label="姓名: " class="input">Alan</el-form-item>

          <el-form-item label="联系方式: ">136xxxx7646</el-form-item>

          <el-form-item label="行李件数: " class="input">1</el-form-item>

          <el-form-item label="行李描述: ">黑色大箱子</el-form-item>
          <el-form-item label="寄存时间: ">2019-11-20</el-form-item>
          <el-form-item label="预取时间: ">2019-11-28</el-form-item>
           <el-form-item label="寄存人: ">Alan</el-form-item>

          <el-form-item>
            <p></p>
            <el-button type="primary">修 改</el-button>
            <el-button type="primary" @click="dialogFormVisible = true">领取</el-button>
          </el-form-item>
        </el-form> -->
      </el-card>
      <el-dialog title="修改订单信息" :visible.sync="dialogFormVisible">
        <el-steps :active="active" finish-status="success">
          <el-step title="核对信息"></el-step>
          <el-step title="激活标签"></el-step>
          <el-step title="领取行李"></el-step>
        </el-steps>

        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      active: 0
    };
  },

  components: {},

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  }
};
</script>

<style scoped>
.table1 {
  position: relative;
  top: -300px;
  left: 20%;
  height: 100px;
}
</style>
