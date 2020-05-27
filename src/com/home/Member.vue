<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>行李员列表</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>全部</el-breadcrumb-item> -->
      </el-breadcrumb>
    </el-card>

    <el-card style="margin-top: 10px">
      <!-- 搜索 -->
      <!-- :inline="true" 表单一行显示 -->
      <el-form
        ref="searchForm"
        :inline="true"
        :model="searchMap"
        style="float:right;"
      >
        <!-- 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效 -->
        <el-form-item prop="name">
          <el-input
            v-model="searchMap.name"
            placeholder="行李员名字"
          ></el-input>
        </el-form-item>

        <el-form-item prop="phone">
          <el-input v-model="searchMap.phone" placeholder="联系方式"></el-input>
        </el-form-item>

        <!-- <el-form-item prop="type" style="width: 100px">
          <el-select v-model="searchMap.type" placeholder="性别">
            <el-option
              v-for="option in orderType"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item prop="type" style="width: 100px">
          <el-select v-model="searchMap.type" placeholder="状态">
            <el-option
              v-for="option in staticType"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getOrderList" icon="el-icon-search"
            >查询</el-button
          >
          <el-button @click="resetForm('searchForm')" icon="el-icon-delete"
            >重置</el-button
          >

          <el-button type="primary" @click="handleAdd" plain icon="el-icon-plus"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 10px">
      <!-- 列表 -->
      <el-table
        :data="
          memList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
        height="420"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" label="序号"></el-table-column>

        <!-- <el-table-column prop="memberNum" label="编号"> </el-table-column> -->

        <el-table-column prop="username" label="行李员姓名">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>

        <el-table-column prop="phonenumber" label="联系号码">
          <template slot-scope="scope">{{ scope.row.phonenumber }}</template>
        </el-table-column>

        <el-table-column prop="hotel" label="酒店">
          <template slot-scope="scope">{{ scope.row.hotel }}</template>
        </el-table-column>

        <!--        <el-table-column prop="sex" label="性别">-->
        <!--          <template slot-scope="scope">-->
        <!--            <span>{{ scope.row.sex | orderTypeFilter }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column prop="userloginname" label="账号">
          <template slot-scope="scope">{{ scope.row.userloginname }}</template>
        </el-table-column>

        <!-- <el-table-column prop="password" label="密码">
          <template slot-scope="scope">{{ scope.row.password }}</template>
        </el-table-column> -->
        <el-table-column prop="state" label="是否登录">
          <template slot-scope="scope">{{
            scope.row.loginstate === 1 ? "是" : "否"
          }}</template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">{{
            scope.row.state === 1 ? "在职" : "离职"
          }}</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleDetail(scope.row)"
              plain
              size="small"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 修改信息 -->
    <el-dialog
      title="修改行李员信息"
      :visible.sync="dialogFormVisible"
      width="400px"
    >
      <el-form
        :model="form"
        status-icon
        ref="form"
        label-width="100px"
        style="width: 300px"
      >
        <el-form-item label="工号">{{ form.id }}</el-form-item>
        <!-- status-icon 输入框反馈图标 -->
        <el-form-item label="姓名" prop="old">
          <el-input
            type="input"
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!--        <el-form-item label="性别">-->
        <!--          <el-radio-group v-model="form.gender">-->
        <!--            <el-radio-button label="男"></el-radio-button>-->
        <!--            <el-radio-button label="女"></el-radio-button>-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->
        <el-form-item label="联系方式" prop="phone">
          <el-input
            type="input"
            v-model="form.phonenumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="userloginname">
          <el-input
            type="input"
            v-model="form.userloginname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="input"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="酒店" prop="hotel">
          <el-input
            type="input"
            v-model="form.hotel"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.state">
            <el-radio-button label="1">在职</el-radio-button>
            <el-radio-button label="0">离职</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item style="width:300px">
          <el-button type="primary" @click="submitF('form')">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加信息 -->
    <el-dialog
      title="添加行李员"
      :visible.sync="dialogForm1Visible"
      width="400px"
    >
      <el-form
        :model="formAdd"
        status-icon
        :rules="rules"
        ref="formAdd"
        label-width="100px"
        style="width: 300px"
      >
        <el-form-item label="工号" prop="id">
          <el-input
            type="input"
            v-model="formAdd.id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- status-icon 输入框反馈图标 -->
        <el-form-item label="姓名" prop="username">
          <el-input
            type="input"
            v-model="formAdd.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!--        <el-form-item label="性别">-->
        <!--          <el-radio-group v-model="form.gender">-->
        <!--            <el-radio-button label="男"></el-radio-button>-->
        <!--            <el-radio-button label="女"></el-radio-button>-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->
        <el-form-item label="联系方式" prop="phonenumber">
          <el-input
            type="input"
            v-model="formAdd.phonenumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="userloginname">
          <el-input
            type="input"
            v-model="formAdd.userloginname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="input"
            v-model="formAdd.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input
            type="input"
            v-model="formAdd.password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="酒店" prop="hotel">
          <el-input
            type="input"
            v-model="formAdd.hotel"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="width:300px">
          <el-button type="primary" @click="submitAdd('formAdd')"
            >确 定</el-button
          >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  <!-- handleSizeChange -- 每页显示条数变化 触发 -->
  <!-- handleCurrentChange -- 当前页改变 触发 -->
  <!-- currentpage -- 设置当前页数 -->
  <!-- pagesize -- sizepage的数组 -->
