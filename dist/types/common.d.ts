import * as Col from "./column";
import * as Cell from "./cell";
export type MultilangValue<T> = {
    [langtag: string]: T | undefined;
};
export type UUID = string & {
    readonly __tag: unique symbol;
};
export declare const UUID: (str: string) => UUID;
export type FolderID = number & {
    readonly __tag: unique symbol;
};
export declare const FolderID: (id: number) => FolderID;
export type ISODateString = string & {
    readonly __tag: unique symbol;
};
export declare const ISODateString: (date: string) => ISODateString;
export type Attachment = {
    ordering: number;
    url: MultilangValue<string>;
    uuid: UUID;
    folder: FolderID | null;
    folders: FolderID[];
    title: MultilangValue<string>;
    description: MultilangValue<string>;
    internalName: MultilangValue<string>;
    externalName: MultilangValue<string>;
    mimeType: MultilangValue<string>;
    createdAt: ISODateString;
    updatedAt: ISODateString;
};
type CellValueForColumnMap = {
    [Col.ColumnKind.attachment]: Cell.AttachmentCellValue;
    [Col.ColumnKind.boolean]: Cell.BooleanCellValue;
    [Col.ColumnKind.concat]: Cell.ConcatCellValue;
    [Col.ColumnKind.currency]: Cell.CurrencyCellValue;
    [Col.ColumnKind.date]: Cell.DateCellValue;
    [Col.ColumnKind.datetime]: Cell.DateTimeCellValue;
    [Col.ColumnKind.group]: Cell.GroupCellValue;
    [Col.ColumnKind.link]: Cell.LinkCellValue;
    [Col.ColumnKind.numeric]: Cell.NumberCellValue;
    [Col.ColumnKind.richtext]: Cell.RichTextCellValue;
    [Col.ColumnKind.shorttext]: Cell.ShortTextCellValue;
    [Col.ColumnKind.status]: Cell.StatusCellValue;
    [Col.ColumnKind.text]: Cell.TextCellValue;
};
type CellDisplayValueForColumnMap = {
    [Col.ColumnKind.attachment]: MultilangValue<string>[];
    [Col.ColumnKind.boolean]: MultilangValue<string>;
    [Col.ColumnKind.concat]: MultilangValue<string>;
    [Col.ColumnKind.currency]: MultilangValue<string>;
    [Col.ColumnKind.date]: MultilangValue<string>;
    [Col.ColumnKind.datetime]: MultilangValue<string>;
    [Col.ColumnKind.group]: MultilangValue<string>;
    [Col.ColumnKind.link]: MultilangValue<string>[];
    [Col.ColumnKind.numeric]: MultilangValue<string>;
    [Col.ColumnKind.richtext]: MultilangValue<string>;
    [Col.ColumnKind.shorttext]: MultilangValue<string>;
    [Col.ColumnKind.status]: MultilangValue<string>;
    [Col.ColumnKind.text]: MultilangValue<string>;
};
export type CellValueForColumn<T extends Col.Column> = CellValueForColumnMap[T["kind"]];
export type DisplayValueForColumn<T extends Col.Column> = CellDisplayValueForColumnMap[T["kind"]];
export {};
//# sourceMappingURL=common.d.ts.map