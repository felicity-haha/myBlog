const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
     
module.exports = async (req, res, next) => {
    req.app.locals.currentLink = 'user'
    const { password,username,email,state,role } = req.body
    const id = req.query.id
    
    const user = await User.findOne({ _id: id })
    const isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
       //将修改的信息 更新到数据库之中
        await User.updateOne({ _id: id },{
            username: username,
            email: email,
            state: state,
            role: role,
        })
        //重定向回用户列表页面
        res.redirect('/admin/user')
    } else {
        let obj = {path: '/admin/user-edit',message: '密码匹配错误，不可以进行更改',id: id}
        next(JSON.stringify(obj))
    }
}