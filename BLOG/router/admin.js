const express = require('express')
//创建路由对象
const admin = express.Router();
//渲染登录页面
admin.get('/login', require('./admin/loginpage'))
//判断吧登录页面
admin.post('/login', require('./admin/login'))
//用户页面
admin.get('/user', require('./admin/user'))
//新增用户
//修改用户页面
admin.get("/user-edit", require("./admin/user-edit"))
admin.post('/user-edit', require('./admin/user-edit-post'))
//修改用户路由
admin.post('/user-modify', require('./admin/user-modify'))
//删除用户信息
admin.get('/delete', require('./admin/delete'))
//文章列表页面
// 实现退出功能
admin.get('/logout', require('./admin/logout'));
admin.get('/article', require('./admin/article'))
admin.get('/article-edit', require('./admin/article-edit'))
admin.post('/article-add',require('./admin/article-add'))
//将路由对象作为模块成员进行导出
module.exports = admin
