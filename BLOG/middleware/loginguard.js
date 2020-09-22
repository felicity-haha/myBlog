module.exports = (req, res, next) => {
    //用户没有登录
    if (req.url !== '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        console.log('admin登录拦截过来的数据：');
        console.log(req.session.username); 
        console.log(req.session);

        if (req.session.role == 'normal') {
            return res.redirect('/home/')
        }
        next();
    }
}