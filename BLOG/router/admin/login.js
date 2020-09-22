const bcrypt = require('bcrypt')
//导入用户集合 构造函数
const { User } = require("../../model/user");
module.exports = async (req, res) => {
    let { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('./admin/error', { msg: '邮箱或密码错误' })
    
    let user = await User.findOne({ email })
    let isEquality = await bcrypt.compare(password,user.password)
    console.log(user +"USER的值");
    //如果查询到了 user 返回的是数据中的对象
    //如果没有查到 user 就为空
    if (isEquality) {
        //sesion 模块设置完毕 之后 可以存储用户信息
        req.session.username = user.username;
        req.session.role = user.role
        req.app.locals.userInfo = user;
        if (user.role == 'admin') {
              //重定向
        res.redirect('/admin/user')
        } else {
              //重定向
        res.redirect('/home/')
        }
      
    } else {
        res.status(400).render('./admin/error',{msg: '邮箱或者密码错误'})
    }
    
}