</template>

<script>
import {
  //selectAllSuperUser,
  updateMember,
  addMember,
  selectAllReceiver
} from "../../api/member";
//订单状态
const orderType = [{ type: "1", name: "男" }, { type: "0", name: "女" }];
const staticType = [{ type: "1", name: "在职" }, { type: "0", name: "离职" }];
export default {
  data() {
    return {
      list: [],
      memList: [],
      orderType: orderType, //订单状态
      bt: orderType.type,
      staticType: staticType,
      dialogFormVisible: false,
      dialogForm1Visible: false,
      form: {},
      formAdd: {
        id: "",
        username: "",
        userloginname: "",
        password: "",
        password2: "",
        hotel: "",
        phonenumber: "",
        right: 1 //行李员固定为1
      },
      rules: {},
      total: 0, //分页总记录数
      currentPage: 1, //当前
      pageSize: 10, //每页显示条数

      searchMap: {
        // 条件查询绑定的条件值
        phone: "",
        name: "",
        sex: "",
        pass: ""
      }
    };
  },

  created() {
    //初始化列表
    // this.getOrderList();
    this.getAllSuperUser();
  },

  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "success-row";
      }
    },

    // 条数改变触发
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getOrderList();
    },

    // 页码改变触发
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.getOrderList();
    },

    // 修改页面唤醒
    handleDetail(e) {
      this.dialogFormVisible = true;
      console.log(e);
      this.form = e;
    },
    // 确认修改提交
    submitF(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("修改行李员信息确认提交");
          console.log(this.form);
          let info = {
            username: this.form.username,
            userloginname: this.form.userloginname,
            right: this.form.userright,
            imagebig: this.form.imagebig,
            hotel: this.form.hotel,
            id: this.form.id,
            state: this.form.state,
            phonenumber: this.form.phonenumber
          };
          updateMember(info).then(Response => {
            console.log(Response);
            if (Response.status === 200) {
              this.$message({
                showColse: true,
                type: "success",
                message: "修改行李员信息成功！"
              });
              this.memList = [];
              this.getAllSuperUser();
            } else {
              this.$message({
                showColse: true,
                type: "warning",
                message: Response.msg
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 确认添加行李员
    submitAdd(formName) {
      console.log("a");
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("添加行李员");
          let info = this.formAdd;
          console.log(info);
          addMember(info).then(Response => {
            console.log(Response);
            if (Response.status === 200) {
              this.$message({
                showClose: true,
                type: "success",
                message: "创建行成功！"
              });
              this.memList = [];
              this.getAllSuperUser();
            } else {
              this.$message({
                showClose: true,
                type: "warning",
                message: Response.msg
              });
            }
          });
        } else {
          return false;
        }
      });
    },

    // 获取所有行李员数据
    getAllSuperUser() {
      selectAllReceiver().then(Response => {
        console.log(Response);
        const resp = Response;
        if (resp.status === 200) {
          // for (let i = 0; i < resp.data.length; i++) {
          //   if(resp.data[i].userright !== 2){
          //     console.log(resp.data[i])
          //     resp.data.splice(i,1);
          //     i--;
          //   }
          // }console.log(resp.data.length)
          this.memList = resp.data;
          this.total = resp.data.length;
        } else {
          this.$message({
            showClose: true,
            message: resp.msg,
            type: "warning"
          });
        }
      });
    },

    getOrderList() {
      /* orderApi.getList().then(Response =>{
                const resp = Response.data
                this.list = resp.data
                //this.total = resp.data.total
            }) */
      // memberApi
      //   .search(this.currentPage, this.pageSize, this.searchMap)
      //   .then(Response => {
      //     const resp = Response.data;
      //     this.list = resp.data.rows;
      //     this.total = resp.data.total;
      //   });
    },
    resetForm(formName) {
      console.log("重置", formName);
      // 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效
      this.$refs[formName].resetFields();
    },
    handleAdd() {
      this.dialogForm1Visible = true;
    }
  },

  //过滤器
  filters: {
    orderTypeFilter(type) {
      const oType = orderType.find(obj => obj.type === type);
      return oType ? oType.name : null;
    }
  }
};
</script>
<style></style>
