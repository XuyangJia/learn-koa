/**
 * Created by Thor on 2019-03-25 下午 04:10.
 */
const Koa = require('koa')
const router = require('koa-router')()
const koaBody = require('koa-body')
// const session = require('koa-session')
const passport = require('koa-passport')
const app = new Koa()
const users = require('./routes/api/users')
const port = process.env.PORT || 5000

// body parser
app.use(koaBody())

// Sessions
// app.keys = ['secret']
// app.use(session({}, app))

// Passport
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// routes
router.get('/', async ctx => {
  ctx.body = { msg: 'hello Koa' }
})
router.use('/api/users', users)
app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => console.log(`app started at ${port}...`))
