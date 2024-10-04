import type * as Col from "./column.ts";
import type * as Cell from "./cell.ts";

export type MultilangValue<T> = {
  [langtag: string]: T | undefined;
};

export type UUID = string & { readonly __tag: unique symbol };
export const UUID = (str: string) => str as UUID;

export type FolderID = number & { readonly __tag: unique symbol };
export const FolderID = (id: number) => id as FolderID;

export type ISODateString = string & { readonly __tag: unique symbol };
export const ISODateString = (date: string) => {
  const ISODateRegex = /\d{4}-\d\d-\d\d(T\d\d:\d\d:\d\d(\.\d{3})?)?/;
  if (!ISODateRegex.test(date)) {
    throw new Error(`${date} is not an ISO date`);
  }
  return date as ISODateString;
};

export type Attachment = {
  ordering: number;
  url: MultilangValue<string>; // GRUD attachment url, relative to /api/
  uuid: UUID;
  folder: FolderID | null; // Subfolder's ID. `null` if in root folder
  folders: FolderID[]; // Breadcrumb path of parent folders
  title: MultilangValue<string>; // overrides file's display name
  description: MultilangValue<string>;
  internalName: MultilangValue<string>; // basically unused uuid+file extension, different from file's uuid
  externalName: MultilangValue<string>; // File's display name
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

export type CellValueForColumn<T extends Col.Column> =
  CellValueForColumnMap[T["kind"]];
export type DisplayValueForColumn<T extends Col.Column> =
  CellDisplayValueForColumnMap[T["kind"]];
