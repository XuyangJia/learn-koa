/**
 * Created by Thor on 2019-03-25 下午 08:11.
 */
const path = require('path'),
    mime = require('mime'),
    fs = require('mz/fs');

function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        if (rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length));
            if (await fs.exists(fp)) {
                ctx.response.type = mime.getType(rpath); // 获取文件类型
                ctx.response.body = await fs.readFile(fp);
            }
            else { // 文件不存在
                ctx.response.status = 404;
            }
        }
        else {
            await next();
        }
    };
}
module.exports = staticFiles;