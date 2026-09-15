import type { Country, Locale } from "./grud-intl.js";
import type { CellValueForColumn, Column, DisplayValueForColumn } from "./types/index.js";
export type Langtag = Country | Locale;
export declare const getDisplayValue: (langs: Array<Langtag>) => (userLang?: Langtag) => {
    <T extends Column>(column: T, cellValue: CellValueForColumn<T> | CellValueForColumn<T>["value"]): DisplayValueForColumn<T>;
    <T extends Column>(_: T): (_: CellValueForColumn<T> | CellValueForColumn<T>["value"]) => DisplayValueForColumn<T>;
};
//# sourceMappingURL=getDisplayValue.d.ts.map