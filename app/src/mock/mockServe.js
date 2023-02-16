import Mock from 'mockjs'
import banners from './banners.json'
import floors from './floors.json'
import address from './address.json'

Mock.mock('/mock/banners', {
  code: 200,
  data: banners
})

Mock.mock('/mock/floors', {
  code: 200,
  data: floors
})

Mock.mock('/mock/address', {
  code: 200,
  data: address
})
