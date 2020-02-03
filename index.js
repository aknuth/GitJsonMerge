//const JSON_FILE = 'kataloge.json';
const JSON_FILE_ORIG = 'werte_o.json';
const JSON_FILE_ADD = 'werte_a.json';
const gitP = require('simple-git/promise');
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path');
const util = require('util');
const cp = require('child_process');
const exec = cp.exec;
const execPromise = util.promisify(exec);


const kFileOrig = path.resolve(__dirname,'data','add',JSON_FILE_ORIG);
const kFileAdd = path.resolve(__dirname,'data','add',JSON_FILE_ADD);

const gitdir = path.resolve(__dirname,'jsongit','.git');

const kFileGit = path.resolve(__dirname,'jsongit',"werte.json");

const REPO = path.resolve(__dirname,'jsongit');
const LOGS = path.resolve(__dirname,'logs');

const git = gitP(REPO);

(async () => {
    await fse.remove(LOGS);
    await fse.ensureDir(LOGS);
    await fse.remove(gitdir);

    let json = fse.readJsonSync(kFileOrig);
    await fse.outputJson(kFileGit, json, { spaces: 1, EOL: '\n' })
    await git.init();
    await git.add('./*');
    await git.commit("first commit!");
    
    //await execPromise('npx npm-merge-driver install',{cwd:gitdir});
    //cp.execSync(`git config merge.json.driver "$(npm bin)/git-json-merge %A %O %B"`,{cwd:gitdir});
    cp.execSync(`git config merge.json.driver "node ../git-json-merge-new.js %A %O %B"`,{cwd:REPO});
    cp.execSync(`git config merge.json.name "custom merge driver for json files"`,{cwd:gitdir});
    let attrFile = path.join(gitdir, 'info', 'attributes')
    fs.writeFileSync(attrFile, '*.json merge=json');

    await git.checkout(['-b', 'new-branch']);
    //json[0]['katalogtyp']='ZENTRALDATEI';
    //console.log(json[0]['Dezimale']['content']);
    json[0]['Dezimale']['content']=1.003
    await fse.outputJson(kFileGit, json, { spaces: 1, EOL: '\n' })
    //await fse.outputJson(kFileGit, json);
    await git.add('./*');
    await git.commit('branch commit');
    
    await git.checkout(['master']);
    json = fse.readJsonSync(kFileAdd);
    //json[2]['katalogtyp']='STANDARD';
    json[1]['Dezimale']['content']=2.004
    await fse.outputJson(kFileGit, json, { spaces: 1, EOL: '\n' })
    //await fse.outputJson(kFileGit, json);
    await git.add('./*');
    await git.commit('master commit');

    mergeSummary = await git.merge(['new-branch']);
    console.log('ready: ',mergeSummary);
})().catch(e => {
    console.log(e);
});