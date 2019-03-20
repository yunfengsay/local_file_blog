import { expect } from 'chai';
import 'mocha';
import { walk } from '../lib/walk';

describe('walk test', () => {
  it('should return all files', () => {
    // console.log(process.execPath)
    // console.log(__dirname)
    // console.log(process.cwd()) 
    let filesPath = __dirname + '/test-files';
    let result = walk(filesPath);
    console.log(result)
    // [index.md, blog.md, life/life.md]
    let expectResult = ['blog.md', 'index.md', 'life/life.md'];
    result.forEach((v, i) => {
      expect(v).to.equal(expectResult[i]);
    });
  });
});