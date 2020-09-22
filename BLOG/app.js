//引入第三方模块
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const morgan = require('morgan')
const config = require('config')
// 导入art-tempate模板引擎
const template = require('art-template');
//引入dateformat 对时间进行格式化
const dateFormat = require('dateformat')
// 向模板内部导入dateFormate变量
template.defaults.imports.dateFormat = dateFormat


//创建服务器
const app = express()
//获取环境变量 判断当前所处的环境
if (process.env.NODE_ENV == 'development') {
    console.log('当前是开发环境');
    //将客户端发送到服务器端的请求发送到 终端
    app.use(morgan('dev'))
} else {
    console.log('当前是生产环境');
}

require('./model/connect')
//拦截所有的请求，配置body-parse 模块
app.use(bodyParser.urlencoded({extended: false}))
//开放静态资源文件 使页面访问的时候可以查找到CSS image 等静态资源
app.use(express.static(path.join(__dirname, 'public')))
//获取json文件中的配置信息
console.log(config.get('title'));

//实现session 功能
app.use(session({
    secret: 'secret key',
    //设置cookie 的过期时间
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    saveUninitialized: false
}));

//告诉EXpress框架，模板 所在的位置
app.set('views', path.join(__dirname, 'views'))
//告诉EXpress框架，模板 的默认后缀是什么
app.set('view engine', 'art')
//告诉EXpress框架，渲染后缀为art 的模板时 所使用的模板引擎是什么
app.engine('art',require('express-art-template'))


//判断是否登录
//登录拦截
app.use('/admin', require('./middleware/loginguard'));
const home = require('./router/home')
const admin = require('./router/admin')

//将路由和请求路径进行匹配
app.use('/home', home)
app.use('/admin',admin)

//错误处理中间件  代码优化（错误信息）
app.use((err,req,res,next) => {
    //将字符串转换成对象
    const result = JSON.parse(err)
    const arr = []
    for (let k in result) {
        // obj = {path: '/admin/user-edit',message: '密码匹配错误，不可以进行更改',id: id}
        if (k != 'path') {
            arr.push(k + '='+result[k])
        }
    }
    res.redirect(`${result.path}?${arr.join('&')}`)
})

app.listen(80)
console.log('服务器搭建成功');