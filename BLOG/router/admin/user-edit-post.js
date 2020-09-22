

const bcrypt = require("bcrypt")
const { User,validate } = require('../../model/user')
const e = require("express")

module.exports = async (req, res, next) => {
    req.app.locals.currentLink = 'user'
    try {
    //进行验证
      await validate(req.body)
    } catch (e) {
    //   return  res.redirect(`/admin/user-edit?message=${e.message}`)
        // 对象转化成字符串 JSON.stingify
        //next 方法只接受字符串
        return next(JSON.stringify({ path: "/admin/user-edit",message: e.message }))
    }

    const user = await User.findOne({ email: req.body.email })
    if (user) {
        // return res.redirect(`/admin/user-edit?message=该邮箱地址已被占用`)
        // 错误处理的优化
        return next(JSON.stringify({ path: "/admin/user-edit",message: '邮地址已被占用' }))
        // return next(JSON.stringify({ path: "/admin/user-edit", message: '该邮箱地址已被占用' }))
        // return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用'}))
    }
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10)
    //对密码进行加密
    const password = await bcrypt.hash(req.body.password, salt)
    req.body.password = password;
    await User.create(req.body)
    //重定向到user页面
    res.redirect('/admin/user')
    
}