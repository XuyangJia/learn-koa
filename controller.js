/**
 * Created by Thor on 2019-03-25 下午 05:24.
 */
const fs = require('fs');

const addMapping = (router, mapping) => {
    for (url in mapping) {
        if (!/GET|POST/i.test(url)) {
            console.log(`Invalid URL!${url}`);
            return;
        }
        const result = url.match(/(GET|POST) (\S+)/);
        router[result[1].toLowerCase()](result[2], mapping[url]);
        console.log(`Rregister URL mapping: ${url}`);
    }
};

const addControllers = (router, dir) => {
    console.warn(dir);
    const searchDir  = `${__dirname}/${dir}/`,
        js_files  = fs.readdirSync(searchDir).filter(f => {return f.endsWith('.js');});

    for (let f of js_files) {
        console.log(`Process controller: ${f}...`);
        addMapping(router, require(searchDir + f));
    }
};

module.exports = dir => {
    const controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};