const router = require('koa-router')();
const User = require

/**
 * @route GET api/users/test
 * @description 测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async ctx => {
    ctx.status = 200
    ctx.body = {a:1,b:2}
})

module.exports = router.routes()