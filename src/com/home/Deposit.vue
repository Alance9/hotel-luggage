<template>
  <div id="dis">
    <el-card class="ca">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>存取行李</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <!-- 提示 -->

    <!-- 选项卡 -->
    <el-card class="des-card" shadow="hover">
      <h3>寄存行李</h3>
      <el-form
        class="des-form"
        :model="depList"
        :rules="rules"
        ref="depForm"
        :label-position="pos"
        label-width="80px"
        status-icon
      >
        <el-form-item label="姓名" class="input" prop="savername">
          <el-input v-model="depList.savername" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" class="input" prop="phonenumber">
          <el-input v-model="depList.phonenumber" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="depList.gender">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
          </el-radio-group>
          <!-- <el-input v-model="depList.gender" style="width:300px"></el-input> -->
        </el-form-item>

        <el-form-item label="行李件数" prop="number">
          <el-input-number v-model="depList.number" :min="1" :max="100"></el-input-number>
          <!-- <el-input v-model="depList.number" style="width:300px"></el-input> -->
        </el-form-item>

        <el-form-item label="行李描述" prop="luggagedescribe">
          <el-input type="textarea" v-model="depList.luggagedescribe"></el-input>
        </el-form-item>

        <el-form-item label="预取日期" prop="saveforetime">
          <!-- <el-input v-model="depList.saveforetime" style="width:300px"></el-input> -->
          <el-date-picker
            v-model="depList.saveforetime"
            type="date"
            placeholder="选择预取日期"
            align="right"
            value-format="yyyy-MM-dd"
            style="width:300px"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="行李位置" prop="location">
          <el-input v-model="depList.location"></el-input>
        </el-form-item>
        <el-form-item label="标签号" prop="tag">
          <el-input v-model="depList.tag"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="addOrder('depForm')"
            style="width: 300px;margin-top:10px"
          >提交</el-button>
          <!-- <el-button type="info" style="width: 100px">取消</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="rec-card" shadow="hover" style="height: 270px;">
      <!-- style="height: 830px;" -->
      <h3>领取行李</h3>
      <el-form
        class="rec-form"
        label-width="120px"
        status-icon
        ref="recForm"
        :model="rec"
        :rules="rules"
      >
        <el-form-item class="input" style="width:450px" prop="sid">
          <el-input placeholder="请输入验证码" v-model="rec.sid"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:330px" @click="findOrder('recForm')">领 取</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="rec-card" shadow="hover" style="height: 400px;">
      <!-- style="height: 830px;" -->
      <h4 style="margin-top: -10px">最近订单状况</h4>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="联系方式" width="150"></el-table-column>
        <el-table-column prop="num" label="行李数"></el-table-column>
        <el-table-column prop="des_p" label="寄存人"></el-table-column>
        <el-table-column prop="static" label="状态"></el-table-column>
        <el-table-column label="操作" width="100">
          <el-button
            type="primary"
            icon="el-icon-view"
            size="small"
            @click="dialogForm3Visible = true"
          >查看</el-button>
        </el-table-column>
      </el-table>
      <p></p>
      <a href="/#/records/">查看更多订单记录 >></a>
    </el-card>

    <!-- 查看订单 -->
    <el-dialog title="查看订单信息" :visible.sync="dialogFormVisible">
      <el-form :model="recList" :label-position="pos" label-width="60px">
        <!-- <el-form-item label="编号" :label-width="formLabelWidth"></el-form-item> -->
        <el-form-item style="margin-left:-40px;margin-top:-30px">
          <el-row>姓名：{{recList.savername}}</el-row>
          <el-row>性别：{{recList.savergender}}</el-row>
          <el-row>联系方式：{{recList.phonenumber}}</el-row>
          <el-row>验证码：{{recList.getcode}}</el-row>
          <el-row v-if="recList.getcode">短信状态：已发送</el-row>
          <el-row v-else>短信状态：未发送</el-row>
       
          <el-row>行李件数：{{recList.number}}</el-row>
          <el-row>行李描述：{{recList.describe}}</el-row>
          <el-row>行李位置：{{recList.location}}</el-row>
          <el-row>行李标签：{{recList.tag}}</el-row>
          <el-row>酒店：{{recList.hotel}}</el-row>
          <el-row v-if="recList.istoken">状态：已领取</el-row>
          <el-row v-else>状态：未领取</el-row>
        </el-form-item>

        <el-form-item style="margin-left:-40px">
          <el-row>寄存时间：{{recList.savetime}}</el-row>
          <el-row>预取时间：{{recList.saveforetime}}</el-row>
          <el-row v-if="recList.gettime">领取时间：{{recList.gettime}}</el-row>
          <el-row v-else>领取时间：未知</el-row>
          <el-row>寄存者：{{recList.receivername}}</el-row>
          <el-row v-if="recList.istoken">领取者：{{recList.giverName}}</el-row>
          <el-row v-else>领取者：暂无</el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" style="margin-top:-30px">
        <el-button type="primary" @click="recieveOrder(recList.getcode)" v-if="!recList.istoken">领 取</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { add1 } from "../../api/addOrder";
