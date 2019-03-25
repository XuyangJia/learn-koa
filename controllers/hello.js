/**
 * Created by Thor on 2019-03-25 下午 06:13.
 */
const fn_hello = async (ctx, next) => {
    ctx.response.body = `<h1>Welcome</h1>`;
};

module.exports = {
    'GET /hello': fn_hello
};