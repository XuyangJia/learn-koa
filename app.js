/**
 * Created by Thor on 2019-03-25 下午 04:10.
 */
const koa = require('koa'),
    router = require('koa-router')(),
    app = new koa(),
    users = require('./routes/api/user')
    port = process.env.PORT || 5000;
    
// 配置路由
router.get('/', async ctx => ctx.body = {msg: 'hello Koa'})
router.use('/api/users', users)
app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => console.log(`app started at ${port}...`))