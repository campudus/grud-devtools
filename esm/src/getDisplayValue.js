import * as r from "ramda";
import * as i from "./grud-intl.js";
import { isAttachmentColumn, isBooleanColumn, isConcatColumn, isCurrencyColumn, isDateColumn, isDateTimeColumn, isGroupColumn, isIntegerColumn, isLinkColumn, isMultilangColumn, isNumberColumn, isRichtextColumn, isShorttextColumn, isStatusColumn, isTextColumn, } from "./predicates.js";
import { condSelect, joinMultilangValues, map } from "./tools.js";
const mkDisplayMap = (langs, column, value, format) => {
    const extractValue = isMultilangColumn(column)
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
export const getDisplayValue = (langs) => (userLang) => {
    // cache fns
    const getNestedValues = (columns, values) => {
        return joinMultilangValues(langs, r.flatten(map((col, val) => go(col, val), columns, values)));
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
    const getLinkValue = (column, value) => value.map((v) => getDisplayValue(langs)(userLang)(column.toColumn, v));
    const getStatusValue = (column, value) => {
        const statusValues = column.rules
            .filter((_, idx) => !!r.nth(idx, value))
            .map(r.prop("displayName"));
        return joinMultilangValues(langs, statusValues);
    };
    function go(column, cellValue) {
        if (arguments.length < 2) {
            return (value) => go(column, value);
        }
        try {
            const fn = condSelect([
                [isAttachmentColumn, getAttachmentValues],
                [isBooleanColumn, getBooleanValue],
                [isConcatColumn, getConcatValue],
                [isCurrencyColumn, getCurrencyValue],
                [isDateColumn, getDateValue],
                [isDateTimeColumn, getDateTimeValue],
                [isGroupColumn, getGroupValue],
                [isIntegerColumn, getIntegerValue],
                [isLinkColumn, getLinkValue],
                [isNumberColumn, getNumberValue],
                [isRichtextColumn, getPlainValue],
                [isShorttextColumn, getPlainValue],
                [isStatusColumn, getStatusValue],
                [isTextColumn, getPlainValue],
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
