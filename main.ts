import {walk} from './lib/walk';
import {start} from './lib/server/serve';

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it'), md = new MarkdownIt();

let paths = walk('./blogs');

// let htmls = paths.map(v => md.render(fs.readFileSync(v, 'utf8')));

const getALinks = (paths, dir = '/blogs') => {
    let html = ``;
    paths.forEach(v => {
        let blog_path = path.relative(__dirname + dir,v);
        html += `<div><a href="/blog/${blog_path}">${blog_path}</a></div>`
        // console.log()
    });
    return html;
    
}
const parseMDFromPath = (path) => {
    return md.render(fs.readFileSync(path, 'utf8'))
} 

start({
    port: 9999,
    ip:'0.0.0.0',
    routes: {
        '/': (req, res, ctx) => {
            console.log(req)
            ctx.ok();
            let html = getALinks(paths)
            res.write(html)
        },
        '/blog/:blog_path': (req, res, ctx) => {
            console.log(req.params.blog_path)
            ctx.ok();
            res.write(parseMDFromPath('./blogs/' + req.params.blog_path));
        }
    }
})