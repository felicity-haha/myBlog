//第一步引入joi模块
const Joi = require('joi')
//创建对象的验证规则
const schema = {
    //required() 方法 用于设定 元素为必须的 error(new Error('此方法用于自定义错误信息！！！'))
    username: Joi.string().min(2).max(5).required().error(new Error('username属性验证错误')),
    birth: Joi.number().min(1997).max(2020).required().error(new Error('birth 属性设置错误'))
}
//进行验证
async function run() {
    try {
        await Joi.validate({username: "zs",birth: 2000},schema)
    } catch (er) {
        //er.messages 只会报出 设置好的错误 error(new Error('username属性验证错误'))
        console.log(er.message);
        return;
    }
    console.log('验证通过');
}
run()