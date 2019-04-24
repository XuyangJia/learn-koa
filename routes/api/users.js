const router = require('koa-router')(),
    bcrypt = require('bcrypt'),
    gravatar = require('gravatar'),
    User = require('../../models/User'),
    saltRounds = 10

/**
 * @route GET api/user/test
 * @description 测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async ctx => {
    ctx.status = 200
    ctx.body = {
        a: 1,
        b: 2
    }
})

/**
 * 注册接口
 * @route GET api/users/test
 * @description 测试接口地址
 * @access 接口是公开的
 */
router.post('/register', async ctx => {
    ctx.status = 200
    const body = ctx.request.body,
        name = body.name,
        pass = body.pass,
        email = body.email,
        result = await User.findOne({
            name
        })

    if (result) { // 用户名已存在
        ctx.status = 500
        ctx.body = {
            msg: '该用户名已被占用'
        }
        return
    }
    
    const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})

    // 创建用户数据
    const newUser = new User({
        name,
        pass,
        email,
        avatar
    })

    // 对明文密码进行加密
    await bcrypt
        .hash(pass, saltRounds)
        .then(hash => newUser.pass = hash)

    // 存入数据库
    await newUser.save()
        .then(user => {
            ctx.status = 200
            ctx.body = user
        })
        .catch(err => {
            console.log(err)
        })
})
module.exports = router.routes()