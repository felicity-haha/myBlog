//引入第三方模块bgrypt
const bcrypt = require('bcrypt')

async function run() {
    let salt = await bcrypt.genSalt(10);
    //使用随机字符串对密码进行加密
    let result = await bcrypt.hash('123456',salt)
    console.log(salt);
    console.log(result);
}
run();