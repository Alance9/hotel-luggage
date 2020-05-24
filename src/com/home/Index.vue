<template>
  <div>
    <el-card>
      <span style="float:left">
        <el-button type="primary" icon="el-icon-user-solid" circle @click="reviseOrder" v-if="flag"></el-button>
        <el-button type="primary" icon="el-icon-s-home" circle @click="reviseOrder" v-if="!flag"></el-button>
      </span>

      <el-form :inline="true" class="in-form">
        <el-form-item>
          <el-input placeholder="行李员名字" v-if="flag" style="width: 120px"></el-input>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            style="width: 150px"
            value-format="yyyy-MM-dd"
            
            type="date"
            placeholder="起始时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            style="width: 150px"
            value-format="yyyy-MM-dd"
            
            type="date"
            placeholder="结束时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="index_div" v-if="!flag">
        <span>今天总订单量：{{300}}</span>
        <span>总寄存量：{{150}}</span>
        <span>总领取量：{{150}}</span>
      </div>
      <div class="index_div" v-if="flag">
        <span>今天个人订单量：{{300}}</span>
        <span>个人寄存量：{{150}}</span>
        <span>个人领取量：{{150}}</span>
      </div>
    </el-card>

    <el-card style="margin-top:10px">
      <el-row style="margin-top:10px">
        <!-- 近日寄存 -->
        <el-col :span="8">
          <ve-pie
            :data="chartData1"
            :settings="chartSettings1"
            :title="title1"
            :legend="legend1"
            v-if="!flag"
          ></ve-pie>
          <ve-pie
            :data="chartData5"
            :settings="chartSettings1"
            :title="title5"
            :legend="legend1"
            v-if="flag"
          ></ve-pie>
        </el-col>

        <!-- 近日领取 -->
        <el-col :span="8">
          <ve-ring :data="chartData2" :title="title2" :legend="legend2" v-if="!flag"></ve-ring>
          <ve-ring :data="chartData6" :title="title6" :legend="legend2" v-if="flag"></ve-ring>
        </el-col>

        <!-- 业务状况 -->
        <el-col :span="8">
          <ve-funnel
            :data="chartData3"
            :settings="chartSettings3"
            :title="title3"
            :legend="legend3"
            v-if="!flag"
          ></ve-funnel>
          <ve-funnel
            :data="chartData7"
            :settings="chartSettings7"
            :title="title7"
            :legend="legend3"
            v-if="flag"
          ></ve-funnel>
        </el-col>
      </el-row>
    </el-card>

    <!-- 近日存取 -->
    <el-card style="margin-top:10px">
      <el-row style="margin-top: 10px">
        <ve-line
          :data="chartData4"
          :settings="chartSettings4"
          :extend="chartExtend"
          :title="title4"
          :mark-line="markLine"
          :mark-point="markPoint"
          :toolbox="toolbox"
          :legend="legend4"
          v-if="!flag"
        ></ve-line>
        <ve-line
          :data="chartData8"
          :settings="chartSettings4"
          :extend="chartExtend"
          :title="title8"
          :mark-line="markLine"
          :mark-point="markPoint"
          :toolbox="toolbox"
          :legend="legend4"
          v-if="flag"
        ></ve-line>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import dataApi from "../../api/index";
