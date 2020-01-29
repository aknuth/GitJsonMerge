import odiff from "odiff";
import fse from "fs-extra";

const h1 = fse.readJsonSync('./data/huge/werte_o.json');
const h2 = fse.readJsonSync('./data/huge/werte_a.json');
const h3 = fse.readJsonSync('./data/huge/werte_b.json');
console.log(JSON.stringify(h1).substr(0,100));

let hout1 =  odiff(h1, h2);
let hout2 =  odiff(h1, h3);
console.log('changed',hout1, hout2);