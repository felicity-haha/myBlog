module.exports = (req, res) => {
    //标识当前文件的列表页面
    req.app.locals.currentLink = 'article';
    res.render('admin/article-edit')
}