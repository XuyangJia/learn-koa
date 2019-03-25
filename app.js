/**
 * Created by Thor on 2019-03-25 下午 04:10.
 */
const koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    controller = require('./controller'),
    templating = require('./templating'),
    app = new koa(),
    isProduction = process.env.NODE_ENV === 'production';

// 记录URL以及页面执行时间
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    let start = Date.now(), execTime;
    await next();
    execTime = Date.now() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);

});
// 处理静态文件
if (!isProduction) {
    const staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
// 解析POST请求
app.use(bodyParser());
// 使用模板
app.use(templating('views', {noCache: !isProduction, watch: !isProduction}));
// 处理URL路由
app.use(controller());
app.listen(3000, () => { console.log('app started at 3000...'); });