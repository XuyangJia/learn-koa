/**
 * Created by Thor on 2019-03-25 下午 04:49.
 */
const fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index Page</h1>
        <form action="/signin" method="post">
            <p>username:<input name="name" value="koa"></p>
            <p>password:<input name="pass" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};
const fn_signin = async (ctx, next) => {
    const name = ctx.request.body.name || '',
        pass = ctx.request.body.pass || '';
    console.info(`signin with name: ${name}, password: ${pass}`);
    if (name === 'koa' && pass === '123456')
        ctx.response.body = `<h1>Welcome ${name}</h1>`;
    else
        ctx.response.body = `<h1>Login field!</h1>
        <p><a href="/">Please try again!</a> </p>`;
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};