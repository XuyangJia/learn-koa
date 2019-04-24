/**
 * Created by Thor on 2019-03-25 下午 04:10.
 */
const koa = require('koa'),
    router = require('koa-router')(),
    koaBody = require('koa-body'),
    app = new koa(),
    users = require('./routes/api/users'),
    port = process.env.PORT || 5000

app.use(koaBody())

// 配置路由
router.get('/', async ctx => ctx.body = {
    msg: 'hello Koa'
})
router.use('/api/users', users)
app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => console.log(`app started at ${port}...`))