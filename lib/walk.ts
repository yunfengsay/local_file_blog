let fs = require("fs");
const klawSync = require('klaw-sync')

function walk(path = './') {
    let paths = klawSync(path, { nodir: true });
    paths = paths.map(v => v.path);
    return paths;
}



// function walk(path = './') {
//     let dirList = fs.readdirSync(path);

//     for(let p of dirList) {
//         let stat = fs.lstatSync(p);
//         if(stat.isDirectory()) {
//             dirList.append()
//         }
//     }
//     return dirList;
// }
export {
    walk
}