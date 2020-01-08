<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>行李员管理</el-breadcrumb-item>
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
          <el-input
            v-model="searchMap.name"
            placeholder="行李员名字"
          ></el-input>
        </el-form-item>

        <el-form-item prop="phone">
          <el-input v-model="searchMap.phone" placeholder="联系方式"></el-input>
        </el-form-item>

        <el-form-item prop="type" style="width: 100px">
          <el-select v-model="searchMap.type" placeholder="性别">
            <el-option
              v-for="option in orderType"
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

      <!-- 列表 -->

      <el-table :data="list" style="width: 100%" height="480" border>
        <el-table-column type="index" label="序号">
        </el-table-column>

        <el-table-column prop="memberNum" label="编号">
        </el-table-column>

        <el-table-column prop="name" label="行李员姓名">
        </el-table-column>

        <el-table-column prop="phone" label="联系号码">
        </el-table-column>

        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex | orderTypeFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="pass" label="账号">
        </el-table-column>

        <el-table-column prop="pass" label="密码">
        </el-table-column>
         <el-table-column label="状态">在职
        </el-table-column>

        <el-table-column label="操作">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="reviseMem"
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
    </el-card>
  </div>
  <!-- handleSizeChange -- 每页显示条数变化 触发 -->
  <!-- handleCurrentChange -- 当前页改变 触发 -->
  <!-- currentpage -- 设置当前页数 -->
  <!-- pagesize -- sizepage的数组 -->
</template>

<script>
import memberApi from "../../api/member";
//订单状态
const orderType = [{ type: "1", name: "男" }, { type: "0", name: "女" }];
export default {
  data() {
    return {
      list: [],
      orderType: orderType, //订单状态
      bt: orderType.type,

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
    this.getOrderList();
  },

  methods: {
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
      memberApi
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
      this.$router.push("/home/deposit");
    },

    reviseMem() {
      this.$router.push("/home/memRevise");
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

</style>
