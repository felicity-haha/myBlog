const formidable = require('formidable');
const { Article } = require('../../model/article')
const path = require('path');
module.exports = (req,res) => {
    //创建及解析对象
    const form = new formidable.IncomingForm();
    //设置文件上传的路径
    form.uploadDir = path.join(__dirname,'../','../','public','upload')
    //是否保留上传文件的后缀名
    form.keepExtensions = true;
    //解析表单
    form.parse(req, async (err, fields, files) => {
        // res.send(fields)
        // return;
       await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content,
        })
        res.redirect('/admin/article');
    })
    // res.send('ok')
}