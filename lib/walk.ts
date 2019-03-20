let fs = require("fs");
const klawSync = require('klaw-sync')

function walk(path = './__test__/test-files') {
    let paths = klawSync(path);
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