import { Attachment, ISODateString, MultilangValue } from "./common.ts";

export type SingleLangCellValue<T> = { value: T };
export type MultilangCellValue<T> = {
  value: MultilangValue<T>;
};
type BaseCellValue<T> = SingleLangCellValue<T> | MultilangCellValue<T>;

export type CurrencyCellValue = MultilangCellValue<number>;
export type DateCellValue = BaseCellValue<ISODateString>;
export type DateTimeCellValue = BaseCellValue<ISODateString>;
export type TextCellValue = BaseCellValue<string>;
export type RichTextCellValue = BaseCellValue<string>;
export type ShortTextCellValue = BaseCellValue<string>;
export type NumberCellValue = BaseCellValue<number>;
export type BooleanCellValue = BaseCellValue<boolean>;
export type LinkCellValue = SingleLangCellValue<
  Array<CellValue & { id: number }>
>;
export type GroupCellValue = MultilangCellValue<any>;

export type ConcatCellValue = BaseCellValue<Array<BaseCellValue<unknown>>>;
export type AttachmentCellValue = SingleLangCellValue<Attachment[]>;
export type StatusCellValue = SingleLangCellValue<boolean[]>;

export type CellValue =
  | BooleanCellValue
  | ConcatCellValue
  | CurrencyCellValue
  | DateCellValue
  | DateTimeCellValue
  | GroupCellValue
  | LinkCellValue
  | NumberCellValue
  | RichTextCellValue
  | ShortTextCellValue
  | TextCellValue;
