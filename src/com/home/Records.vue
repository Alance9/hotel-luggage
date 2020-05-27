<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单记录</el-breadcrumb-item>
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
        style="float:right"
      >
        <!-- 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效 -->
        <el-form-item prop="name">
          <el-input
            v-model="searchMap.name"
            placeholder="客户名"
            style="width: 120px"
          ></el-input>
        </el-form-item>

        <el-form-item prop="name">
          <el-input
            v-model="searchMap.name"
            placeholder="行李员"
            style="width: 120px"
          ></el-input>
        </el-form-item>

        <!--         <el-form-item prop="name">
          <el-input
            v-model="searchMap.name"
            placeholder="领取人员"
            style="width: 120px"
          ></el-input>
        </el-form-item>-->

        <el-form-item prop="phone">
          <el-input v-model="searchMap.phone" placeholder="联系方式"></el-input>
        </el-form-item>

        <!-- value-format 是指定绑定值的格式 -->
        <!-- <el-form-item prop="dedate">
          <el-date-picker
            style="width: 150px"
            value-format="yyyy-MM-dd"
            v-model="searchMap.dedate"
            type="date"
            placeholder="寄存时间"
          ></el-date-picker>
        </el-form-item>-->
        <el-form-item prop="type" style="width: 100px">
          <el-select v-model="searchMap.type" placeholder="性别">
            <el-option
              v-for="option in genderType"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="type" style="width: 100px">
          <el-select v-model="searchMap.type" placeholder="状态">
            <el-option
              v-for="option in orderType"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item>
                          <el-select v-model="value" placeholder="全部" style="width:100px">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
        </el-form-item>-->

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

          <!-- <el-button type="primary" @click="importData" plain
                                >批量导入</el-button
          >-->
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 10px">
      <!-- 列表 -->

      <el-table
        :data="
          recList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
        height="420"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号"></el-table-column>

        <!-- <el-table-column prop="orderNum" label="订单编号"></el-table-column> -->

        <el-table-column prop="savername" label="客户姓名">
          <!-- <template slot-scope="scope">
            {{ scope.row.recievername }}
          </template>-->
        </el-table-column>

        <el-table-column prop="savergender" label="性别" width="60">
          <template>
            <!--      slot-scope="scope"      <label v-if="scope.row.type === '0'">男</label>-->
            <!--            <label v-if="scope.row.type === '1'">女</label>-->
            <!--             {{scope.row.sex === 0 ? '男' : '女'}}-->
          </template>
        </el-table-column>

        <el-table-column prop="phonenumber" label="联系号码" width="150px">
          <template>
            <!--        slot-scope="scope"       暂时没看见，后面有了自己放后面-->
            <!--            {{ scope.row. }}-->
          </template>
        </el-table-column>

        <!-- <el-table-column prop="num" label="行李件数"></el-table-column>
        -->
        <el-table-column prop="luggageSavetime" label="寄存日期" width="120px">
          <template slot-scope="scope">{{
            scope.row.luggageSavetime
          }}</template>
        </el-table-column>

        <el-table-column
          prop="luggagesaveforetime"
          label="预取日期"
          width="120px"
        >
          <template slot-scope="scope">{{
            scope.row.luggagesavefortime
          }}</template>
        </el-table-column>

        <el-table-column prop="luggageNumber" label="行李件数" width="120px">
          <template slot-scope="scope">
            <!--                      <label v-if="scope.row.type === '0'">无</label>-->
            <!--                      <label v-if="scope.row.type === '1'">2019-11-28</label>-->
            {{ scope.row.luggageNumber }}件
          </template>
        </el-table-column>

        <el-table-column prop="messagesendstate" label="短信验证">
          <template slot-scope="scope">
            <label v-if="scope.row.messagesendstate === 0">未发送</label>
            <label v-if="scope.row.messagesendstate === 1">已发送</label>
            <!-- {{ scope.row.messagesendstate }} -->
          </template>
        </el-table-column>

        <el-table-column prop="luggagegetcodee" label="取件码">
          <template slot-scope="scope">{{ scope.row.luggagegetcode }}</template>
        </el-table-column>

        <el-table-column prop="recievername" label="行李员">
          <template slot-scope="scope">
            {{
              scope.row.recievername === null || ""
                ? "无"
                : scope.row.recievername
            }}
          </template>
        </el-table-column>
        <!--        <el-table-column prop="rname" label="领取人员">-->
        <!--          <template slot-scope="scope">-->
        <!--            <label v-if="scope.row.type === '0'">无</label>-->
        <!--            <label v-if="scope.row.type === '1'">{{ user.name }}</label>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column prop="luggageistoken" label="状态">
          <template slot-scope="scope">
            <!--            <span>{{ scope.row.type | orderTypeFilter }}</span>-->
            <label v-if="scope.row.luggageistoken === 0">未领取</label>
            <label v-if="scope.row.luggageistoken === 1">已领取</label>
            <!-- {{ scope.row.luggageistoken }} -->
          </template>
        </el-table-column>

        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editOrder(scope.row)"
              size="small"
              v-if="scope.row.luggageistoken === 0"
            ></el-button>

            <el-button
              type="info"
              icon="el-icon-check"
              circle
              @click="open"
              size="small"
              v-if="scope.row.luggageistoken === 1"
            ></el-button>

            <el-button
              type="info"
              icon="el-icon-view"
              size="small"
              @click="viewOrder(scope.row)"
              plain
              v-if="scope.row.luggageistoken === 1"
            ></el-button>

            <el-button
              type="primary"
              icon="el-icon-bell"
              plain
              @click="recieveOrder(scope.row.luggagegetcode)"
              size="small"
              v-if="scope.row.luggageistoken === 0"
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

      <!-- 领取 -->
      <!-- <el-dialog title="是否领取该行李?" :visible.sync="dialogForm1Visible">
        <div slot="footer">
          <el-button type="primary" @click="">领取</el-button>
          <el-button @click="dialogForm1Visible = false">取 消</el-button>
        </div>
      </el-dialog>-->

      <!-- 修改订单信息 -->
      <el-dialog
        title="修改订单信息"
        :visible.sync="dialogFormVisible"
        class="red_dig"
      >
        <el-form
          class="red_form"
          :model="form"
          :label-position="pos"
          ref="editForm"
          label-width="40px"
        >
          <!-- <el-form-item label="编号" :label-width="formLabelWidth"
            >{{ form.orderid }}
          </el-form-item>-->
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input
              v-model="form.recievername"
              autocomplete="off"
              style="width:300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio-group v-model="form.savergender">
              <!--                暂无数据-->
              <el-radio-button label="男"></el-radio-button>
              <el-radio-button label="女"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="行李件数" :label-width="formLabelWidth">
            <!--                暂无数据-->
            <el-input-number
              :min="1"
              :max="100"
              v-model="form.luggageNumber"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <!--                暂无数据-->
            <el-input
              autocomplete="off"
              style="width:300px"
              v-model="form.phonenumber"
            ></el-input>
          </el-form-item>
          <el-form-item label="行李描述" :label-width="formLabelWidth">
            <!--                暂无数据-->
            <el-input
              type="textarea"
              v-model="form.luggageDescribe"
              autocomplete="off"
              style="width:300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="预取日期" :label-width="formLabelWidth">
            <el-date-picker
              type="date"
              placeholder="选择预取日期"
              align="right"
              value-format="yyyy-MM-dd"
              style="width:300px"
              v-model="form.luggagesavefortime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item style="display:inline">
            <el-col
              :span="10"
              :label-width="formLabelWidth"
              style="margin-left:-40px"
              >行李员：{{ form.recievername }}</el-col
            >
            <!--              暂无数据-->
            <el-col :span="10" v-if="form.luggageistoken == 1"
              >状态：已领取</el-col
            >
            <el-col :span="10" v-else>状态：未领取</el-col>
          </el-form-item>
          <el-form-item style="margin-left:-40px">
            <el-row>寄存时间：{{ form.luggageSavetime }}</el-row>
            <!--              暂无数据-->
            <el-row v-if="form.luggagegettime"
              >领取时间：{{ form.luggagegettime }}</el-row
            >
            <el-row v-else>领取时间：未知</el-row>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="submit('editForm')">确 定</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </el-form-item>-->
        </el-form>
        <div slot="footer" style="margin-top:-30px">
          <el-button type="primary" @click="submit('editForm')"
            >确 定</el-button
          >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 查看订单信息 -->
      <el-dialog title="查看订单信息" :visible.sync="dialogForm3Visible">
        <el-form
          :model="form"
          :label-position="pos"
          ref="viewForm"
          label-width="40px"
        >
          <!-- <el-form-item label="编号" :label-width="formLabelWidth">00000001</el-form-item> -->
          <el-form-item style="margin-left:-40px;margin-top:-20px">
            <el-row>姓名：{{ form.savername }}</el-row>
            <el-row>性别：{{ form.savergender }}</el-row>
            <el-row>联系方式：{{ form.phonenumber }}</el-row>
            <el-row>验证码：{{ form.luggagegetcode }}</el-row>
            <el-row v-if="form.messagesendstate">短信状态：已发送</el-row>
            <el-row v-else>短信状态：未发送</el-row>

            <el-row>行李件数：{{ form.luggageNumber }}</el-row>
            <el-row>行李描述：{{ form.luggageDescribe }}</el-row>
            <el-row>行李位置：{{ form.luggageLocation }}</el-row>
            <el-row>行李标签：{{ form.luggageTag }}</el-row>
            <el-row>酒店：{{ form.luggagehotel }}</el-row>
            <el-row v-if="form.luggageistoken">状态：已领取</el-row>
            <el-row v-else>状态：未领取</el-row>
          </el-form-item>

          <el-form-item style="margin-left:-40px">
            <el-row>寄存时间：{{ form.luggageSavetime }}</el-row>
            <el-row>预取时间：{{ form.luggagesavefortime }}</el-row>
            <el-row v-if="form.luggagegettime"
              >领取时间：{{ form.luggagegettime }}</el-row
            >
            <el-row v-else>领取时间：未知</el-row>
            <el-row>寄存者：{{ form.recievername }}</el-row>
            <el-row>领取者：{{ form.givername }}</el-row>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="dialogForm3Visible = false"
            >关 闭</el-button
          >
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogForm2Visible">
        <el-steps :active="active" finish-status="success">
          <el-step title="核对信息"></el-step>
          <el-step title="激活标签"></el-step>
          <el-step title="领取完成"></el-step>
        </el-steps>
        <div slot="footer">
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
          <el-button style="margin-top: 12px;" @click="finish">完成</el-button>
        </div>
      </el-dialog>

      <!-- 导出 -->
    </el-card>
  </div>
  <!-- handleSizeChange -- 每页显示条数变化 触发 -->
  <!-- handleCurrentChange -- 当前页改变 触发 -->
  <!-- currentpage -- 设置当前页数 -->
  <!-- pagesize -- sizepage的数组 -->
