//const JSON_FILE = 'kataloge.json';
const JSON_FILE = 'werte.json';
const gitP = require('simple-git/promise');
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path');
const util = require('util');
const cp = require('child_process');
const exec = cp.exec;
const execPromise = util.promisify(exec);


const gitdir = path.resolve(__dirname,'jsongit','.git');
const kFileOrig = path.resolve(__dirname,JSON_FILE);
const kFileGit = path.resolve(__dirname,'jsongit',JSON_FILE);
const REPO = path.resolve(__dirname,'jsongit');
let json = require(kFileOrig);

const git = gitP(REPO);

(async () => {
    await fse.outputJson(kFileGit, json, { spaces: 1, EOL: '\n' })
    await fse.remove(gitdir);
    await git.init();
    await git.add('./*');
    await git.commit("first commit!");
    
    //await execPromise('npx npm-merge-driver install',{cwd:gitdir});
    //cp.execSync(`git config merge.json.driver "$(npm bin)/git-json-merge %A %O %B"`,{cwd:gitdir});
    cp.execSync(`git config merge.json.driver "node ../git-json-merge.js %A %O %B"`,{cwd:REPO});
    cp.execSync(`git config merge.json.name "custom merge driver for json files"`,{cwd:gitdir});
    let attrFile = path.join(gitdir, 'info', 'attributes')
    fs.writeFileSync(attrFile, '*.json merge=json');

    await git.checkout(['-b', 'new-branch']);
    //json[0]['katalogtyp']='ZENTRALDATEI';
    console.log(json[0]['Dezimale']['content']);
    json[0]['Dezimale']['content']=1.003
    await fse.outputJson(kFileGit, json, { spaces: 1, EOL: '\n' })
    await git.add('./*');
    await git.commit('branch commit');
    
    await git.checkout(['master']);
    json = require(kFileOrig);
    //json[2]['katalogtyp']='STANDARD';
    json[1]['Dezimale']['content']=2.004
    await fse.outputJson(kFileGit, json, { spaces: 1, EOL: '\n' })
    await git.add('./*');
    await git.commit('master commit');

    mergeSummary = await git.merge(['new-branch']);
    console.log('ready: ',mergeSummary);
})().catch(e => {
    console.log(e);
});