<template>
  <div class="app-container">
    <el-row :gutter="20" style="height: 88vh;">
      <el-col :span="18">
        <div class="warp leftWarp">
          <el-row :gutter="15" style="height: 100%;">
            <el-col :span="4">
              <div class="warp left">
                <div v-for="(item,i) in typeList" :key="i" class="items" :class="i==status?'active':''"
                     @click="toggle(i)">
                  <div class="leftInfo">
                    <div class="title">
                      <div :style="{'background': 'url('+item.bgUrl+') no-repeat' }"/>
                      <div class="font16">{{ item.label }}</div>
                    </div>
                    <div class="font28 ledFont" :style="{'color': item.fontColor }">{{ item.value1 }}</div>
                    <div>同比:<span :style="{'color': item.fontColor }">{{ item.value2 }}</span></div>
                  </div>
                  <div class="rightBg">
                    <div/>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="20">
              <el-row :gutter="20" style="height: 46vh;">
                <el-col :span="24">
                  <div class="">
                    <el-select v-model="value" size="mini" @change="workshopChange" placeholder="请选择">
                      <el-option
                        v-for="item in workshopList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                  <div class="workshopStyle cardStyle">
                    <div class="title" style="padding: 8px 0">
                      <div class="logoWarp">
                        <div class="titleLogo"/>
                        <div style="position: relative;top: 4px;left: 4px">车间能耗情况</div>
                      </div>
                    </div>
                    <div class="content">
                      <current-month-chat :chartData="workshopData" id="workshop" class="workshop"/>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="height: 40vh;">
                <el-col :span="15">
                  <div class="centerWarp">
                    <div class="workshopStyle cardStyle">
                      <div class="title" style="padding: 8px 0">
                        <div class="logoWarp">
                          <div class="titleLogo"/>
                          <div style="position: relative;top: 4px;left: 4px">重点设备能耗量</div>
                        </div>
                      </div>
                      <div class="content">
                        <device-consume :chartData="deviceConsumeData" id="deviceConsume" class="deviceConsume"/>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div class="centerWarp">
                    <div class="centerWarp">
                      <div class="workshopAlarm cardStyle">
                        <div class="title" style="padding: 8px 0">
                          <div class="logoWarp">
                            <div class="titleLogo"/>
                            <div style="position: relative;top: 4px;left: 4px">本月车间报警信息</div>
                          </div>
                        </div>
                        <div class="content">
                          <el-table
                            :data="tableData"
                            style="width: 100%"
                            height="100%"
                          >
                            <el-table-column
                              prop="device"
                              label="设备"
                              align="center"
                            />
                            <el-table-column
                              prop="area"
                              label="原因"
                              align="center"
                            />
                            <el-table-column
                              prop="date"
                              label="时间"
                              align="center"
                            />
                          </el-table>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="rightWarp">
          <div class="rightStyle realTimeAlarm cardStyle">
            <div class="title" style="padding: 8px 0">
              <div class="logoWarp">
                <div class="titleLogo"/>
                <div style="position: relative;top: 4px;left: 4px">实时预警</div>
              </div>
            </div>
            <div class="content">
              <el-table
                :data="tableData"
                style="width: 100%"
                height="100%"
              >
                <el-table-column
                  prop="area"
                  label="区域"
                  align="center"
                />
                <el-table-column
                  prop="device"
                  label="设备"
                  align="center"
                />
                <el-table-column
                  prop="date"
                  label="时间"
                  align="center"
                />
              </el-table>
            </div>
          </div>
          <div class="rightStyle deviceStatusStyle cardStyle">
            <div class="title">
              <div class="logoWarp">
                <div class="titleLogo"/>
                <div style="position: relative;top: 4px;left: 4px">设备在线情况统计</div>
              </div>
              <div>
                <el-select v-model="value1" @change="deviceStatusChange" size="mini" placeholder="请选择">
                  <el-option
                    v-for="item in workshopList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="content">
              <div v-for="(item,i) in deviceStatusList" :key="i" class="item">
                <div class="deviceName">
                  <div class="logo" :style="{'background': 'url('+item.bgUrl+') no-repeat' }"/>
                  <div class="nameText font16">{{ item.label }}</div>
                </div>
                <div class="deviceStatus">
                  <div class="font14"><span style="color: #E72121">在线数</span>/<span style="color: #333333">总数</span>
                  </div>
                  <div class="font14" style="color: #333333">{{ item.value1 }}/{{ item.value2 }}</div>
                </div>
                <div class="progress">
                  <el-progress :text-inside="true" :color="item.bgColor" :stroke-width="13" :percentage="item.value3"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CurrentMonthChat from '@/views/home/chart/CurrentMonthChat'
