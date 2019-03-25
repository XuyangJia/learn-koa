/**
 * Created by Thor on 2019-03-25 下午 06:26.
 */
const nunjucks = require('nunjucks');

 function createEnv(path, opts) {
     const autoescape = opts.autoescape || true,
         noCache = opts.noCache || false,
         watch = opts.watch || false,
         throwOnUndefined = opts.throwOnUndefined || false,
         env = new nunjucks.Environment(
             new nunjucks.FileSystemLoader(path || 'views', {noCache, watch}),
             {autoescape, throwOnUndefined}
         );
     if (opts.filters) {
         for (const f in opts.filters) {
             env.addFilter(f, opts.filters[f]);
         }
     }
     return env;
 }
function templating(path, opts) {
    const env = createEnv(path, opts);
    return async (ctx, next) => {
        ctx.render = (view, model) => {
            ctx.response.type = 'text/html';
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
        };
        await next();
    };
}
module.exports = templating;