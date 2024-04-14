// mock/cityMock.js
import Mock from 'mockjs'

// 模拟当前定位的城市
Mock.mock('/api/currentCity', 'get', {
  'name': '重庆'
})

// 模拟热门城市列表
Mock.mock('/api/hotCitys', 'get', {
  'data|10-20': [{ // 生成10到20个热门城市
    'name': '@city'
  }]
})

// 模拟按字母索引的城市列表
Mock.mock('/api/cityList', 'get', () => {
  let cityList = {}
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  letters.split('').forEach(letter => {
    const cityCount = Mock.Random.integer(5, 10) // 每个字母下随机生成5到10个城市
    cityList[letter] = []
    for (let i = 0; i < cityCount; i++) {
      cityList[letter].push({
        name: Mock.Random.city(),
        check: false
      })
    }
  })
  return { data: cityList }
})

console.log('Mock rules for city loaded');
