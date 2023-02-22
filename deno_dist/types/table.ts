import { Language, Locale } from "src/grud-intl DENOIFY: UNKNOWN NODE BUILTIN";
import { MultilangValue } from "./common.ts";

export type TableID = number;

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
