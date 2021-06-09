<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/utils/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.setOptions(this.chartData)
    },
    setOptions({ xAxisData, thisMonthData, monthData } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: '4%',
          // icon: 'rect',
          data: ['上月', '本月']
          // textStyle: {
          //   fontSize: 12
          //   // color: '#F1F1F3'
          // }
        },
        grid: {
          top: '15%',
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          // boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: xAxisData
        }],
        yAxis: [{
          type: 'value',
          // name: '(%)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#C0C0C0',
              type: 'dashed'
            }
          }
        }],
        series: [{
          name: '本月',
          type: 'bar',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          itemStyle: {
            normal: {
              color: '#FFC9A6',
              borderWidth: 12

            }
          },
          data: thisMonthData
        }, {
          name: '上月',
          type: 'bar',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          itemStyle: {
            normal: {
              color: '#8EEF93',
              borderWidth: 12

            }
          },
          data: monthData
        }
        ]
      })
    }
  }
}
</script>
