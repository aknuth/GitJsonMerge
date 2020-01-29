import * as _jdp from "jsondiffpatch";
import fse from "fs-extra";

const s1 = fse.readJsonSync('./data/change1/werte_o.json');
const s2 = fse.readJsonSync('./data/change1/werte_a.json');
const s3 = fse.readJsonSync('./data/change1/werte_b.json');

const s4 = fse.readJsonSync('./data/add/werte_o.json');
const s5 = fse.readJsonSync('./data/add/werte_a.json');
// const s6 = fse.readJsonSync('./data/add/werte_b.json');

const s7 = fse.readJsonSync('./data/delete/werte_o.json');
const s8 = fse.readJsonSync('./data/delete/werte_a.json');
const s9 = fse.readJsonSync('./data/delete/werte_b.json');

const h1 = fse.readJsonSync('./data/huge/werte_o.json');
const h2 = fse.readJsonSync('./data/huge/werte_a.json');
const h3 = fse.readJsonSync('./data/huge/werte_b.json');
let jdp = _jdp.create({objectHash: function(obj:any) {
    // this function is used only to when objects are not equal by ref
    return obj.id;
},
arrays: {
    // default true, detect items moved inside the array (otherwise they will be registered as remove+add)
    detectMove: false,
    // default false, the value of items moved is not included in deltas
    includeValueOnMove: false
}})
let out1 =  jdp.diff(s1, s2);
let out2 =  jdp.diff(s1, s3);
console.log('+++++++++++++++++++++++++++++++++');
//console.log('changed',JSON.stringify(out1));
console.log('changed',out1);
console.log('---------------------------------');
console.log('changed',out2);

console.log('+++++++++++++++++++++++++++++++++');
let out3 =  jdp.diff(s4, s5);
// let out4 =  jdp.diff(s4, s6);
console.log('add',out3);
console.log('---------------------------------');
// console.log('add',out4);
console.log('+++++++++++++++++++++++++++++++++');

let out5 =  jdp.diff(s7, s8);
let out6 =  jdp.diff(s7, s9);
// console.log('delete',out5);
// console.log('---------------------------------');
// console.log('delete',out6);
// console.log('+++++++++++++++++++++++++++++++++');

let hout1 =  jdp.diff(h1, h2);
let hout2 =  jdp.diff(h1, h3);
console.log('+++++++++++++++++++++++++++++++++');
console.log('changed',hout1);
console.log('---------------------------------');
console.log('delete',hout2);