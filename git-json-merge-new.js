#! /usr/bin/env node

let bunyan = require('bunyan');
let log = bunyan.createLogger({
                                name: "myapp",
                                streams: [{
                                    path: '../logs/myapp-info.log',
                                    level: 'info'
                                }]
                            });

let encoding = 'utf-8';

let oursFileName = process.argv[2];
let baseFileName = process.argv[3];
let theirsFileName = process.argv[4];

let fs = require('fs');
let fse = require('fs-extra');
let _jdp = require("jsondiffpatch");

let jdp = _jdp.create({
    objectHash: function (obj) {
        // this function is used only to when objects are not equal by ref
        return obj.id;
    },
    arrays: {
        // default true, detect items moved inside the array (otherwise they will be registered as remove+add)
        detectMove: false,
        // default false, the value of items moved is not included in deltas
        includeValueOnMove: false
    }
})

function calculateDiff(fileContentLeft, fileContentRight) {
    let lhs = JSON.parse(fileContentLeft);
    let rhs = JSON.parse(fileContentRight);
    let changes = [];
    let delta = jdp.diff(lhs, rhs);
    let diff = { add: {}, delete: {}, changed: {} };
    Object.keys(delta).forEach((key) => {
        //delete
        if (key.startsWith('_')) {
            let newKey = key.substr(1);
            if (!isNaN(parseInt(newKey))) {
                diff.delete[newKey] = delta[key][0];
            }
        //add
        } else if (Array.isArray(delta[key])) {
            let firstElement = delta[key][0]
            diff.add[key] = firstElement
        //change
        } else {
            diff.changed[key] = delta[key];
        }
    })
    return diff;
}
function changeItems(arr){
    Object.keys(arr).forEach(key => {
        let index = parseInt(key);
        log.info(index);
        let value = arr[key];
        log.info(value.id);
        Object.keys(value).forEach((attr) => {
            if (clonedResult[index][attr] && clonedResult[index][attr]['content']){
                clonedResult[index][attr]['content']=value[attr]['content'][1];
            }
        })
    })
}
function insertItems(arr){
    Object.keys(arr).forEach((key) => {
        let index = parseInt(key);
        clonedResult.splice(index,0,arr[key]);
    })
}
function deleteItems(arr){
    Object.values(arr).forEach(value => {
        let index = clonedResult.findIndex(elm=>elm.id===value.id);
        if (index>-1){
            clonedResult.splice(index,1);
        }
    })
}

log.info('start');

let oursJson = fs.readFileSync(oursFileName, encoding);
let baseJson = fs.readFileSync(baseFileName, encoding);
let theirsJson = fs.readFileSync(theirsFileName, encoding);

let clonedResult = JSON.parse(baseJson)

let delta1 = calculateDiff(baseJson, oursJson);
let delta2 = calculateDiff(baseJson, theirsJson);

fse.outputJson('../logs/out1.log',delta1, { spaces: 1, EOL: '\n' })
fse.outputJson('../logs/out2.log',delta2, { spaces: 1, EOL: '\n' })

//change
changeItems(delta2.changed)
changeItems(delta1.changed)

//add
insertItems(delta2.add);
insertItems(delta1.add);

//delete
deleteItems(delta2.delete)
deleteItems(delta1.delete)

//fs.writeFileSync(oursFileName, clonedResult, encoding);
fse.outputJson(oursFileName,clonedResult, { spaces: 1, EOL: '\n' })