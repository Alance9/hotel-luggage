<template>
  <el-card class="ca">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>修改行李员信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 提示 -->

    <!-- 选项卡 -->
    <el-card class="card">
      <h2>修改行李员信息</h2>
      <el-form
        class="form"
        :model="pojo"
        :rules="rules"
        ref="pojoForm"
        :label-position="pos"
        label-width="80px"
      >
        <el-form-item label="姓名" class="input" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" class="input" prop="phone">
          <el-input v-model="pojo.phone"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="pojo.sex">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="密码" class="input">
          <el-input v-model="pojo.pass"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addOrder('pojoForm')"
            >确定修改</el-button
          >
          <el-button type="info">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-card>
</template>

<script>
import { add } from "../../api/addOrder";
export default {
  data() {
    return {
      active: 1,
      radio: "男",
      num: 1,
      pos: "right",
      reDate: "",
      pojo: {
        name: "",
        sex: "",
        phone: "",
        num: "",
        detail: "",
        dedate: "",
        redate: ""
      },
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        phone: [
          { required: true, message: "联系方式不能为空", trigger: "blur" }
        ],
        redate: [
          { required: true, message: "领取日期不能为空", trigger: "change" }
        ]
      }
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    addOrder(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("修改行李员信息");
          add(this.pojo).then(Response => {
            const resp = Response.data;
            if (resp.flag) {
              this.$router.push("/home/memDetails");
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

</style>
