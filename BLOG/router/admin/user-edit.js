//get 请求中的 user-edit
const { User } = require('../../model/user')
module.exports = async (req, res) => {
    let { message, id } = req.query
    req.app.locals.currentLink = 'user'
   
    if (id) {
        const user = await User.findOne({ _id: id })
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
            
        })
    }
    else {
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }
}

