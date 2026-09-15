"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinMultilangValues = exports.map = exports.condSelect = void 0;
const r = __importStar(require("ramda"));
const grud_intl_js_1 = require("./grud-intl.js");
const condSelect = (conditions) => (value) => {
    for (const [pred, result] of conditions) {
        if (pred(value))
            return result;
    }
    throw new Error("Non exhaustive pattern");
};
exports.condSelect = condSelect;
const map = (fn, ...colls) => {
    const len = Math.min(...colls.map((c) => c.length));
    const result = new Array(len);
    for (let i = 0; i < len; i++)
        result[i] = fn(...colls.map(r.nth(i)));
    return result;
};
exports.map = map;
const joinMultilangValues = (langs, vals) => langs.reduce((accum, lt) => {
    accum[lt] = r.compose(r.trim, r.join(" "), r.filter((dv) => !!dv), r.flatten, r.map(r.compose(r.find((x) => !!x), r.props([
        lt,
        (0, grud_intl_js_1.getLanguage)(lt),
        grud_intl_js_1.DEFAULT_LOCALE,
        grud_intl_js_1.DEFAULT_LANG,
    ]))))(vals);
    return accum;
}, {});
exports.joinMultilangValues = joinMultilangValues;
