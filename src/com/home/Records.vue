<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>历史记录</el-breadcrumb-item>
        <el-breadcrumb-item>全部</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 搜索 -->
      <!-- :inline="true" 表单一行显示 -->
      <el-form
        ref="searchForm"
        :inline="true"
        :model="searchMap"
        style="margin-top: 20px"
      >
        <!-- 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效 -->
        <el-form-item prop="name">
          <el-input v-model="searchMap.name" placeholder="客户名字" style="width: 120px"></el-input>
        </el-form-item>

        <el-form-item prop="name">
          <el-input v-model="searchMap.name" placeholder="行李员名字"  style="width: 120px"></el-input>
        </el-form-item>

        <el-form-item prop="phone">
          <el-input v-model="searchMap.phone" placeholder="联系方式"></el-input>
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

        <el-form-item prop="dedate" >
          <!-- value-format 是指定绑定值的格式 -->
          <el-date-picker
            style="width: 150px"
            value-format="yyyy-MM-dd"
            v-model="searchMap.dedate"
            type="date"
            placeholder="寄存时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-select v-model="value" placeholder="全部" style="width:100px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
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

          <el-button type="primary" @click="importData" plain 
            >批量导入</el-button
          >

          
        </el-form-item>

        
      </el-form>

      <!-- 列表 -->

      <el-table :data="list" style="width: 100%" height="480" border
        @selection-change="handleSelectionChange"
      >

        <el-table-column type="index" label="序号">
        </el-table-column>

        <el-table-column prop="orderNum" label="订单编号">
        </el-table-column>

        <el-table-column prop="name" label="姓名"> </el-table-column>

        <el-table-column prop="name" label="性别" width="60">
          <template slot-scope="scope">
            <label  v-if="scope.row.type === '0'"> 男</label>
            <label  v-if="scope.row.type === '1'"> 女</label>
            </el-button>
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="联系号码" width="120px">
        </el-table-column>

        <el-table-column prop="num" label="行李件数">
        </el-table-column>

        <el-table-column prop="dedate" label="寄存日期" width="100px"></el-table-column>

        <el-table-column prop="rdate" label="领取日期" width="100px">
          <template slot-scope="scope">
            <label  v-if="scope.row.type === '0'"> 无</label>
            <label  v-if="scope.row.type === '1'"> 2019-11-28</label>
            </el-button>
          </template>
        </el-table-column>

        <el-table-column prop="redate" label="寄存天数"> </el-table-column>

        <el-table-column prop="dname" label="寄存人" > </el-table-column>
        <el-table-column prop="rname" label="领取人" > 
          <template slot-scope="scope">
            <label  v-if="scope.row.type === '0'"> 无</label>
            <label  v-if="scope.row.type === '1'"> {{user.name}}</label>
            </el-button>
          </template>
        </el-table-column>

        <el-table-column prop="type" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.type | orderTypeFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button
              type="primary"
              v-if="scope.row.type === '0'"
              icon="el-icon-edit"
              circle
              @click="dialogFormVisible = true"
            >
            </el-button>

            <el-button
              type="info"
              v-if="scope.row.type === '1'"
              icon="el-icon-check"
              circle
            >
            </el-button>

            <el-button
              type="primary"
              v-if="scope.row.type === '0'"
              icon="el-icon-bell"
              plain
            >
            </el-button>
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
      >
      </el-pagination>

      <el-dialog title="修改订单信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="id" :label-width="formLabelWidth">
            00000001
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="行李描述" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <!-- 导入 -->
    <el-dialog title="导入" :visible.sync="dialogImportVisible" :modal-append-to-body="false" :close-on-click-modal="false" class="dialog-import">
      <div :class="{'import-content': importFlag === 1, 'hide-dialog': importFlag !== 1}">
        <el-upload class="upload-demo"
        :action="importUrl"
        :name ="name"
        :headers="importHeaders"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :on-error="uploadFail"
        :on-success="uploadSuccess"
        :file-list="fileList"
        :with-credentials="withCredentials">
        <!-- 是否支持发送cookie信息 -->
          <el-button size="small" type="primary" :disabled="processing">{{uploadTip}}</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
        </el-upload>
        <div class="download-template">
          <a class="btn-download" @click="download">
            <i class="icon-download"></i>下载模板</a>
        </div>
      </div>
      <div :class="{'import-failure': importFlag === 2, 'hide-dialog': importFlag !== 2}" >
        <div class="failure-tips">
          <i class="el-icon-warning"></i>导入失败</div>
        <div class="failure-reason">
          <h4>失败原因</h4>
          <ul>
            <li v-for="(error,index) in errorResults" :key="index">第{{error.rowIdx + 1}}行，错误：{{error.column}},{{error.value}},{{error.errorInfo}}</li>
          </ul>
        </div>
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
import orderApi from "../../api/order";
//订单状态
const orderType = [
  { type: "0", name: "未领取" },
  { type: "1", name: "已领取" }
];
export default {
  data() {
    return {
      list: [],
      List: [],
      orderType: orderType, //订单状态
      bt: orderType.type,
       user: JSON.parse(localStorage.getItem("myview-user")),

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
      form: {
        name: ""
      },
      formLabelWidth: "120px",

      multipleSelection: [],
    };
  },

  created() {
    //初始化列表
    this.getOrderList();
  },

  methods: {

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

    getOrderList() {
      /* orderApi.getList().then(Response =>{
                const resp = Response.data
                this.list = resp.data
                //this.total = resp.data.total
            }) */
      orderApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(Response => {
          const resp = Response.data;
          this.list = resp.data.rows;
          this.total = resp.data.total;
        });
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
</style>
