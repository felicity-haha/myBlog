const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page')
module.exports = async (req, res) => {
    const page = req.query.page
    //标识当前文件的列表页面
    req.app.locals.currentLink = 'article';
    let articles = await pagination(Article).page(page).size(2).display(3).find().populate('author').exec();
    let abc = await Article.find();
   
    
    //  res.send(articles)
    // res.send(abc)
    res.render('admin/article.art', {
        articles: articles,    
    });
  
}