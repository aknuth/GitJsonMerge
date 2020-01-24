"use strict";
//import { combineMergers, trimergeEquality, trimergeJsonObject } from 'trimerge';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deep = __importStar(require("deep-diff"));
//import { Diff } from 'deep-diff';
const werte_o_json_1 = __importDefault(require("./jsonmerge/werte_o.json"));
const werte_a_json_1 = __importDefault(require("./jsonmerge/werte_a.json"));
const werte_b_json_1 = __importDefault(require("./jsonmerge/werte_b.json"));
// const s1 = { hello: 1, world: 2 };
// const s2 = { hello: 1, world: 2, there: 2 };
// const s3 = { hello: 1 };
// const merger = combineMergers(trimergeEquality, trimergeJsonObject);
// let out = merger(s1, s2, s3); // => { hello: 1, there: 2 }
let out1 = deep.diff(werte_o_json_1.default, werte_a_json_1.default);
let out2 = deep.diff(werte_o_json_1.default, werte_b_json_1.default);
console.log(out1, out2);
