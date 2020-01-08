<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row class="admin-c">
        <el-col :span="7" class="img-c">
          <el-avatar
            :size="200"
            src="https://ww3.sinaimg.cn/mw690/df9c5e95gw1f8xapkiwdlj20j60eeae1.jpg"
          ></el-avatar>

          <h1 class="title-c">{{ user.name }}</h1>
        </el-col>

        <el-col :span="1" class="line-c"> </el-col>

        <el-col :span="12" class="form-c">
          <el-form :label-position="pos">
            <el-form-item label="编号: ">
              00000001
            </el-form-item>

            <el-form-item label="姓名: " class="input" prop="name">
              {{ user.name }}
            </el-form-item>

            <el-form-item label="性别: ">
              女
            </el-form-item>

            <el-form-item label="联系方式: " class="input">
              136xxxx7646
            </el-form-item>

            <el-form-item label="身份: ">
              管理员
            </el-form-item>

            <el-form-item>
              <p></p>
              <el-button type="primary" style="width: 200px">修改信息</el-button><p></p>
              <el-button type="primary" style="width: 200px">修改信息</el-button><p></p>
              <el-button type="primary" style="width: 200px">退出登录</el-button>
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
  methods: {}
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
  position: relative;
  font-size: 30px;
  margin-top: 30px;
  margin-right: 120px;
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
