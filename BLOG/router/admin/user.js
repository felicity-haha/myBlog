const { User } = require("../../model/user");

module.exports = async (req, res) => {
      //标识当前页面是用户列表页面
      req.app.locals.currentLink = 'user'
    //根据客户端传递过来的get参数 获取分页所在的页数
    let page = req.query.page || 1;
    //每一页显示的数据
    let pagesize = 10;
   //获取数据库中总的数据
    let count = await User.countDocuments({});
    //总的页数
    let total = Math.ceil(count / pagesize)

    let start = (page - 1) * pagesize;
    const users = await User.find().limit(pagesize).skip(start)
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });
}