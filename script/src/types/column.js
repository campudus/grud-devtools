"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageType = exports.ColumnKind = exports.ColumnID = void 0;
const ColumnID = (id) => id;
exports.ColumnID = ColumnID;
exports.ColumnKind = {
    attachment: "attachment",
    boolean: "boolean",
    concat: "concat",
    currency: "currency",
    date: "date",
    datetime: "datetime",
    group: "group",
    integer: "integer",
    link: "link",
    numeric: "numeric",
    richtext: "richtext",
    shorttext: "shorttext",
    status: "status",
    text: "text",
};
exports.LanguageType = {
    language: "language",
    country: "country",
    neutral: "neutral",
};
