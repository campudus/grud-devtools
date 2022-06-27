import { TableID } from "./table";
import { MultilangValue } from "./common";

export type ColumnID = number;

export const ColumnKind = {
  text: "text",
  richtext: "richtext",
  shorttext: "shorttext",
  number: "number",
  currency: "currency",
  link: "link",
  concat: "concat",
  group: "group",
  attachment: "attachment",
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
} as const;
export type ColumnKind = typeof ColumnKind[keyof typeof ColumnKind];

export interface ColumnAttributeMap {
  [name: string]: boolean | undefined;
}

interface BaseColumn {
  id: ColumnID;
  ordering: number;
  name: string;
  identifier: boolean;
  displayName: MultilangValue<string>;
  description: MultilangValue<string>;
  separator: boolean;
  attributes: ColumnAttributeMap;
}

interface SingleLangColumn<Kind extends ColumnKind> extends BaseColumn {
  multilanguage: false;
  kind: Kind;
}

interface MultilangColumn<Kind extends ColumnKind> extends BaseColumn {
  multilanguage: true;
  kind: Kind;
  languagetype?: "language";
}

interface MultiCountryColumn<Kind extends ColumnKind> extends BaseColumn {
  multilanguage: true;
  kind: Kind;
  languagetype: "country";
}

type SingleOrMultilangColumn<Kind extends ColumnKind> =
  | SingleLangColumn<Kind>
  | MultilangColumn<Kind>;

export interface ConcatColumn extends BaseColumn {
  kind: typeof ColumnKind.concat;
  multilanguage: boolean;
  languagetype?: "language";
  name: "ID";
  concats: Array<Column>;
}

export interface GroupColumn extends BaseColumn {
  name: string;
  kind: typeof ColumnKind.group;
  multilanguage: boolean;
  languageType?: "language";
  groups: Array<Column>;
}

export interface LinkColumn extends BaseColumn {
  kind: typeof ColumnKind.link;
  multilanguage: false;
  toColumn: Column;
  toTable: TableID;
  constraint?: {
    cardinality?: { from?: number; to?: number };
    deleteCascade: boolean;
  };
}

export type AttachmentColumn = SingleOrMultilangColumn<"attachment">;
export type BooleanColumn = SingleLangColumn<"boolean">;
export type CurrencyColumn = MultiCountryColumn<"currency">;
export type NumberColumn = SingleOrMultilangColumn<"number">;
export type RichTextColumn = SingleOrMultilangColumn<"richtext">;
export type ShortTextColumn = SingleOrMultilangColumn<"shorttext">;
export type TextColumn = SingleOrMultilangColumn<"text">;
export type DateColumn = SingleOrMultilangColumn<"date">;
export type DateTimeColumn = SingleOrMultilangColumn<"datetime">;

export type Column =
  | AttachmentColumn
  | BooleanColumn
  | ConcatColumn
  | CurrencyColumn
  | DateColumn
  | DateTimeColumn
  | GroupColumn
  | LinkColumn
  | NumberColumn
  | RichTextColumn
  | ShortTextColumn
  | TextColumn;
