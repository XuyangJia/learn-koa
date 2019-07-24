const router = require('koa-router')()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const passport = require('koa-passport')
const User = require('../../models/User')
const validateRegisterInpute = require('../../validation/register')
const validateLoginInpute = require('../../validation/login')
const secretOrKey = require('../../config/keys').secretOrKey
const saltRounds = 10

/**
 * @route GET api/users/current
 * @description 用户信息接口地址 返回用户信息
 * @access 接口是私密的
 */
router.get('/current', passport.authenticate('jwt', {
  session: false
}), async ctx => {
  const {
    name,
    email,
    avatar
  } = ctx.state.user
  ctx.status = 200
  ctx.body = {
    name,
    email,
    avatar
  }
})

/**
 * @route GET api/users/login
 * @description 登录接口地址 返回token
 * @access 接口是公开的
 */
router.post('/login', async ctx => {
  const body = ctx.request.body

  const {
    errors,
    isValid
  } = validateLoginInpute(body)

  // 判断验证是否通过
  if (!isValid) {
    ctx.status = 400
    ctx.body = errors
    return
  }
  const name = body.name
  const pass = body.pass
  const user = await User.findOne({ name })

  if (user) {
    // 核验密码
    const success = bcrypt.compareSync(pass, user.pass)
    if (success) { // 登录成功
      const token = jwt.sign({ name, pass }, secretOrKey, { expiresIn: 60 * 60 }) // 一小时过期
      ctx.status = 200
      ctx.body = {
        success: true,
        token: 'Bearer ' + token
      }
    } else { // 密码错误
      ctx.status = 400
      ctx.body = {
        msg: '密码错误'
      }
    }
  } else {
    ctx.status = 404
    ctx.body = {
      msg: '用户不存在'
    }
  }
})

/**
 * @route GET api/users/register
 * @description 注册接口地址
 * @access 接口是公开的
 */
router.post('/register', async ctx => {
  const body = ctx.request.body
  const {
    errors,
    isValid
  } = validateRegisterInpute(body)

  // 判断验证是否通过
  if (!isValid) {
    ctx.status = 400
    ctx.body = errors
    return
  }
  const name = body.name
  const pass = body.pass
  const email = body.email
  const user = await User.findOne({ name })

  if (user) { // 用户已存在
    ctx.status = 500
    ctx.body = {
      msg: '该用户名已被占用'
    }
    return
  }

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  })

  // 创建用户数据
  const newUser = new User({
    name,
    pass: bcrypt.hashSync(pass, saltRounds), // 对明文密码进行加密
    email,
    avatar
  })

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
