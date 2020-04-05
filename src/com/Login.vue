<template>
  <div class="login-wrap">
    <span class="login-left">
      <img src="../assets/lug3.png" />
      <h1 style class="login_t">智能酒店行李管理系统</h1>
    </span>
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="form"
      :rules="rules"
      ref="form"
      status-icon
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="userloginname">
        <el-input v-model="form.userloginname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="sublogin('form')" class="login-btn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { login, getAdminInfo, getUserInfo } from "../api/login"; //, getUserInfo
export default {
  data() {
    var valiname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账户不能为空"));
      } else {
        callback();
      }
    };

    var valipass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      form: {
        userloginname: "",
        password: ""
      },
      rules: {
        userloginname: [{ validator: valiname, trigger: "blur" }],
        password: [{ validator: valipass, trigger: "blur" }]
      }
    };
  },

  methods: {
    sublogin(formName) {
      this.$refs[formName].validate(valid => {
        //console.log(valid)
        // 提交表单给后台进行验证是否正确
        if (valid) {
          //表单是否规范
          login(this.form.userloginname, this.form.password).then(response => {
            //发送表单后，接收验证信息
            const resp = response.data; //响应信息
            console.log(Response);

            //实际接口
            if (resp.status === 200) {
              console.log("ok", resp);
              //验证成功, 通过token去获取用户信息
              localStorage.setItem("myview-token", JSON.stringify(resp.data));
              console.log(resp.data);
              getUserInfo(resp.data).then(response => {
                console.log("userInfo", response);
                const adminRes = response.data; //用户信息
                if (response.status === 200) {
                  // 获取到了用户的数据
                  console.log("userInfo", adminRes.data);
                  // 1. 保存 token ，用户信息
                  localStorage.setItem(
                    "myview-user",
                    JSON.stringify(adminRes.data)
                  );

                  //console.log(this.$store.state.state);
                  //this.$store.commit('setRole',adminRes.data.state)
                  //console.log(this.$store.state.state);
                  //localStorage.setItem("myview-roles", JSON.stringify(adminRes.data.roles));
                  // 前往首页
                  this.$router.push("/index");
                  this.$message({
                    message: resp.message,
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: adminRes.message,
                    type: "warning"
                  });
                }
              });
            }

            // 测试接口
            /* if (resp.flag) {
              // 验证成功, 通过token去获取用户信息

              getAdminInfo(resp.data.token).then(response => {
                const adminRes = response.data; //用户信息
                if (adminRes.flag) {
                  // 获取到了用户的数据
                  console.log("userInfo", adminRes.data);
                  // 1. 保存 token ，用户信息
                  localStorage.setItem(
                    "myview-user",
                    JSON.stringify(adminRes.data)
                  );
                  //json解析
                  localStorage.setItem("myview-token", resp.data.token);
                  this.$store.commit("setToken", resp.data.token);
                  this.$store.commit("setRole", adminRes.data.roles);
                  console.log(this.$store.state.roles);
                  console.log(this.$store.state.token);
                  //localStorage.setItem("myview-roles", JSON.stringify(adminRes.data.roles));
                  // 前往首页
                  this.$router.push("/index");
                  this.$message({
                    message: resp.message,
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: adminRes.message,
                    type: "warning"
                  });
                }
              }); 
            } */
            else {
              // 未通过，弹出警告
              // alert(resp.message)
              this.$message({
                message: resp.message,
                type: "warning",
                showClose: true,
                center: true
              });
            }
          });
        } else {
          console.log("验证失败");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.login-wrap {
  height: 100%;
  display: flex; /* 弹性盒布局 */
  justify-content: center;
  align-items: center;
  background: url("../assets/wpt.jpg") no-repeat 100% 100%;
  background-color: #303133;
  background-size: cover;
}

.login-wrap .login-form {
  position: absolute;
  width: 330px;
  height: 380px;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  right: 120px;
  bottom: 120px;
}
.login-form h2 {
  text-align: center;
}
.login-form label {
  font-size: 18px;
}
.login-btn {
  width: 100%;
  position: relative;
  top: 20px;
}
.login-left {
  line-height: 55px;
  text-align: left;
  color: aliceblue;
  font-size: 18px;
  position: absolute;
  top: 80px;
  right: 120px;
}
.login-left img {
  height: 50px;
  width: 50px;
  margin-bottom: -12px;
}
.login_t {
  margin-left: 10px;
  display: inline;
}
</style>
