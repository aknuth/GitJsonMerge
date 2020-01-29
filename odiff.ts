import odiff from "odiff";
import fse from "fs-extra";

// import s1 from './data/change1/werte_o.json';
// import s2 from './data/change1/werte_a.json';
// import s3 from './data/change1/werte_b.json';

// import s4 from './data/add/werte_o.json';
// import s5 from './data/add/werte_a.json';
// import s6 from './data/add/werte_b.json';

// import s7 from './data/delete/werte_o.json';
// import s8 from './data/delete/werte_a.json';
// import s9 from './data/delete/werte_b.json';

const s1 = fse.readJsonSync('./data/change1/werte_o.json');
const s2 = fse.readJsonSync('./data/change1/werte_a.json');
const s3 = fse.readJsonSync('./data/change1/werte_b.json');

const s4 = fse.readJsonSync('./data/add/werte_o.json');
const s5 = fse.readJsonSync('./data/add/werte_a.json');
const s6 = fse.readJsonSync('./data/add/werte_b.json');

const s7 = fse.readJsonSync('./data/delete/werte_o.json');
const s8 = fse.readJsonSync('./data/delete/werte_a.json');
const s9 = fse.readJsonSync('./data/delete/werte_b.json');

let out1 =  odiff(s1, s2);
let out2 =  odiff(s1, s3);
console.log('changed',out1, out2);

let out3 =  odiff(s4, s5);
let out4 =  odiff(s4, s6);
console.log('add',out3, out4);

let out5 =  odiff(s7, s8);
let out6 =  odiff(s7, s9);
console.log('delete',out5, out6);

