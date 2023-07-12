"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisplayValue = void 0;
const i = require("./grud-intl");
const r = require("ramda");
const predicates_1 = require("./predicates");
const tools_1 = require("./tools");
const mkDisplayMap = (langs, column, value, format) => {
    const extractValue = (0, predicates_1.isMultilangColumn)(column)
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
    const getNestedValues = (columns, values) => {
        return (0, tools_1.joinMultilangValues)(langs, r.flatten((0, tools_1.map)((col, val) => go(col, val), columns, values)));
    };
    const getConcatValue = (column, values) => getNestedValues(column.concats, values);
    const getGroupValue = (column, values) => getNestedValues(column.groups, values);
    const getAttachmentValues = (_, value) => value.map(attachmentToMultilang(langs));
    const getBooleanValue = (column, value) => {
        const formatBooleanVal = (lt, val) => { var _a; return val ? (_a = column.displayName[lt]) !== null && _a !== void 0 ? _a : column.name : ""; };
        return mkDisplayMap(langs, column, value, formatBooleanVal);
    };
    const getCurrencyValue = (column, value) => {
        const formatCurrency = (lt, val) => i.formatCurrency(userLang !== null && userLang !== void 0 ? userLang : lt, i.getCurrency(lt), val);
        return mkDisplayMap(langs, column, value, formatCurrency);
    };
    const getNumberValue = (column, value) => {
        const formatNumber = (lt, val) => i.formatNumber(userLang !== null && userLang !== void 0 ? userLang : lt, val);
        return mkDisplayMap(langs, column, value, formatNumber);
    };
    const getPlainValue = (column, value) => mkDisplayMap(langs, column, value);
    const getDateValue = (column, value) => {
        const formatDate = (lt, val) => i.formatDate(userLang !== null && userLang !== void 0 ? userLang : lt, val);
        return mkDisplayMap(langs, column, value, formatDate);
    };
    const getDateTimeValue = (column, value) => {
        const formatDateTime = (lt, val) => i.formatDateTime(userLang !== null && userLang !== void 0 ? userLang : lt, val);
        return mkDisplayMap(langs, column, value, formatDateTime);
    };
    const getLinkValue = (column, value) => value.map((v) => (0, exports.getDisplayValue)(langs)(userLang)(column.toColumn, v));
    const getStatusValue = (column, value) => {
        const statusValues = column.rules
            .filter((_, idx) => !!r.nth(idx, value))
            .map(r.prop("displayName"));
        return (0, tools_1.joinMultilangValues)(langs, statusValues);
    };
    function go(column, cellValue) {
        var _a;
        if (arguments.length < 2)
            return (value) => go(column, value);
        try {
            const fn = (0, tools_1.condSelect)([
                [predicates_1.isAttachmentColumn, getAttachmentValues],
                [predicates_1.isBooleanColumn, getBooleanValue],
                [predicates_1.isConcatColumn, getConcatValue],
                [predicates_1.isCurrencyColumn, getCurrencyValue],
                [predicates_1.isDateColumn, getDateValue],
                [predicates_1.isDateTimeColumn, getDateTimeValue],
                [predicates_1.isGroupColumn, getGroupValue],
                [predicates_1.isLinkColumn, getLinkValue],
                [predicates_1.isNumberColumn, getNumberValue],
                [predicates_1.isRichtextColumn, getPlainValue],
                [predicates_1.isShorttextColumn, getPlainValue],
                [predicates_1.isStatusColumn, getStatusValue],
                [predicates_1.isTextColumn, getPlainValue],
            ])(column);
            return cellValue !== undefined && cellValue !== null
                ? fn(column, (_a = cellValue.value) !== null && _a !== void 0 ? _a : cellValue)
                : {};
        }
        catch (err) {
            if (/Non exhaustive/.test(err.message))
                console.error("Column kind not found:", column.kind);
            throw err;
        }
    }
    return go;
};
exports.getDisplayValue = getDisplayValue;
//# sourceMappingURL=getDisplayValue.js.map