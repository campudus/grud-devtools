import { Country, Locale } from "./grud-intl";
import { CellValueForColumn, Column, DisplayValueForColumn } from "./types";
export type Langtag = Country | Locale;
export declare const getDisplayValue: (langs: Array<Langtag>) => (userLang?: Langtag) => {
    <T extends Column>(column: T, cellValue: CellValueForColumn<T> | CellValueForColumn<T>["value"]): DisplayValueForColumn<T>;
    <T_1 extends Column>(_: T_1): (_: CellValueForColumn<T_1> | CellValueForColumn<T_1>["value"]) => DisplayValueForColumn<T_1>;
};
//# sourceMappingURL=getDisplayValue.d.ts.map