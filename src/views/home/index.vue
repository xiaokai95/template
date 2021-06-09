<template>
  <div class="app-container">
    <el-row :gutter="20" style="height: 45vh;">
      <el-col :span="8">
        <div class="warp">
          <div id="mapWarp" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="warp device cardStyle">
          <div class="title">
            <div class="logoWarp">
              <div class="titleLogo" />
              <div style="position: relative;top: 4px;left: 4px">重点设备能耗</div>
            </div>
            <div>
              <el-select v-model="value1" @change="majorDeviceChange" size="mini" placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="content">
            <div v-for="(item,i) in majorDeviceList" :key="i" class="item">
              <div class="headTitle">
                <div class="colorLump" :style="{background:item.bgColor}"></div>
                <div>{{item.label}}</div>
              </div>
              <div class="progress">
                <el-progress :text-inside="true" :color="item.bgColor" :stroke-width="15" :percentage="item.value" />
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="warp monthList cardStyle">
          <div class="title" style="padding: 8px 0">
            <div class="logoWarp">
              <div class="titleLogo" />
              <div style="position: relative;top: 4px;left: 4px">本月能源消耗情况</div>
            </div>
          </div>
          <div class="content">
            <div class="top">
              <div v-for="(item,i) in monthTopBgList" :key="i" class="item" :style="{'background':item.bgColor}">
                <div class="font16">{{ item.label }}</div>
                <div class="font14" style="color: #333333">{{ item.labelEh }}</div>
                <div class="monthTopBg" :style="{'background': 'url('+item.bgUrl+') no-repeat' }" />
                <div class="font28 ledFont" :style="{'color':item.fontColor}">{{ item.value }}</div>
              </div>
            </div>
            <div class="bottom">
              <div v-for="(item,i) in monthBottomBgList" :key="i" class="item" :style="{'background':item.bgColor}">
                <div class="bottomLeft">
                  <div class="font16">{{ item.label }}</div>
                  <div class="font14" style="color: #333333">{{ item.labelEh }}</div>
                  <div class="font28 ledFont" :style="{'color':item.fontColor}">{{ item.value }}</div>
                </div>
                <div style="display: flex;flex-flow: column;justify-content: center;">
                  <div class="bottomRight" :style="{'background': 'url('+item.bgUrl+') no-repeat' }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="height: 40vh;">
      <el-col :span="18">
        <div class="warp monthChart cardStyle">
          <div class="title" style="padding: 8px 0">
            <div class="logoWarp">
              <div class="titleLogo" />
              <div style="position: relative;top: 4px;left: 4px">月消耗情况</div>
            </div>
            <div class="cardRight">
              <div v-for="item in typeList" :key="item.value" class="item" :class="item.value==dateStatus?'active':''" @click="handerChange(item.value)">{{ item.label }}</div>
            </div>
          </div>
          <div class="content">
            <current-month-chat :chartData="monthChatData" id="currentMonthChat" class="currentMonthChat" height="100%" width="100%" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="warp tendencyChart cardStyle">
          <div class="title">
            <div class="logoWarp">
              <div class="titleLogo" />
              <div style="position: relative;top: 4px;left: 4px">今日能耗走势</div>
            </div>
            <div>
              <el-select v-model="value" @change="todayDataChange" size="mini" placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="content">
            <today-chat :chartData="todayData" id="todayChat" class="todayChat" height="100%" width="100%" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CurrentMonthChat from '@/views/home/chart/CurrentMonthChat'
import TodayChat from '@/views/home/chart/TodayChat'

