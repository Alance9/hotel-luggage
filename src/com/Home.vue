<template>
  <div id="name">
    <el-container class="container">
      <el-header class="header">
        <el-button
          class="el-icon-copy-document"
          @click="isC"
          style="background-color: #d3dce6;margin-left:-5px"
          circle
        ></el-button>
        <span class="left">
          <img src="../assets/lug3.png" />
          智能酒店行李管理系统
        </span>

        <el-dropdown @command="handleC">
          <span style="color:white;  font-size: 17px;">
            {{ user.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-container>
        <el-aside width="auto" class="aside">
          <el-menu
            :collapse="isCollapse"
            class="el-menu-vertical"
            :router="true"
            :default-active="$route.path"
          >
            <el-menu-item index="/index">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-menu-item index="/deposit/">
              <i class="el-icon-first-aid-kit"></i>
              <span slot="title">存取行李</span>
            </el-menu-item>

            <!-- <el-menu-item index="/receive/">
              <i class="el-icon-suitcase"></i>
              <span slot="title">领取行李</span>
            </el-menu-item>-->

            <el-menu-item index="/records/">
              <i class="el-icon-folder-opened"></i>
              <span slot="title">订单记录</span>
            </el-menu-item>

            <el-menu-item index="/person/">
              <i class="el-icon-user"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>

            <el-menu-item index="/member/" v-if="user.right > 1">
              <!--  -->
              <i class="el-icon-user-solid"></i>
              <span slot="title">行李员列表</span>
            </el-menu-item>

            <el-menu-item index="/admin/" v-if="user.right > 2">
              <!--  -->
              <i class="el-icon-s-custom"></i>
              <span slot="title">管理员列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>

      <!-- 修改密码 -->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
        <el-form
          :model="form"
          status-icon
          :rules="rules"
          ref="form"
          label-width="100px"
          style="width: 300px"
        >
          <!-- status-icon 输入框反馈图标 -->
          <el-form-item label="原密码" prop="old">
            <el-input type="password" v-model="form.old" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="check">
            <el-input type="password" v-model="form.check" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="width:300px">
            <el-button type="primary" @click="submitPass('form')">确 定</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import { loginout, newPass } from "../api/login";
// import pwdApi from "../api/pwd";
export default {
  name: "app",
  data() {
    // 注意:在 return 上面,而上面不能使用 逗号 , 结束

    //自定义校验
    const validateOld = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("原密码不能为空"));
      } else {
        callback();
      }
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
      isCollapse: false,
      user: JSON.parse(localStorage.getItem("myview-user")),
      dialogFormVisible: false,
      form: {
        old: "",
        pass: "",
        check: ""
      },
      rules: {
        old: [{ validator: validateOld, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        check: [{ validator: validateCheck, trigger: "change" }]
      }
    };
  },
  methods: {
    isC() {
      this.isCollapse = !this.isCollapse;
    },

    handleC(command) {
      switch (command) {
        case "a":
          this.handlePWD();
          break;
        case "b":
          this.handleLogout();
          break;
        default:
          break;
      }
    },

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

    handlePWD() {
      this.dialogFormVisible = true;
      /* 取消后清空表单 */
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    },
    submitPass(formName) {
      this.$refs[formName].validate(valid => {
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
#name {
  height: 100%;
}

/* margin: -9px -4px -35px -9px; */ /* 上 右 下 左 */

.el-menu-vertical:not(.el-menu--collapse) {
  width: 140px;
}

.container {
  height: 100%;
  overflow-x: hidden;
}
.header {
  background-color: #545c64;
}
.aside {
  background-color: #d3dce6;
}
.left {
  line-height: 55px;
  text-align: left;
  color: aliceblue;
  font-size: 18px;
  margin-left: 30px;
}
.left img {
  height: 38px;
  width: 38px;
  margin-bottom: -12px;
}
/* 下拉菜单  */
.el-dropdown {
  float: right;
  margin-right: 10px;
  cursor: pointer;
  line-height: 55px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
.main {
  background-color: #e9eef3;
}
.records {
  text-decoration: none;
  color: black;
}

.el-menu-item span {
  font-size: 16px;
  font-size: 14px;
}
</style>
