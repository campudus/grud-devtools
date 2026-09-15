import * as r from "ramda";
import { DEFAULT_LANG, DEFAULT_LOCALE, getLanguage, } from "./grud-intl.js";
export const condSelect = (conditions) => (value) => {
    for (const [pred, result] of conditions) {
        if (pred(value))
            return result;
    }
    throw new Error("Non exhaustive pattern");
};
export const map = (fn, ...colls) => {
    const len = Math.min(...colls.map((c) => c.length));
    const result = new Array(len);
    for (let i = 0; i < len; i++)
        result[i] = fn(...colls.map(r.nth(i)));
    return result;
};
export const joinMultilangValues = (langs, vals) => langs.reduce((accum, lt) => {
    accum[lt] = r.compose(r.trim, r.join(" "), r.filter((dv) => !!dv), r.flatten, r.map(r.compose(r.find((x) => !!x), r.props([
        lt,
        getLanguage(lt),
        DEFAULT_LOCALE,
        DEFAULT_LANG,
    ]))))(vals);
    return accum;
}, {});