export default {
  name: 'Home',
  components: { CurrentMonthChat, TodayChat },
  data() {
    return {
      majorDeviceList: [
        {
          label: '消防栓机械泵1路',
          bgColor: '#44BE91',
          fontColor: '#44BE91',
          value: '10'
        },
        {
          label: '消防栓机械泵2路5*10',
          bgColor: '#FFB400',
          fontColor: '#FFB400',
          value: '30'
        },
        {
          label: '生活用水泵2路一层',
          bgColor: '#E92D2D',
          fontColor: '#E92D2D',
          value: '5'
        },
        {
          label: '消防栓机械泵4路',
          bgColor: '#E96F2D',
          fontColor: '#E96F2D',
          value: '20'
        },
        {
          label: '生活用水泵1路一层',
          bgColor: '#449ABE',
          fontColor: '#E96F2D',
          value: '15'
        }
      ],
      monthTopBgList: [
        {
          label: '水能消耗',
          labelEh: 'WATER',
          bgUrl: require('../../assets/images/home/water.png'),
          bgColor: '#D2FFEE',
          fontColor: '#44BE91',
          value: '25.6'
        },
        {
          label: '电能消耗',
          labelEh: 'ELECTRIC',
          bgUrl: require('../../assets/images/home/electric.png'),
          bgColor: '#FFF0CB',
          fontColor: '#FFB400',
          value: '365894'
        },
        {
          label: '热能消耗',
          labelEh: 'HEAT ENERGY',
          bgUrl: require('../../assets/images/home/heatEnergy.png'),
          bgColor: '#FFD2D2',
          fontColor: '#E92D2D',
          value: '2222'
        },
        {
          label: '汽油消耗',
          labelEh: 'GASOLINE',
          bgUrl: require('../../assets/images/home/gasoline.png'),
          bgColor: '#FFDBC8',
          fontColor: '#E96F2D',
          value: '2442'
        }
      ],
      monthBottomBgList: [
        {
          label: '煤炭',
          labelEh: 'COAL',
          bgUrl: require('../../assets/images/home/coal.png'),
          bgColor: '#D6F3FF',
          fontColor: '#449ABE',
          value: '25.6'
        },
        {
          label: '天然气',
          labelEh: 'NATURAL GAS',
          bgUrl: require('../../assets/images/home/naturalGas.png'),
          bgColor: '#FFDAF2',
          fontColor: '#E94DB4',
          value: '3694'
        },
        {
          label: 'CO₂',
          labelEh: 'CARBON DIOXIDE',
          bgUrl: require('../../assets/images/home/CO2.png'),
          bgColor: '#D5FFD1',
          fontColor: '#58B64F',
          value: '222'
        }
      ],
      typeList: [
        { label: '水能', value: '1' },
        { label: '电能', value: '2' },
        { label: '热能', value: '3' },
        { label: '汽油', value: '4' },
        { label: '煤炭', value: '5' },
        { label: '天然气', value: '6' },
        { label: 'CO₂', value: '7' }
      ],
      dateStatus: '1',
      value1: '1',
      value: '2',
      monthChatData: {
        xAxisData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        thisYearData: [90, 82, 112, 34, 50, 120, 110, 25, 45, 112, 65, 22],
        yesteryearData: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
      },
      todayData: {
        xAxisData: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        todayData: [90, 82, 112, 34, 50, 120, 110, 25, 45, 112, 65, 22, 220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122],
      }
    }
  },
  computed: {},
  mounted() {
    this.initMap()
  },
  methods: {
    majorDeviceChange() {
      this.majorDeviceList = this.majorDeviceList.map((item) => {
        item.value = Math.floor(Math.random() * 100)
        return item
      })
    },
    todayDataChange() {
      const todayAxisData = []
      const todayData = []
      for (let i = 0; i < 24; i++) {
        todayAxisData.push(i)
        todayData.push(Math.floor(Math.random() * 300))
      }
      this.todayData.xAxisData = todayAxisData
      this.todayData.todayData = todayData
    },
    handerChange(val) {
      this.dateStatus = val
      const xAxisData = []
      const thisYearData = []
      const yesteryearData = []
      for (let i = 0; i < 12; i++) {
        xAxisData.push(i + 1)
        thisYearData.push(Math.floor(Math.random() * 300))
        yesteryearData.push(Math.floor(Math.random() * 300))
      }
      this.monthChatData.xAxisData = xAxisData
      this.monthChatData.thisYearData = thisYearData
      this.monthChatData.yesteryearData = yesteryearData
    },
    initMap() {
      const map = new AMap.Map('mapWarp', {
        resizeEnable: true,
        center: [117, 36.65],
        zoom: 11
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/font/font.css';
.ledFont {
  font-family: UnidreamLED;
}
::v-deep .amap-logo {
  display: none !important;
}

::v-deep .amap-copyright {
  display: none !important;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  height: 100%;
}

.warp {
  border-radius: 10px;
  height: 100%;
  box-shadow: 0px 5px 35px 0px rgba(23, 87, 153, 0.08)
}

.cardStyle {
  padding: 15px;

  .title {
    font-size: 16px;
    color: #000000;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 5px 0;

    .logoWarp {
      display: flex;
      justify-content: flex-start;
    }
  }
}

//设备
.device {
  .titleLogo {
    width: 22px;
    height: 22px;
    background: url("../../assets/images/home/device.png") no-repeat center;
    background-size: contain;
  }

  .content {
    overflow: auto;
    height: 90%;

    .item {
      padding: 25px 20px 0 25px;

      .headTitle {
        font-size: 15px;
        margin-bottom: 5px;
        position: relative;

        .colorLump {
          width: 18px;
          height: 18px;
          border-radius: 3px;
          //background: #44BE91;
          position: absolute;
          top: 0;
          left: -24px;
        }
      }
    }

  }
}

// 本月能耗
.monthList {
  .titleLogo {
    width: 22px;
    height: 22px;
    background: url("../../assets/images/home/deviceStatus.png") no-repeat center;
    background-size: contain;
  }

  .content {
    height: 90%;
    padding: 10px 0;

    .top {
      height: 60%;
      display: flex;
      justify-content: space-between;

      .item {
        width: 23%;
        height: 100%;
        padding: 20px 0 20px 20px;
        border-radius: 20px;
        display: flex;
        flex-flow: column;
        box-shadow: 0px 5px 35px 0px rgba(23, 87, 153, 0.08);

        .monthTopBg {
          width: 70px;
          height: 70px;
          margin: 10px 0;
          background-size: contain !important;
        }
      }
    }

    .bottom {
      height: 35%;
      display: flex;
      justify-content: space-between;
      margin-top: 15px;

      .item {
        width: 30%;
        height: 100%;
        padding: 20px;
        border-radius: 20px;
        background: #44BE91;
        display: flex;
        justify-content: space-between;
        box-shadow: 0px 5px 35px 0px rgba(23, 87, 153, 0.08);

        .bottomLeft {
          flex: 1;
          display: flex;
          flex-flow: column;
          justify-content: space-between;
        }

        .bottomRight {
          width: 70px;
          height: 70px;
          flex: 1;
          background-size: contain !important;
        }
      }
    }
  }
}

// 本月能耗图表
.monthChart {
  position: relative;
  .titleLogo {
    width: 22px;
    height: 22px;
    background: url("../../assets/images/home/deviceStatus.png") no-repeat center;
    background-size: contain;
  }
  .cardRight {
    width: 50%;
    padding: 6px 15px;
    background: #E9F4FF;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    position: absolute;
    top: 4px;
    right: 20px;
    .item {
      padding: 6px 10px;
      border-radius: 5px;
      //background: #3F88D3;
      cursor: pointer;
      &:hover {
        background: #8EB2D3;
      }
    }
    .active {
      background: #3F88D3;
      color: #ffffff;
    }
  }
  .content {
    width: 100%;
    height: 90%;
  }
}

// 趋势图
.tendencyChart {
  .titleLogo {
    width: 22px;
    height: 22px;
    background: url("../../assets/images/home/deviceStatus.png") no-repeat center;
    background-size: contain;
  }

  .content {
    width: 100%;
    height: 90%;
  }

}

#mapWarp {
  width: 100%;
  height: 100%;
}
</style>
