import type { Country } from "../grud-intl.ts";
import type { MultilangValue } from "./common.ts";
import type { TableID } from "./table.ts";

export type ColumnID = number & { readonly __tag: unique symbol };
export const ColumnID = (id: number) => id as ColumnID;

export const ColumnKind = {
  attachment: "attachment",
  boolean: "boolean",
  concat: "concat",
  currency: "currency",
  date: "date",
  datetime: "datetime",
  group: "group",
  link: "link",
  numeric: "numeric",
  richtext: "richtext",
  shorttext: "shorttext",
  status: "status",
  text: "text",
} as const;
export type ColumnKind = (typeof ColumnKind)[keyof typeof ColumnKind];

export type ColumnAttributeString = { type: "string"; value: string };
export type ColumnAttributeNumber = { type: "number"; value: number };
export type ColumnAttributeBoolean = { type: "boolean"; value: boolean };
export type ColumnAttributeArray = { type: "array"; value: ColumnAttribute[] };
export type ColumnAttribute =
  | ColumnAttributeString
  | ColumnAttributeBoolean
  | ColumnAttributeNumber
  | ColumnAttributeArray;

export interface ColumnAttributeMap {
  [key: string]: ColumnAttribute;
}

interface BaseColumn {
  attributes: ColumnAttributeMap;
  description: MultilangValue<string>;
  displayName: MultilangValue<string>;
  format?: string;
  id: ColumnID;
  identifier: boolean;
  name: string;
  ordering: number;
  separator: boolean;
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
  countryCodes: Array<Country>;
}

export type StatusConditionValue<T = unknown> = {
  column: ColumnID;
  operator: "IS" | "NOT";
  value: T;
};

export type StatusCondition = {
  composition: "OR" | "AND";
  values: Array<StatusCondition | StatusConditionValue>;
};

export interface StatusColumn extends BaseColumn {
  multilanguage: false;
  kind: typeof ColumnKind.status;
  rules: {
    name: string;
    displayName: MultilangValue<string>;
    color: string;
    icon: { type: string; value: string };
    tooltip: MultilangValue<string>;
    conditions: StatusCondition;
  }[];
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
export type NumberColumn = SingleOrMultilangColumn<"numeric">;
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
  | StatusColumn
  | TextColumn;
