import * as r from "ramda";
import type { Country, Locale } from "./grud-intl.ts";
import * as i from "./grud-intl.ts";
import {
  isAttachmentColumn,
  isBooleanColumn,
  isConcatColumn,
  isCurrencyColumn,
  isDateColumn,
  isDateTimeColumn,
  isGroupColumn,
  isLinkColumn,
  isMultilangColumn,
  isNumberColumn,
  isRichtextColumn,
  isShorttextColumn,
  isStatusColumn,
  isTextColumn,
} from "./predicates.ts";
import { condSelect, joinMultilangValues, map } from "./tools.ts";
import type {
  Attachment,
  AttachmentCellValue,
  AttachmentColumn,
  BooleanColumn,
  CellValue,
  CellValueForColumn,
  Column,
  ConcatColumn,
  CurrencyColumn,
  DateColumn,
  DateTimeColumn,
  DisplayValueForColumn,
  GroupColumn,
  grudAny,
  LinkColumn,
  MultilangValue,
  NumberColumn,
  StatusColumn,
} from "./types/index.ts";

export type Langtag = Country | Locale;
type formatValueT = (lt: Langtag, value: grudAny) => string;

const mkDisplayMap = (
  langs: Array<Langtag>,
  column: Column,
  value: CellValue["value"],
  format?: formatValueT,
) => {
  const extractValue = isMultilangColumn(column)
    ? (lt: Langtag) => (value as grudAny)[lt]
    : () => value;
  const getValue = format
    ? (lt: Langtag) => format(lt, extractValue(lt))
    : extractValue;
  return langs.reduce((result, lt) => {
    result[lt] = getValue(lt);
    return result;
  }, {} as MultilangValue<string>);
};

type getValueT<T extends Column> = (
  column: T,
  value: CellValueForColumn<T>["value"],
) => DisplayValueForColumn<T>;

const attachmentToStringForLang = (lt: Langtag, att: Attachment) => {
  const fallbackLt = i.getLanguage(lt as grudAny);

  return (
    att.title[lt] ||
    att.externalName[lt] ||
    att.title[fallbackLt] ||
    att.externalName[fallbackLt] ||
    att.title[i.DEFAULT_LANG] ||
    att.externalName[i.DEFAULT_LANG] ||
    att.internalName[lt] ||
    att.uuid
  );
};
const attachmentToMultilang = (langs: Langtag[]) => (att: Attachment) =>
  langs.reduce((accum, lt) => {
    accum[lt] = attachmentToStringForLang(lt, att);
    return accum;
  }, {} as MultilangValue<string>);

export const getDisplayValue = (
  langs: Array<Langtag>, // Display values are generated for these langtags
): (
  userLang?: Langtag,
) => {
  <T extends Column>(
    column: T,
    cellValue: CellValueForColumn<T> | CellValueForColumn<T>["value"],
  ): DisplayValueForColumn<T>;
  <T extends Column>(
    _: T,
  ): (
    _: CellValueForColumn<T> | CellValueForColumn<T>["value"],
  ) => DisplayValueForColumn<T>;
} =>
(
  userLang?: Langtag, // Numbers and dates are formatted for this langtag
  // If undefined, numbers and dates are formatted per langtag
) => {
  // cache fns
  const getNestedValues = (columns: Column[], values: CellValue[]) => {
    return joinMultilangValues(
      langs,
      r.flatten(map((col, val) => go(col, val), columns, values)),
    );
  };

  const getConcatValue: getValueT<ConcatColumn> = (column, values) =>
    getNestedValues(column.concats, values as grudAny);
  const getGroupValue: getValueT<GroupColumn> = (column, values) =>
    getNestedValues(column.groups, values as grudAny);

  const getAttachmentValues: getValueT<AttachmentColumn> = (_, value) =>
    (value as unknown as AttachmentCellValue["value"]).map(
      attachmentToMultilang(langs),
    );

  const getBooleanValue: getValueT<BooleanColumn> = (column, value) => {
    const formatBooleanVal = (lt: Langtag, val: boolean) =>
      val ? column.displayName[lt] ?? column.name : "";
    return mkDisplayMap(langs, column, value, formatBooleanVal);
  };
  const getCurrencyValue: getValueT<CurrencyColumn> = (column, value) => {
    const formatCurrency = (lt: Langtag, val: number) =>
      i.formatCurrency(userLang ?? lt, i.getCurrency(lt), val);
    return mkDisplayMap(langs, column, value, formatCurrency);
  };
  const getNumberValue: getValueT<NumberColumn> = (column, value) => {
    const formatNumber = (lt: Langtag, val: number) =>
      i.formatNumber(userLang ?? lt, val);
    return mkDisplayMap(langs, column, value, formatNumber);
  };
  const getPlainValue: getValueT<Column> = (column, value) =>
    mkDisplayMap(langs, column, value);

  const getDateValue: getValueT<DateColumn> = (column, value) => {
    const formatDate = (lt: Langtag, val: string) =>
      i.formatDate(userLang ?? lt, val);
    return mkDisplayMap(langs, column, value, formatDate);
  };
  const getDateTimeValue: getValueT<DateTimeColumn> = (column, value) => {
    const formatDateTime = (lt: Langtag, val: string) =>
      i.formatDateTime(userLang ?? lt, val);
    return mkDisplayMap(langs, column, value, formatDateTime);
  };
  const getLinkValue: getValueT<LinkColumn> = (column, value) =>
    value.map((v) =>
      getDisplayValue(langs)(userLang)(column.toColumn as grudAny, v)
    );
  const getStatusValue: getValueT<StatusColumn> = (column, value) => {
    const statusValues = column.rules
      .filter((_, idx) => !!r.nth(idx, value))
      .map(r.prop("displayName")) as MultilangValue<string>[];
    return joinMultilangValues(langs, statusValues);
  };

  // Optionally curried  Column -> CellValue -> MultilangValue<string>
  // or uncurried        (Column, CellValue) -> MultilangValue<string>
  function go<T extends Column>(
    column: T,
    cellValue: CellValueForColumn<T>["value"] | CellValueForColumn<T>,
  ): DisplayValueForColumn<T>;
  function go<T extends Column>(
    _: T,
  ): (
    _: CellValueForColumn<T>["value"] | CellValueForColumn<T>,
  ) => DisplayValueForColumn<T>;
  function go<T extends Column>(
    column: T,
    cellValue?: CellValueForColumn<T>["value"] | CellValueForColumn<T>,
  ) {
    if (arguments.length < 2) {
      return (value: CellValueForColumn<T>["value"]) => go(column, value);
    }
    try {
      const fn = condSelect<Column, getValueT<grudAny>>([
        [isAttachmentColumn, getAttachmentValues],
        [isBooleanColumn, getBooleanValue],
        [isConcatColumn, getConcatValue],
        [isCurrencyColumn, getCurrencyValue],
        [isDateColumn, getDateValue],
        [isDateTimeColumn, getDateTimeValue],
        [isGroupColumn, getGroupValue],
        [isLinkColumn, getLinkValue],
        [isNumberColumn, getNumberValue],
        [isRichtextColumn, getPlainValue],
        [isShorttextColumn, getPlainValue],
        [isStatusColumn, getStatusValue],
        [isTextColumn, getPlainValue],
      ])(column);

      return cellValue !== undefined && cellValue !== null
        ? fn(column, (cellValue as CellValue).value ?? cellValue)
        : ({} as grudAny);
    } catch (err) {
      if (/Non exhaustive/.test((err as Error).message)) {
        console.error("Column kind not found:", column.kind);
      }
      throw err;
    }
  }

  return go;
};
