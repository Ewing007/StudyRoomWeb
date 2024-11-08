<template>
  <div ref="lineChart" style="width: 100%; height: 400px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

const lineChart = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const initLineChart = () => {
  if (lineChart.value) {
    chartInstance = echarts.init(lineChart.value);
    chartInstance.setOption({
      title: { text: "用户增长趋势", left: "center" },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "用户数量",
          type: "line",
          data: [150, 230, 224, 218, 135, 147, 260],
          smooth: true,
          lineStyle: { color: "#5470c6" },
        },
      ],
    });
  }
};

onMounted(() => {
  initLineChart();
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
  window.removeEventListener("resize", resizeChart);
});

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};
</script>

<style scoped>
/* 可根据需求自定义图表样式 */
</style>
