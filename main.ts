import {walk} from './lib/walk';
import {start} from './lib/server/serve';

const fs = require('fs');
const MarkdownIt = require('markdown-it'), md = new MarkdownIt();

let paths = walk('./blogs');
let htmls = paths.map(v => md.render(fs.readFileSync(v, 'utf8')));
console.log(htmls)

start({
    port: 9999,
    routes: {
        '/': (req, res) => res.write(htmls[0])
    }
})