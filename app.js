/**
 * Created by Thor on 2019-03-25 下午 04:10.
 */
const koa = require('koa'),
    router = require('koa-router')(),
    koaBody = require('koa-body'),
    // session = require('koa-session'),
    passport = require('koa-passport'),
    app = new koa(),
    users = require('./routes/api/users'),
    port = process.env.PORT || 5000

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
router.get('/', async ctx => ctx.body = {
    msg: 'hello Koa'
})
router.use('/api/users', users)
app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => console.log(`app started at ${port}...`))