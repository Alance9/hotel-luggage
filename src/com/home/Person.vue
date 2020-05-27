<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <el-card class="per-card" style="margin-right:5px;width: 30%;">
      <el-row class="admin-c">
        <el-col class="per_img">
          <el-avatar :size="300" :src="avatarUrl.avatarUrl"></el-avatar>
          <h2 class="per_name">{{ user.username }}</h2>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="per-card" style="width: 40%;">
      <el-col :span="12" class="per_form">
        <el-form :label-position="pos">
          <el-form-item label="账号:">{{ user.id }}</el-form-item>

          <el-form-item label="姓名:" class="input" prop="name">{{
            user.username
          }}</el-form-item>

          <!-- <el-form-item label="性别:">女</el-form-item> -->

          <el-form-item label="联系方式:" class="input">{{
            user.phonenumber
          }}</el-form-item>

          <el-form-item label="身份:" v-if="user.right === 3"
            >超级管理员</el-form-item
          >
          <el-form-item label="身份:" v-else-if="user.right === 2"
            >管理员</el-form-item
          >
          <el-form-item label="身份:" v-else>行李员</el-form-item>
        </el-form>
      </el-col>
    </el-card>

    <el-card class="per1-card">
      <el-form style="margin-left:20px">
        <el-form-item>
          <p></p>
          <el-button
            type="primary"
            style="width: 250px;margin-left:-20px;"
            @click="handleDetail"
            >修改信息</el-button
          >
          <p></p>
          <el-button
            type="primary"
            style="width: 250px;margin-left:-20px;"
            @click="handlePWD"
            >修改密码</el-button
          >
          <p></p>
          <el-button
            type="primary"
            style="width: 250px;margin-left:-20px;"
            @click="handleLogout"
            >退出登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 修改信息 -->
    <el-dialog
      title="修改信息"
      :visible.sync="dialogForm1Visible"
      width="400px"
    >
      <el-form
        :model="form1"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        style="width: 300px"
      >
        <!-- status-icon 输入框反馈图标 -->
        <el-form-item label="姓名" prop="old">
          <el-input
            type="input"
            v-model="form1.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别">
          <el-radio-group v-model="form1.gender">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
          </el-radio-group>
        </el-form-item>-->
        <el-form-item label="联系方式" prop="phone">
          <el-input
            type="input"
            v-model="form1.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="width:300px">
          <el-button type="primary" @click="submitF('form')">确 定</el-button>
          <el-button @click="dialogForm1Visible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改密码        status-icon -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        style="width: 300px"
      >
        <!-- status-icon 输入框反馈图标 -->
        <el-form-item label="原密码" prop="old">
          <el-input
            type="password"
            v-model="form.old"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            type="password"
            v-model="form.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="check">
          <el-input
            type="password"
            v-model="form.check"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="width:300px">
          <el-button type="primary" @click="submitPass('form')"
            >确 定</el-button
          >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import pwdApi from "../../api/pwd";
import { loginout, newPass } from "../../api/login";
export default {
  data() {
    //自定义校验
    const validateOld = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("原密码不能为空"));
      } else {
        callback();
      }
      /* setTimeout(() => {
          if (resp.flag) {
            callback();
          } else {
            callback(new Error(resp.message));
          }
        }, 1000); */
    };

    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else {
        callback();
      }
    };

    const validateCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      user: JSON.parse(localStorage.getItem("myview-user")),
      avatarUrl: { avatarUrl: require("../../assets/img.png") },
      pos: "center",
      dialogFormVisible: false,
      dialogForm1Visible: false,
      form: {
        old: "",
        pass: "",
        check: ""
      },
      form1: {
        name: "",
        gender: "",
        phone: ""
      },
      rules: {
        old: [{ validator: validateOld, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        check: [{ validator: validateCheck, trigger: "change" }]
      }
    };
  },
  methods: {
    handleLogout() {
      console.log(JSON.parse(localStorage.getItem("myview-user")).username);
      loginout(localStorage.getItem("myview-name")).then(Response => {
        const resp = Response.data;
        // console.log(resp);
        if (resp.status == 200) {
          //清除本地数据
          localStorage.removeItem("myview-token");
          localStorage.removeItem("myview-user");
          localStorage.removeItem("myview-name");
          this.$store.commit("setRole", "");
          this.$router.push("/login");
          this.$message({
            message: resp.data,
            type: "success",
            duration: 1000 //弹框停留时间
          });
        } else {
          this.$message({
            message: "登出错误",
            type: "error",
            duration: 1000 //弹框停留时间
          });
        }
      });
    },

    handleDetail() {
      this.dialogForm1Visible = true;
      /* 取消后清空表单 */
      this.$nextTick(() => {
        this.$refs["form1"].resetFields();
      });
    },
    handlePWD() {
      this.dialogFormVisible = true;
      /* 取消后清空表单 */
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    },
    submitPass(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log("校验成功");
          let info = {
            userloginname: localStorage.getItem("myview-name"),
            password: this.form.old,
            newpassword: this.form.pass
          };
          console.log(info);
          newPass(info).then(Response => {
            console.log(Response);
            const resp = Response.data;
            if (resp.status === 200) {
              this.$message({
                showClose: true,
                message: "修改密码成功！",
                type: "success"
              });
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.msg,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style>
.admin-c {
  margin-left: 100px;
}
.per_img {
  margin-left: -100px;
  display: flex; /* 弹性盒布局 */
  justify-content: center;
  align-items: center;
  display: block;
}
.per_name {
  display: flex; /* 弹性盒布局 */
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-left: 100px;
}
.per_form {
}
.per-card {
  margin-top: 10px;
  float: left;
  display: flex; /* 弹性盒布局 */
  justify-content: center;
  align-items: center;
  height: 580px;
}
.per1-card {
  margin-top: 10px;
  width: 28%;
  float: left;
  display: flex; /* 弹性盒布局 */
  justify-content: center;
  align-items: center;
  height: 580px;
  margin-left: 1%;
}
</style>
