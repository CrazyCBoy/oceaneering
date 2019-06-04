// 台风区域及其台风等级
export const TYPHOON_AREA_LEVEL = {
  '1': {
    name: '西北太平洋和南海',
    level: {
      '1': {name: '热带低压', value: 34},
      '2': {name: '热带风暴', value: 48},
      '3': {name: '强热带风暴', value: 64},
      '4': {name: '台风', value: 81},
      '5': {name: '强台风', value: 100},
      '6': {name: '超强台风', value: 999}
    }
  },
  '2': {
    name: '北印度洋',
    level: {
      '1': {name: '低压', value: 28},
      '2': {name: '深低压', value: 34},
      '3': {name: '气旋风暴', value: 48},
      '4': {name: '强气旋风暴', value: 64},
      '5': {name: '特强气旋风暴', value: 120},
      '6': {name: '超级气旋风暴', value: 999}
    }
  }
};