import DeviceConsume from '@/views/detailInfo/chart/DeviceConsume'

export default {
  name: 'Index',
  comments: {
    CurrentMonthChat
  },
  components: {CurrentMonthChat, DeviceConsume},
  data() {
    return {
      tableData: [
        {area: '动力站', device: '深水泵#36-2', date: '2021-6-6 '},
        {area: '动力站', device: '深水泵#36-2', date: '2021-6-6 '},
        {area: '动力站', device: '深水泵#36-2', date: '2021-6-6 '},
        {area: '动力站', device: '深水泵#36-2', date: '2021-6-6 '},
        {area: '动力站', device: '深水泵#36-2', date: '2021-6-6 '},
        {area: '动力站', device: '深水泵#36-2', date: '2021-6-6 '},
        {area: '动力站', device: '深水泵#36-2', date: '2021-6-6 '},
        {area: '动力站', device: '深水泵#36-2', date: '2021-6-6 '}
      ],
      workshopData: {
        xAxisData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        thisYearData: [90, 82, 112, 34, 50, 120, 110, 25, 45, 112, 65, 22],
        yesteryearData: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
      },
      deviceConsumeData: {
        xAxisData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        thisMonthData: [90, 82, 112, 34, 50, 120, 110, 25, 45, 112, 65, 22, 220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 220, 182, 125, 145, 122, 191, 134],
        monthData: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122, 120, 110, 25, 45, 112, 65, 22, 220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165]
      },
      deviceStatusList: [
        {
          label: '油烟处理器1',
          bgUrl: require('../../assets/images/home/logoYellow.png'),
          bgColor: '#FFB400',
          value1: '23',
          value2: '30',
          value3: '10'
        },
        {
          label: '油烟处理器2',
          bgUrl: require('../../assets/images/home/logoGreen.png'),
          bgColor: '#44BE91',
          value1: '23',
          value2: '30',
          value3: '10'

        },
        {
          label: '油烟处理器3',
          bgUrl: require('../../assets/images/home/logoBlue.png'),
          bgColor: '#449ABE',
          value1: '23',
          value2: '30',
          value3: '10'

        },
        {
          label: '油烟处理器4',
          bgUrl: require('../../assets/images/home/logoOrange.png'),
          bgColor: '#E96F2D',
          value1: '23',
          value2: '30',
          value3: '10'

        },
        {
          label: '油烟处理器5',
          bgUrl: require('../../assets/images/home/logoRed.png'),
          bgColor: '#E92D2D',
          value1: '23',
          value2: '30',
          value3: '20'

        }
      ],
      status: 0,
      typeList: [
        {
          label: '水能消耗',
          bgUrl: require('../../assets/images/home/left_hydroenergy.png'),
          fontColor: '#44BE91',
          value1: 26.5,
          value2: '100%'
        },
        {
          label: '电能消耗',
          bgUrl: require('../../assets/images/home/left_electric.png'),
          fontColor: '#FFB400',
          value1: 26.5,
          value2: '88.9%'
        },
        {
          label: '热能消耗',
          bgUrl: require('../../assets/images/home/left_heat.png'),
          fontColor: '#E92D2D',
          value1: 26.5,
          value2: '88.9%'
        },
        {
          label: '汽油消耗',
          bgUrl: require('../../assets/images/home/left_gasoline.png'),
          fontColor: '#E96F2D',
          value1: 26.5,
          value2: '88.9%'
        },
        {
          label: '煤炭消耗',
          bgUrl: require('../../assets/images/home/left_coal.png'),
          fontColor: '#449ABE',
          value1: 26.5,
          value2: '88.9%'
        },
        {
          label: '天然气消耗',
          bgUrl: require('../../assets/images/home/left_natural.png'),
          fontColor: '#E94DB4',
          value1: 26.5,
          value2: '88.9%'
        },
        {
          label: 'CO₂消耗',
          bgUrl: require('../../assets/images/home/left_CO2.png'),
          fontColor: '#58B64F',
          value1: 26.5,
          value2: '88.9%'
        }
      ],
      // 车间
      workshopList: [{label: '一号车间', value: 1}, {label: '二号车间', value: 2}, {label: '三号车间', value: 3}],
      value: 1,
      value1: 1
    }
  },
  methods: {
    deviceStatusChange() {
      this.deviceStatusList = this.deviceStatusList.map((item) => {
        const val1 = Math.floor(Math.random() * 30)
        const percentage = (val1 / item.value2).toFixed(2)
        item.value1 = val1
        item.value3 = (percentage * 100).toFixed(0)
        return item
      })
    },
    workshopChange() {
      const xAxisData = []
      const thisYearData = []
      const yesteryearData = []
      for (let i = 0; i < 12; i++) {
        xAxisData.push(i + 1)
        thisYearData.push(Math.floor(Math.random() * 300))
        yesteryearData.push(Math.floor(Math.random() * 300))
      }
      this.workshopData.xAxisData = xAxisData
      this.workshopData.thisYearData = thisYearData
      this.workshopData.yesteryearData = yesteryearData
      const deviceAxisData = []
      const thisMonthData = []
      const monthData = []
      for (let i = 0; i < 30; i++) {
        deviceAxisData.push(i + 1)
        thisMonthData.push(Math.floor(Math.random() * 300))
        monthData.push(Math.floor(Math.random() * 300))
      }
      this.deviceConsumeData.xAxisData = deviceAxisData
      this.deviceConsumeData.thisMonthData = thisMonthData
      this.deviceConsumeData.monthData = monthData
    },
    toggle(i) {
      this.status = i
      const xAxisData = []
      const thisYearData = []
      const yesteryearData = []
      for (let i = 0; i < 12; i++) {
        xAxisData.push(i + 1)
        thisYearData.push(Math.floor(Math.random() * 300))
        yesteryearData.push(Math.floor(Math.random() * 300))
      }
      this.workshopData.xAxisData = xAxisData
      this.workshopData.thisYearData = thisYearData
      this.workshopData.yesteryearData = yesteryearData
      const deviceAxisData = []
      const thisMonthData = []
      const monthData = []
      for (let i = 0; i < 30; i++) {
        deviceAxisData.push(i + 1)
        thisMonthData.push(Math.floor(Math.random() * 300))
        monthData.push(Math.floor(Math.random() * 300))
      }
      this.deviceConsumeData.xAxisData = deviceAxisData
      this.deviceConsumeData.thisMonthData = thisMonthData
      this.deviceConsumeData.monthData = monthData
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/font/font.css';

.ledFont {
  font-family: UnidreamLED;
}

.app-container {
  .el-row {
    margin-bottom: 10px;

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
    //box-shadow: 0px 5px 35px 0px rgba(23, 87, 153, 1)
  }

  .leftWarp {
    width: 100%;
    height: 100%;
    padding: 10px;

    .left {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column;
      justify-content: space-between;

      .items {
        width: 100%;
        height: 13.5%;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 0px 5px 7px 0px rgba(23, 87, 153, 0.07);
        cursor: pointer;
        display: flex;
        justify-content: space-between;

        .leftInfo {
          height: 100%;
          display: flex;
          flex-flow: column;
          justify-content: space-between;

          .title {
            display: flex;
            justify-content: flex-start;

            div:nth-child(1) {
              width: 16px;
              height: 20px;
              margin-right: 5px;
              background: #44BE91;
              background-size: contain !important;
            }
          }
        }

        .rightBg {
          display: flex;
          flex-flow: column;
          justify-content: flex-end;

          div {
            width: 75px;
            height: 45px;
            background: #44BE91;
            background: url("../../assets/images/home/left_bg.png") no-repeat;
            background-size: contain;
          }
        }
      }

      .active {
        background: #3F88D3 !important;
        color: #ffffff !important;
      }
    }

    .centerWarp {
      height: 100%;
    }

    .workshopAlarm {
      height: 95%;

      .titleLogo {
        width: 22px;
        height: 22px;
        background: url("../../assets/images/home/realTimeAlarm.png") no-repeat center;
        background-size: contain;
      }

      .content {
        width: 100%;
        height: 90%;
      }
    }

    .workshopStyle {
      height: 95%;

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
  }

  .rightWarp {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    .rightStyle {
      width: 100%;
      height: 49%;
      border-radius: 10px;
      box-shadow: 0px 5px 35px 0px rgba(23, 87, 153, 0.1)
    }

    .realTimeAlarm {
      .titleLogo {
        width: 22px;
        height: 22px;
        background: url("../../assets/images/home/realTimeAlarm.png") no-repeat center;
        background-size: contain;
      }

      .content {
        overflow: auto;
        height: 90%;
      }
    }

    .deviceStatusStyle {
      .titleLogo {
        width: 22px;
        height: 22px;
        background: url("../../assets/images/home/deviceStatus.png") no-repeat center;
        background-size: contain;
      }

      .content {
        overflow: auto;
        height: 90%;

        .item {
          margin: 5px 0;

          .deviceName {
            display: flex;
            justify-content: flex-start;

            .logo {
              width: 20px;
              height: 20px;
              margin-right: 5px;
              background-size: contain !important;
            }
          }

          .deviceStatus {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
          }
        }
      }
    }
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

}
</style>
