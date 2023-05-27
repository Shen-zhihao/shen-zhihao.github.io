## echartsX 轴配置

```javascript
xAxis: {
  id: '',
  show: true, //是否显示x轴
  gridIndex: 0, //轴所在grid索引，默认位于第一个grid
  alignTicks: false, //在多个轴为数值轴的时候，可以开启该配置项自动对齐刻度。只对'value'和'log'类型的轴有效
  position: 'top', //轴的位置（top/bottom）
  offset: 0, //轴相对于默认位置的偏移，在相同的position上有多个轴时有用
  type: 'category', //坐标轴类型，值category/value，与y轴呼应，若x轴配置category则y轴配置value
  name: '', //坐标轴名称
  nameLocation: 'end', //坐标轴名称显示位置，可选值start/middle[或者center]/end
  nameTextStyle: {}, //一般样式也很少直接修改且内容过多待更新... ...
  nameGap: 15, //坐标轴名称与轴线间距离
  nameRotate: 10, //坐标轴名字旋转，角度值
  inverse: false, //是否是反向坐标轴
  boundaryGap: ['20%', '20%'],    // 坐标轴两边留白策略，也可以使用布尔值，true居中，false定位在刻度点
  min: '', //刻度最小值
  max: '', //刻度最大值
  scale: false, //只在数值轴中type: 'value'有效, 设置min和max后无效。是否是脱离 0 值比例。设置成true后坐标刻度不会强制包含零刻度。在双数值轴的散点图中较有用
  splitNumber: 5, //坐标轴的分割段数（预估值）
  minInterval: 0, //自动计算坐标轴最小间隔，例：设置成1，刻度没有小数
  maxInterval: '', //自动计算坐标轴最大间隔
  axisLine: {
    show: true,    // 是否显示坐标轴轴线
    symbol: ['none', 'arrow'],     // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
    symbolSize: [10, 15],     // 轴线两端箭头大小，数值一表示宽度，数值二表示高度
    lineStyle: {
      color: '#333',    // 坐标轴线线的颜色
      width: '5',    // 坐标轴线线宽
      type: 'solid',    // 坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
    },
  },
  axisTick: {
    show: true,    // 是否显示坐标轴刻度
    inside: true,     // 坐标轴刻度是否朝内，默认朝外
    length: 5,    //坐标轴刻度的长度
    lineStyle: {
      color: '#FFF',     //刻度线的颜色
      width: 10,    //坐标轴刻度线宽
      type: 'solid',    //坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
    },
  },
  axisLabel: {
    show: true, //是否显示刻度标签
    interval: '0',  //坐标轴刻度标签的显示间隔，在类目轴中有效.0显示所有
    inside: true, //刻度标签是否朝内，默认朝外
    rotate: 90, //刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠；旋转的角度从-90度到90度
    margin: 10,  //刻度标签与轴线之间的距离
    // formatter 刻度标签的内容格式器，支持字符串模板和回调函数两种形式,自定义格式化坐标轴
    formatter: (value) => {
       if (value > 0) return `${value} k`;
       return `${Math.abs(value)} k`;
    },
    color: '#FFF',   // 刻度标签文字的颜色
    fontStyle: 'normal',  // 字体的风格（normal无样式；italic斜体；oblique倾斜字体）
    fontWeight: 'normal',  // 字体的粗细（normal无样式；bold加粗；bolder加粗再加粗；lighter变细；数字定义粗细也可以取值范围100至700）
    fontSize: '20', //文字字体大小
    align: 'left',     // 文字水平对齐方式，默认自动（left/center/right）
    verticalAlign: 'left',    // 文字垂直对齐方式，默认自动（top/middle/bottom)
    lineHeight: '50',    // 行高
    backgroundColor: 'red', // 文字块背景色，例：#123234, red, rgba(0,23,11,0.3)
  },
  splitLine: {
    show: true,    // 是否显示分隔线。默认数值轴显示，类目轴不显示
    interval: '0',    // 坐标轴刻度标签的显示间隔，在类目轴中有效.0显示所有
    color: ['#ccc'], //color分隔线颜色，可设置单个颜色，也可设置颜色数组，分隔线会按数组中颜色顺序依次循环设置颜色
    width: 3, // 分隔线线宽
    type: 'solid', // 坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
  },
  splitArea: {
    show: true, // 是否显示分隔区域
    interval: '0', // 坐标轴刻度标签的显示间隔，在类目轴中有效.0显示所有
    areaStyle: {
      color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)'], //color分隔区域颜色。分隔区会按数组中颜色顺序依次循环设置颜色。默认是一个深浅的间隔色
      opacity: 1, // 图形透明度。支持从0到1的数字，为0时不绘制该图形
    },
  },
  data: {
    textStyle: {
      color: '#FFF', // 文字的颜色
      fontStyle: 'normal', // 文字字体的风格（normal无样式；italic斜体；oblique倾斜字体）
      fontWeight: 'normal', //字体的粗细（normal无样式；bold加粗；bolder加粗再加粗；lighter变细；数字定义粗细也可以取值范围100至700）
      fontSize: '20', // 文字字体大小
      align: 'left', // 文字水平对齐方式，默认自动（left/center/right）
      verticalAlign: 'left', // 文字垂直对齐方式，默认自动（top/middle/bottom）
      lineHeight: '50',  // 行高
      backgroundColor: 'red', // 文字块背景色，例：#123234, red, rgba(0,23,11,0.3)
    }
  }
}
```
