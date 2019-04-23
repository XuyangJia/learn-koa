/**
 * Created by Thor on 2019-03-25 下午 04:10.
 */
const koa = require('koa'),
    router = require('koa-router')(),
    mongoose = require('mongoose'),
    app = new koa(),
    port = process.env.PORT || 5000;

router.get('/', async ctx => ctx.body = {msg: 'hello Koa'})
mongoose.connect('mongodb+srv://jiaxuyang:jiaxuyang@koadb-rs08k.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
.then(() => console.log('success'))
.catch(err => console.log(err))

// 配置路由
app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => console.log(`app started at ${port}...`))