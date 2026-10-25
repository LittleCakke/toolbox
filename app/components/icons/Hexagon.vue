<template>
    <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg">
        <!--
          顶点坐标计算逻辑（以中心点100,100，半径80为例）：
          顶点1(最左):   20, 100
          顶点2(左上):   60, 31
          顶点3(右上):   140, 31
          顶点4(最右):   180, 100
          顶点5(右下):   140, 169
          顶点6(左下):   60, 169
        -->
        <polygon
            points="20,100 60,31 140,31 180,100 140,169 60,169"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="3"
        />
    </svg>
</template>