const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
//引入第三方模块
const Joi = require('joi')
//设定集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    //admin 超级管理员
    //nomal 普通用户
    role: {
        type: String,
        required: true,
    },
    state: {
        type: Number,
        default: 0
    }
})
const User = mongoose.model('User', userSchema)
//创建一个用户

async function createUser() {
    let salt = await bcrypt.genSalt(10)
    let pass = await bcrypt.hash('123456', salt)
    let user = await User.create({
        username: '小红',
        email: '666@qq.com',
        password: pass,
        role: 'admin',
        state: 0,
    })
}

const validate = user => {
    schema = {
        username: Joi.string().min(2).max(20).required().error(new Error('用户名格式错误！')),
        email: Joi.string().email().required().error(new Error('邮箱格式错误')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式错误')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色格式错误')),
        
        state: Joi.number().valid('0', '1').required().error(new Error('状态格式错误'))
    }
    return Joi.validate(user,schema)
}

// createUser();
//将集合作为模块成员导出
module.exports = {
    User,
    validate
}