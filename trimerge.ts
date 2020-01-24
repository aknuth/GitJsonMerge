//import { combineMergers, trimergeEquality, trimergeJsonObject } from 'trimerge';

import * as deep from 'deep-diff';
//import { Diff } from 'deep-diff';

import s1 from './jsonmerge/werte_o.json';
import s2 from './jsonmerge/werte_a.json';
import s3 from './jsonmerge/werte_b.json';
// const s1 = { hello: 1, world: 2 };
// const s2 = { hello: 1, world: 2, there: 2 };
// const s3 = { hello: 1 };

// const merger = combineMergers(trimergeEquality, trimergeJsonObject);
// let out = merger(s1, s2, s3); // => { hello: 1, there: 2 }

let out1 =  deep.diff(s1, s2);
let out2 =  deep.diff(s1, s3);

console.log(out1, out2);