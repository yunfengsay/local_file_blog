const http = require('http');
const url = require("url");
const fs = require('fs');

const routeRules = [];
const contentTypes = {
    'html': 'text/html;charset=UTF-8',
    'text': 'text/plain;charset=UTF-8',
}

const defaultOptions = {
    port: 8999,
    ip: '0.0.0.0',
    routes: {}
}

const createRouteRules = (routes) => {
    return routes;
}

const findRoute = (routes, pathname) => {
    let func = null;
    let params = {};
    for(let route in routes) {
        // 暂时支持一个 路由绑定
        let r = route.split(':');
        if(pathname.startsWith(r[0])) {
            func = routes[route];
            params[r[1]] = pathname.slice(r[0].length, pathname.length);
        }
    }
    return {
        func: func,
        params: params
    };
}

function route(routes, pathname: string, request, response) {
    let ctx:any = {};
    let {func, params} = findRoute(routes, pathname);
    request.params = params;
    if (typeof func === 'function') {
        ctx.ok = (type = 'html') => response.writeHead(200, {'Content-Type': contentTypes[type]});
        func(request, response, ctx);
        response.end();
    } else {
            console.error("No request handler found for " + pathname);
            response.writeHead(404,{'Content-Type': 'text/plain;charset=UTF8'});
            response.write('🔧🔧🔧🔧🔧🔧🔧node.js: 404 Not found');
            response.end();
    }
}


function start(options = defaultOptions) {

    function onRequest(request, response) {
        request.setEncoding('utf8');
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(options.routes, pathname, request,response);
    }

    http.createServer(onRequest).listen(options.port, options.ip);
    console.log('---------------------  local_file_blog📚  ---------------------------');
    console.log(`🔧 🏃 🏃 🏃 🔧  Server Listerning at http://${options.ip}:${options.port} `);
    console.log('--------------------------------------------------------------------');

}

export {
    start
}
