<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>行李员信息</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row class="admin-c">
        <el-col :span="8" class="img-c">
          <el-avatar
            :size="200"
            src="https://ww3.sinaimg.cn/mw690/df9c5e95gw1f8xapkiwdlj20j60eeae1.jpg"
          ></el-avatar>

          <h1 class="title-c">{{ user.name }}</h1>
        </el-col>

        <el-col :span="2" class="line-c"> </el-col>

        <el-col :span="12" class="form-c">
          <el-form :label-position="pos">
            <el-form-item label="编号: ">
              00000001
            </el-form-item>

            <el-form-item label="姓名: " class="input" prop="name">
              mmm
            </el-form-item>

            <el-form-item label="性别: ">
              女
            </el-form-item>

            <el-form-item label="联系方式: " class="input">
              136xxxx7646
            </el-form-item>

            <el-form-item label="身份: ">
              行李员
            </el-form-item>

            <el-form-item>
              <p></p>
              <el-button type="primary" style="width: 200px" @click="memRevise"
                >修改信息</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("myview-user")),
      pos: "left"
    };
  },
  methods: {
    memRevise() {
      this.$router.push("/home/memRevise");
    }
  }
};
</script>
<style>
.admin-c {
  margin-left: 100px;
}
.img-c {
  margin: 70px 0 150px 30px;
  height: 200px;
  width: 200px;
}
.title-c {
  text-align: center;
  height: 80px;
  font-size: 30px;
}
.line-c {
  border-left: 1px solid #31c17b;
  margin-top: 50px;
  margin-left: 80px;
  height: 380px;
}
.form-c {
  margin: 50px 0 160px 50px;
}
</style>