import { add, getluggage } from "../../api/order";

export default {
  data() {
    var valisname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
    };
    var valisid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };

    var valiftime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("领取日期不能为空"));
      } else {
        callback();
      }
    };
    return {
      formLabelWidth: "120px",
      active: 1,
      radio: "男",
      num: 1,
      pos: "left",
      reDate: "",
      dialogFormVisible: false,
      // pojo: {
      //   savername: "",
      //   gender: "",
      //   phonenumber: "",
      //   number: "",
      //   luggagedescribe: "",
      //   savetime: new Date(),
      //   saveforetime: "",
      //   hotel: "",
      //   recievername: "",
      //   location: "",
      //   tag: "",
      //   picture: null
      // },
      depList: {
        savername: "",
        gender: "男",
        phonenumber: "",
        recievername: JSON.parse(localStorage.getItem("myview-user")).username,
        hotel: JSON.parse(localStorage.getItem("myview-user")).hotel,
        luggagedescribe: "",
        saveforetime: "",
        number: "",
        location: "",
        tag: ""
      },
      recList: [],
      // {
      //   savername: "",
      //   phonenumber: "",
      //   receivername: "",
      //   savergender: "",
      //   hotel: "",
      //   describe: "",
      //   picture: "",
      //   location: "",
      //   tag: "",
      //   savetime: ""
      // },
      rec: {
        sid: ""
      },
      tableData: [
        {
          name: "zfh",
          phone: "13613797431",
          num: 1,
          des_p: "superuser",
          static: "已领取"
        },
        {
          name: "zfh",
          phone: "13613797431",
          num: 1,
          des_p: "superuser",
          static: "未领取"
        },
        {
          name: "1",
          phone: "13613797431",
          num: 1,
          des_p: "superuser",
          static: "未领取"
        }
      ],

      rules: {
        savername: [{ validator: valisname, trigger: "blur" }],
        sid: [{ validator: valisid, trigger: "blur" }],
        saveforetime: [{ validator: valiftime, trigger: "change" }]
      }
    };
  },

  created() {},

  methods: {
    //查找订单
    findOrder(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let info = {
            getcode: this.rec.sid,
            state: 0,
            giver: ""
          };
          getluggage(info).then(Response => {
            const resp = Response.data;
            this.recList = resp.data;
            this.dialogFormVisible = true;
          });
        } else {
          return false;
        }
      });
    },

    //领取订单
    recieveOrder(code) {
      console.log("领取订单");
      // let localUserInfo = Object.values(window.localStorage)[0];
      // let userInfo = JSON.parse(localUserInfo);
      let info = {
        getcode: code,
        state: 1,
        giver: JSON.parse(localStorage.getItem("myview-user")).username
      };
      console.log(info);
      getluggage(info).then(Response => {
        console.log(Response);
        const resp = Response.data;
        if (resp.status === 200) {
          this.$message({
            showClose: true,
            message: "领取行李成功！",
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
    },

    // 添加订单
    addOrder(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("添加订单");
          console.log(this.depList);

          add(this.depList).then(Response => {
            const resp = Response.data;
            console.log(resp);
            if (resp.status == 200) {
              this.$message({
                showClose: true,
                message: "创建订单成功！验证码为: " + resp.data,
                type: "success"
              });

              // this.$refs[formName].resetFields();
              // this.$router.push("/orderDetails");
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
.dis {
  height: 100%;
}

.ca {
  background-color: #fff;
}

.des-card {
  margin-top: 10px;
  width: 49%;
  float: left;
  display: flex; /* 弹性盒布局 */
  justify-content: center;
  align-items: center;
}

.des-card h3 {
  text-align: center;
}

.rec-card {
  margin-top: 10px;
  width: 50%;
  display: flex; /* 弹性盒布局 */
  justify-content: center;
  align-items: center;
  float: right;
}

.rec-card h3,
h4 {
  text-align: center;
}

.des-form {
  height: 580px;
  border-radius: 10px;
}

.rec-form {
  border-radius: 10px;
  margin-left: -100px;
}

.rec-card a {
  color: #1c8af8;
  text-decoration-line: none;
}

.rec-card a:hover {
  color: #1667b8;
  text-decoration-line: none;
}

.input {
  width: 300px;
}

.rec1_form {
  height: 500px;
  margin-left: 100px;
}

.rec1_dig {
  display: flex; /* 弹性盒布局 */
  justify-content: center;
  align-items: center;
}
</style>
