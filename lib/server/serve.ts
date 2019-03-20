const http = require('http');
const url = require("url");

const contentTypes = {
    'html': 'text/html;charset=UTF-8',
    'text': 'text/plain;charset=UTF-8',
}

const defaultOptions = {
    port: 8999,
    routes: {}
}

function route(routes, pathname: string, request, response) {
    if (typeof routes[pathname] === 'function') {
        let fn = routes[pathname];
        fn.ok = (type = 'html') => response.writeHead(200, {'Content-Type': contentTypes[type]});
        fn.ok();
        fn(request, response);
        response.end();
    } else {
        console.log("No request handler found for " + pathname);
            response.writeHead(404,{'Content-Type': 'text/plain'});
            response.write('node.js: 404 Not found');
            response.end();
    }
}


function start(options = defaultOptions) {

    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(options.routes, pathname, request,response);
    }

    http.createServer(onRequest).listen(options.port);
    console.log(`🔧🏃🏃🏃 Server Listerning at ${options.port} `);

}

export {
    start
}
