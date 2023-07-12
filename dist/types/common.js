"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISODateString = exports.FolderID = exports.UUID = void 0;
const Col = require("./column");
const UUID = (str) => str;
exports.UUID = UUID;
const FolderID = (id) => id;
exports.FolderID = FolderID;
const ISODateString = (date) => {
    const ISODateRegex = /\d{4}-\d\d-\d\d(T\d\d:\d\d:\d\d(\.\d{3})?)?/;
    if (!ISODateRegex.test(date)) {
        throw new Error(`${date} is not an ISO date`);
    }
    return date;
};
exports.ISODateString = ISODateString;
//# sourceMappingURL=common.js.map