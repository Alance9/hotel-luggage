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
          <!-- <el-radio-group v-model="depList.gender">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
          </el-radio-group> -->
          <el-input v-model="depList.gender" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="行李件数" prop="number">
          <!-- <el-input-number v-model="depList.number" :min="1" :max="100"></el-input-number> -->
          <el-input v-model="depList.number" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="行李描述" prop="luggagedescribe">
          <el-input type="textarea" v-model="depList.luggagedescribe"></el-input>
        </el-form-item>

        <el-form-item label="预取日期" prop="saveforetime">
          <el-input v-model="depList.saveforetime" style="width:300px"></el-input>
          <!-- <el-date-picker
            v-model="depList.saveforetime"
            type="date"
            placeholder="选择预取日期"
            align="right"
            value-format="yyyy-MM-dd"
            style="width:300px"
          ></el-date-picker> -->
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
      <!-- <h3>领取行李</h3>
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
          <el-button type="primary" style="width:330px" @click="findOrder('recForm')">领取</el-button>
        </el-form-item>
      </el-form> -->
    </el-card>

    <el-card class="rec-card" shadow="hover" style="height: 400px;">
      <!-- style="height: 830px;" -->
      <!-- <h4 style="margin-top: -10px">最近订单状况</h4>
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
      <a href="/#/records/">查看更多订单记录 >></a> -->
    </el-card>
    <!-- <el-dialog title="查看订单信息" :visible.sync="dialogForm3Visible" class="rec1_dig">
      <el-form class="rec1_form" :model="form" :label-position="pos" label-width="40px">
        <el-form-item label="编号" :label-width="formLabelWidth">00000001</el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="行李件数" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="行李描述" :label-width="formLabelWidth"></el-form-item>

        <el-form-item label="预取日期" :label-width="formLabelWidth"></el-form-item>
        <el-form-item style="display:inline;">
          <el-col :span="10" :label-width="formLabelWidth" style="margin-left:-40px">寄存天数：</el-col>
          <el-col :span="10">状态：</el-col>
        </el-form-item>
        <el-form-item style="display:inline">
          <el-col :span="10" :label-width="formLabelWidth" style="margin-left:-40px">寄存人员：</el-col>
          <el-col :span="10">领取人员：</el-col>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogForm3Visible = false">关 闭</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
// import { add1 } from "../../api/addOrder";
import { add } from "../../api/order";
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
      dialogForm3Visible: false,
      pojo: {
        savername: "",
        gender: "",
        phonenumber: "",
        number: "",
        luggagedescribe: "",
        savetime: new Date(),
        saveforetime: "",
        hotel: "",
        recievername: "",
        location: "",
        tag: "",
        picture: null
      },
      depList: {
        savername: "",
        gender: "",
        phonenumber: "",
        recievername: JSON.parse(localStorage.getItem("myview-user")).username,
        hotel: "",
        luggagedescribe: "",
        saveforetime: "",
        number: "",
        location: "",
        tag: ""
      },
      rec: {
        sid: ""
      },
      tableData: [
        {
          name: "王小虎",
          phone: "13613797431",
          num: 1,
          des_p: "张晓",
          static: "未领取"
        },
        {
          name: "王小虎",
          phone: "13613797431",
          num: 2,
          des_p: "张晓",
          static: "未领取"
        },
        {
          name: "王小虎",
          phone: "13613797431",
          num: 3,
          des_p: "张晓",
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

  methods: {
    /* findOrder(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("查找订单");
          add(this.pojo).then(Response => {
            const resp = Response.data;
            console.log(resp.data);
            if (resp.flag) {
              this.$message({
                showClose: true,
                message: "查找订单失败！",
                type: "error"
              });

              // this.$router.push("/orderDetails");
            } else {
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    }, */
    addOrder(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("添加订单");
          add(this.depList).then(Response => {
            console.log("1")
            const resp = Response.data;
            console.log(resp.data);
            if (status == 200) {
              this.$message({
                showClose: true,
                message: "创建订单成功！",
                type: "success"
              });

              // this.$router.push("/orderDetails");
            } else {
              this.$message({
                message: resp.message,
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
