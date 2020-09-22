//引入第三方模块
const express = require('express')
//创建路由对象
const home = express.Router()
// 在home路由下继续创建路由
home.get('/', require('./home/index'))
home.get('/article', require('./home/article'))
home.post('/comment',require('./home/comment'))
//将路由对象作为模块成员进行导出
module.exports = home;

