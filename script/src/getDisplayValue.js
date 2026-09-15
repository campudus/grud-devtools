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
exports.getDisplayValue = void 0;
const r = __importStar(require("ramda"));
const i = __importStar(require("./grud-intl.js"));
const predicates_js_1 = require("./predicates.js");
const tools_js_1 = require("./tools.js");
const mkDisplayMap = (langs, column, value, format) => {
    const extractValue = (0, predicates_js_1.isMultilangColumn)(column)
        ? (lt) => value[lt]
        : () => value;
    const getValue = format
        ? (lt) => format(lt, extractValue(lt))
        : extractValue;
    return langs.reduce((result, lt) => {
        result[lt] = getValue(lt);
        return result;
    }, {});
};
const attachmentToStringForLang = (lt, att) => {
    const fallbackLt = i.getLanguage(lt);
    return (att.title[lt] ||
        att.externalName[lt] ||
        att.title[fallbackLt] ||
        att.externalName[fallbackLt] ||
        att.title[i.DEFAULT_LANG] ||
        att.externalName[i.DEFAULT_LANG] ||
        att.internalName[lt] ||
        att.uuid);
};
const attachmentToMultilang = (langs) => (att) => langs.reduce((accum, lt) => {
    accum[lt] = attachmentToStringForLang(lt, att);
    return accum;
}, {});
const getDisplayValue = (langs) => (userLang) => {
    // cache fns
    const getNestedValues = (columns, values) => {
        return (0, tools_js_1.joinMultilangValues)(langs, r.flatten((0, tools_js_1.map)((col, val) => go(col, val), columns, values)));
    };
    const getConcatValue = (column, values) => getNestedValues(column.concats, values);
    const getGroupValue = (column, values) => getNestedValues(column.groups, values);
    const getAttachmentValues = (_, value) => value.map(attachmentToMultilang(langs));
    const getBooleanValue = (column, value) => {
        const formatBooleanVal = (lt, val) => val ? column.displayName[lt] ?? column.name : "";
        return mkDisplayMap(langs, column, value, formatBooleanVal);
    };
    const getCurrencyValue = (column, value) => {
        const formatCurrency = (lt, val) => i.formatCurrency(userLang ?? lt, i.getCurrency(lt), val);
        return mkDisplayMap(langs, column, value, formatCurrency);
    };
    const getNumberValue = (column, value) => {
        const formatNumber = (lt, val) => i.formatNumber(userLang ?? lt, column.separator, val);
        return mkDisplayMap(langs, column, value, formatNumber);
    };
    const getIntegerValue = (column, value) => {
        const formatInteger = (lt, val) => i.formatNumber(userLang ?? lt, column.separator, val);
        return mkDisplayMap(langs, column, value, formatInteger);
    };
    const getPlainValue = (column, value) => mkDisplayMap(langs, column, value);
    const getDateValue = (column, value) => {
        const formatDate = (lt, val) => i.formatDate(userLang ?? lt, val);
        return mkDisplayMap(langs, column, value, formatDate);
    };
    const getDateTimeValue = (column, value) => {
        const formatDateTime = (lt, val) => i.formatDateTime(userLang ?? lt, val);
        return mkDisplayMap(langs, column, value, formatDateTime);
    };
    const getLinkValue = (column, value) => value.map((v) => (0, exports.getDisplayValue)(langs)(userLang)(column.toColumn, v));
    const getStatusValue = (column, value) => {
        const statusValues = column.rules
            .filter((_, idx) => !!r.nth(idx, value))
            .map(r.prop("displayName"));
        return (0, tools_js_1.joinMultilangValues)(langs, statusValues);
    };
    function go(column, cellValue) {
        if (arguments.length < 2) {
            return (value) => go(column, value);
        }
        try {
            const fn = (0, tools_js_1.condSelect)([
                [predicates_js_1.isAttachmentColumn, getAttachmentValues],
                [predicates_js_1.isBooleanColumn, getBooleanValue],
                [predicates_js_1.isConcatColumn, getConcatValue],
                [predicates_js_1.isCurrencyColumn, getCurrencyValue],
                [predicates_js_1.isDateColumn, getDateValue],
                [predicates_js_1.isDateTimeColumn, getDateTimeValue],
                [predicates_js_1.isGroupColumn, getGroupValue],
                [predicates_js_1.isIntegerColumn, getIntegerValue],
                [predicates_js_1.isLinkColumn, getLinkValue],
                [predicates_js_1.isNumberColumn, getNumberValue],
                [predicates_js_1.isRichtextColumn, getPlainValue],
                [predicates_js_1.isShorttextColumn, getPlainValue],
                [predicates_js_1.isStatusColumn, getStatusValue],
                [predicates_js_1.isTextColumn, getPlainValue],
            ])(column);
            return cellValue !== undefined && cellValue !== null
                ? fn(column, cellValue.value ?? cellValue)
                : {};
        }
        catch (err) {
            if (/Non exhaustive/.test(err.message)) {
                console.error("Column kind not found:", column.kind);
            }
            throw err;
        }
    }
    return go;
};
exports.getDisplayValue = getDisplayValue;
