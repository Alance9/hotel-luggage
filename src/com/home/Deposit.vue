<template>
  <div id="dis">
    <el-card class="ca">
         <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>寄存行李</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 提示 -->

        <!-- 选项卡 -->
        <el-card class="card" shadow="hover">
             <h2>寄存行李</h2>
            <el-form class="form"  
                :model="pojo"
                :rules="rules"
                ref="pojoForm"
                :label-position="pos" label-width="80px" status-icon>

                <el-form-item label="姓名" class="input" prop="savername">
                    <el-input v-model="pojo.savername"></el-input>
                </el-form-item>

                <el-form-item label="联系方式" class="input" prop="phonenumber">
                    <el-input  v-model="pojo.phonenumber"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio-group v-model="pojo.gender">
                        <el-radio-button label="男"></el-radio-button>
                        <el-radio-button label="女"></el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="行李件数">
                    <el-input-number v-model="pojo.number" :min="1" :max="100"></el-input-number>
                </el-form-item>

                <el-form-item label="行李描述" style="width: 400px">
                    <el-input type="textarea"  v-model="pojo.luggagedescribe"></el-input>
                </el-form-item>

                <el-form-item label="预取日期" prop="saveforetime">
                    <el-date-picker
                    v-model="pojo.saveforetime"
                    type="date"
                    placeholder="选择预取日期"
                    align="right"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addOrder('pojoForm')">提交</el-button>
                    <el-button type="info">取消</el-button>
                </el-form-item>
                
            </el-form>
        </el-card>
    </el-card>
  </div>
</template>

<script>
import {add} from "../../api/addOrder";
export default {
    data () {

        var valisname = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('姓名不能为空'));
            }else{
                callback();
            }
        };

        var valiftime = (rule, value, callback) => { 
            if (!value) {
                return callback(new Error('领取日期不能为空'));
            }else{
                callback();
            }
        };
      return {
        active: 1,
        radio: '男',
        num: 1,
        pos: 'right',
        reDate: '',
        pojo: {
            savername:'',
            gender:'',
            phonenumber:'',
            number:'',
            luggagedescribe:'',
            savetime: new Date(),
            saveforetime:'',
            hotel:'',
            recievername:'',
            location:'',
            tag:'',
            picture: null,
        },
        rules: {
            savername: [
                { validator: valisname, trigger: 'blur'}
            ],
            saveforetime: [
                { validator: valiftime, trigger: 'change'}
            ]
        }
      };
    },

    methods: {
        addOrder(formName){
            this.$refs[formName].validate(valid =>{
                if(valid){
                    console.log('添加订单')
                    add(this.pojo).then(Response =>{
                        const resp = Response.data
                        console.log(resp.data)
                        if(resp.flag){
                            this.$router.push('/orderDetails')
                        }else{
                            this.$message({
                                message: resp.message,
                                type: 'warning'
                            })
                        }
                    })
                }else{
                    return false
                }
            })
        }
    },

  }

</script>
<style>
.dis{
    height: 100%;
    
}
.ca{
    background: url('../../assets/pd.png');
    background-color: #fff;
}
.card{
    margin: 50px auto;
    width: 500px;
}
.card h2{
    text-align: center;
}
.form{
    height: 460px;
}
.input{
    width: 300px;
}
</style>