</template>

<script>
import { SelectAllOrder, getluggage } from "../../api/order";
//订单状态
const orderType = [
  { luggageistoken: "0", name: "未领取" },
  { luggageistoken: "1", name: "已领取" }
];
const genderType = [{ type: "1", name: "男" }, { type: "0", name: "女" }];
export default {
  data() {
    return {
      pos: "left",
      list: [],
      List: [],
      recList: [],

      // 原来出错卡死的原因
      // recList: {
      //   orderid: "",
      //   savername: "",
      //   saverphonenumber: "",
      //   recievername: "",
      //   luggagehotel: "",
      //   luggagesavetime: "",
      //   luggagesaveforetime: "",
      //   luggagegettime: "",
      //   messagesendstate: "",
      //   luggagegetcode: "",
      //   luggageistoken: "",
      //   luggagedecribe: ""
      // },
      orderType: orderType, //订单状态
      genderType: genderType,
      bt: orderType.type,
      user: JSON.parse(localStorage.getItem("myview-user")),
      active: 1,

      total: 0, //分页总记录数
      currentPage: 1, //当前
      pageSize: 10, //每页显示条数

      searchMap: {
        // 条件查询绑定的条件值
        phone: "",
        name: "",
        type: "",
        dedate: "",
        xp: ""
      },

      dialogFormVisible: false,
      dialogForm1Visible: false,
      dialogForm2Visible: false,
      dialogForm3Visible: false,
      form: {},
      formLabelWidth: "120px",

      multipleSelection: []
    };
  },

  created() {
    // 获取所有订单消息
    this.getAllOrder();
    //初始化列表
    this.getOrderList();
  },

  methods: {
    tableRowClassName({ rowIndex }) {
      //row,
      if (rowIndex % 2 === 1) {
        return "success-row";
      }
    },

    handleSelectionChange(val) {
      //复选框选择回填函数,val返回一整行的数据
      this.multipleSelection = val;
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

    // 获取所有订单消息
    getAllOrder() {
      SelectAllOrder().then(Response => {
        const resp = Response.data;
        // console.log(resp);
        if (Response.status === 200) {
          this.recList = resp;
          this.total = resp.length;
        } else {
          this.$message({
            // message: resp.msg,
            type: "warning"
          });
        }
      });
    },

    // 修改订单唤醒界面 回显
    editOrder(e) {
      console.log(e);

      this.dialogFormVisible = true;
      this.form = e;

      console.log(this.form);
    },

    //查看订单
    viewOrder(e) {
      console.log(e);

      this.dialogForm3Visible = true;
      this.form = e;

      console.log(this.form);
    },

    // 确认修改提交功能
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("修改订单提交功能");
          let info = this.form;
          console.log(info);
          // updateOrder(info).then(Response => {
          //   console.log(Response)
          // })
        } else {
          return false;
        }
      });
    },

    getOrderList() {
      /* orderApi.getList().then(Response =>{
                    const resp = Response.data
                    this.list = resp.data
                    //this.total = resp.data.total
                }) */
      // orderApi
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
      this.$router.push("/deposit");
    },

    reviseOrder() {
      this.$router.push("/home/orderRevise");
    },

    next() {
      if (this.active++ > 2) this.active = 3;
    },
    finish() {
      this.active = 1;
      this.dialogForm2Visible = false;
    },
    close() {
      this.dialogForm2Visible = true;
      this.dialogForm1Visible = false;
    },
    open() {
      this.$message({
        message: "该订单已完成，不支持任何修改操作！",
        type: "warning"
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
<style>
.ser {
  line-height: 80px;
}

.search {
  width: 300px;
}

.page {
  margin-top: 20px;
}

.el-table .success-row {
  background: #f0f7fd;
}

.red_form {
  height: 580px;
  margin-left: 100px;
}

.red_dig {
  display: flex; /* 弹性盒布局 */
  justify-content: center;
  align-items: center;
}
</style>
