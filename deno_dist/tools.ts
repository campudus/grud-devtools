import { MultilangValue } from "./types/index.ts";
import * as r from "npm:ramda@0.28.0";
import {
  DEFAULT_LANG,
  DEFAULT_LOCALE,
  getLanguage,
  Language,
} from "./grud-intl.ts";

export const condSelect =
  <T, V>(conditions: Array<[(_: T) => boolean, V]>) =>
  (value: T): V => {
    for (const [pred, result] of conditions) {
      if (pred(value)) return result;
    }
    throw new Error("Non exhaustive pattern");
  };

export const map = <Fn extends (..._: any[]) => any>(
  fn: Fn,
  ...colls: Parameters<Fn>[number][][]
) => {
  const len = Math.min(...colls.map((c) => c.length));
  const result: ReturnType<Fn>[] = new Array(len);
  for (let i = 0; i < len; i++) result[i] = fn(...colls.map(r.nth(i)));
  return result;
};

type flattenT = (_: Array<string | string[]>) => string[];
export const joinMultilangValues = (
  langs: string[],
  vals: Array<MultilangValue<string>>
) =>
  langs.reduce((accum, lt) => {
    accum[lt] = r.compose(
      r.trim,
      r.join(" "),
      r.filter<string>((dv) => !!dv),
      r.flatten as flattenT,
      r.map<any, string | string[]>(
        r.compose(
          r.find((x) => !!x),
          r.props([
            lt,
            getLanguage(lt as Language),
            DEFAULT_LOCALE,
            DEFAULT_LANG,
          ])
        ) as any
      )
    )(vals);

    return accum;
  }, {} as MultilangValue<string>);