export default {
  data() {
    this.legend1 = {
      left: "right",
      top: "bottom"
    };
    this.legend2 = {
      left: "right",
      top: "bottom"
    };
    this.legend3 = {
      left: "center",
      top: "bottom"
    };
    this.legend4 = {
      right: 180,
      top: "top"
    };

    this.title1 = {
      text: "近日总寄存状况",
      left: "center",
      top: "top",
      subtextStyle: {
        color: "#de4751",
        fontSize: 10
      }
    };
    this.title2 = {
      text: "近日总领取状况",
      left: "center",
      top: "top",
      subtextStyle: {
        color: "#de4751",
        fontSize: 10
      }
    };
    this.title5 = {
      text: "近日个人寄存状况",
      left: "center",
      top: "top",
      subtextStyle: {
        color: "#de4751",
        fontSize: 10
      }
    };
    this.title6 = {
      text: "近日个人领取状况",
      left: "center",
      top: "top",
      subtextStyle: {
        color: "#de4751",
        fontSize: 10
      }
    };
    this.title3 = {
      text: "总业务状况",
      left: "center",
      top: "top",
      subtextStyle: {
        color: "#de4751",
        fontSize: 10
      }
    };
    this.title7 = {
      text: "个人业务状况",
      left: "center",
      top: "top",
      subtextStyle: {
        color: "#de4751",
        fontSize: 10
      }
    };
    this.title4 = {
      text: "近日总存取状况",
      left: "center",
      top: "top",
      subtextStyle: {
        color: "#de4751",
        fontSize: 10
      }
    };
    this.title8 = {
      text: "近日个人存取状况",
      left: "center",
      top: "top",
      subtextStyle: {
        color: "#de4751",
        fontSize: 10
      }
    };

    this.chartSettings1 = {
      level: [["03/01", "03/02"], ["03/03", "03/04", "03/05", "03/06", "03/07"]]
    };
    this.chartSettings3 = {
      sequence: ["总订单", "已领取", "未领取"]
    };
    this.chartSettings7 = {
      sequence: ["个人关联订单", "领取订单", "寄存订单"]
    };

    this.chartSettings4 = {
      //设置别名
      labelMap: {
        dateD: "寄存量",
        dateR: "领取量"
      },
      interval: 0 //横轴信息全部显示
    };
    this.toolbox = {
      feature: {
        magicType: { type: ["line", "bar"] },
        saveAsImage: {}
      },
      right: 30
    };
    this.markLine = {
      data: [
        {
          name: "平均线",
          type: "average"
        }
      ]
    };
    this.markPoint = {
      data: [
        {
          name: "最大值",
          type: "max"
        }
      ]
    };
    this.chartExtend = {
      series(v) {
        v.forEach(i => {
          i.barWidth = 20;
        });
        return v;
      },
      grid: {
        right: 80,
        begindate: "",
        enddate: ""
      }
    };

    return {
      flag: false,
      chartData1: {
        columns: ["date", "dateD"],
        rows: []
      },

      chartData2: {
        columns: ["date", "dateR"],
        rows: []
      },

      chartData3: {
        columns: ["type", "num"],
        rows: []
      },

      chartData4: {
        columns: ["date", "dateD", "dateR"],
        rows: []
      },

      chartData5: {
        columns: ["date", "dateD"],
        rows: []
      },

      chartData6: {
        columns: ["date", "dateR"],
        rows: []
      },

      chartData7: {
        columns: ["type", "num"],
        rows: []
      },

      chartData8: {
        columns: ["date", "dateD", "dateR"],
        rows: []
      }
    };
  },

  created() {
    //初始化列表
    this.getIndexList();
  },

  methods: {
    getIndexList() {
      dataApi.getList().then(Response => {
        const resp = Response.data;
        console.log(resp.data.rows3);
        for (let i = 0; i < resp.data.rows1.length; i++) {
          this.chartData1.rows.push(resp.data.rows1[i]);
        }
        for (let i = 0; i < resp.data.rows2.length; i++) {
          this.chartData2.rows.push(resp.data.rows2[i]);
        }
        for (let i = 0; i < resp.data.rows3.length; i++) {
          this.chartData3.rows.push(resp.data.rows3[i]);
        }
        for (let i = 0; i < resp.data.rows4.length; i++) {
          this.chartData4.rows.push(resp.data.rows4[i]);
        }
        for (let i = 0; i < resp.data.rows5.length; i++) {
          this.chartData5.rows.push(resp.data.rows5[i]);
        }
        for (let i = 0; i < resp.data.rows6.length; i++) {
          this.chartData6.rows.push(resp.data.rows6[i]);
        }
        for (let i = 0; i < resp.data.rows7.length; i++) {
          this.chartData7.rows.push(resp.data.rows7[i]);
        }
        for (let i = 0; i < resp.data.rows8.length; i++) {
          this.chartData8.rows.push(resp.data.rows8[i]);
        }
      });
    },

    reviseOrder() {
      this.flag = !this.flag;
    }
  }
};
</script>
<style>
.index_div {
  display: inline;
  margin-left: 20px;
  margin-top: 10px;
  float: left;
}
.index_div span {
  margin-right: 30px;
}
.c {
  background-color: #fff;
  /* background-image: url("../../assets/jk.png"); */
}
.el-card {
  padding: 0px;
}
.image {
  width: 100%;
  height: 200px;
  display: block;
}
.size {
  text-align: center;
  margin: 20px 10px 10px 10px;
}
.in-form {
  float: right;
}
</style>
