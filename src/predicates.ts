import type {
  AttachmentColumn,
  BooleanColumn,
  Column,
  ConcatColumn,
  CurrencyColumn,
  DateColumn,
  DateTimeColumn,
  LinkColumn,
  NumberColumn,
  RichTextColumn,
  ShortTextColumn,
  StatusColumn,
  TextColumn,
} from "./types/index.ts";
import { ColumnKind } from "./types/index.ts";

export const isMultilangColumn = (column: Column) => column.multilanguage;

export const isAttachmentColumn = (
  column: Column,
): column is AttachmentColumn => column.kind === ColumnKind.attachment;
export const isBooleanColumn = (column: Column): column is BooleanColumn =>
  column.kind === ColumnKind.boolean;
export const isCurrencyColumn = (column: Column): column is CurrencyColumn =>
  column.kind === ColumnKind.currency;
export const isConcatColumn = (column: Column): column is ConcatColumn =>
  column.kind === ColumnKind.concat;
export const isGroupColumn = (column: Column): column is ConcatColumn =>
  column.kind === ColumnKind.group;
export const isLinkColumn = (column: Column): column is LinkColumn =>
  column.kind === ColumnKind.link;
export const isNumberColumn = (column: Column): column is NumberColumn =>
  column.kind === ColumnKind.numeric;
export const isRichtextColumn = (column: Column): column is RichTextColumn =>
  column.kind === ColumnKind.richtext;
export const isShorttextColumn = (column: Column): column is ShortTextColumn =>
  column.kind === ColumnKind.shorttext;
export const isTextColumn = (column: Column): column is TextColumn =>
  column.kind === ColumnKind.text;
export const isDateColumn = (column: Column): column is DateColumn =>
  column.kind === ColumnKind.date;
export const isDateTimeColumn = (column: Column): column is DateTimeColumn =>
  column.kind === ColumnKind.datetime;
export const isStatusColumn = (column: Column): column is StatusColumn =>
  column.kind === ColumnKind.status;
