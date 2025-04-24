import type { Language, Locale } from "../grud-intl.ts";
import type { MultilangValue } from "./common.ts";

export type TableID = number;

// deno-lint-ignore no-explicit-any
export type TableAttributeSet = Record<string, any>;

export type TableGroup = {
  id: number;
  displayName: MultilangValue<string>;
  description: MultilangValue<string>;
};

export type Table = {
  id: TableID;
  name: string;
  hidden: boolean;
  displayName: MultilangValue<string>;
  description: MultilangValue<string>;
  attributes: TableAttributeSet;
  langtags: Language | Locale;
  group: TableGroup;
};
