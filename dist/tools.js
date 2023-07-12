"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinMultilangValues = exports.map = exports.condSelect = void 0;
const r = require("ramda");
const grud_intl_1 = require("./grud-intl");
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
        (0, grud_intl_1.getLanguage)(lt),
        grud_intl_1.DEFAULT_LOCALE,
        grud_intl_1.DEFAULT_LANG,
    ]))))(vals);
    return accum;
}, {});
exports.joinMultilangValues = joinMultilangValues;
//# sourceMappingURL=tools.js.map