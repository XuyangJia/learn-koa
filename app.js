/**
 * Created by Thor on 2019-03-25 下午 04:10.
 */
const koa = require('koa'),
    router = require('koa-router')(),
    app = new koa()

app.use(router.routes())
app.listen(3000, () => console.log('app started at 3000...'))