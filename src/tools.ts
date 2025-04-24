import * as r from "ramda";
import {
  DEFAULT_LANG,
  DEFAULT_LOCALE,
  getLanguage,
  type Language,
} from "./grud-intl.ts";
import type { grudAny, MultilangValue } from "./types/index.ts";

export const condSelect =
  <T, V>(conditions: Array<[(_: T) => boolean, V]>) => (value: T): V => {
    for (const [pred, result] of conditions) {
      if (pred(value)) return result;
    }
    throw new Error("Non exhaustive pattern");
  };

export const map = <Fn extends (..._: grudAny[]) => grudAny>(
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
  vals: Array<MultilangValue<string>>,
): MultilangValue<string> =>
  langs.reduce((accum, lt) => {
    accum[lt] = r.compose(
      r.trim,
      r.join(" "),
      r.filter<string>((dv: string) => !!dv),
      r.flatten as flattenT,
      r.map<grudAny, string | string[]>(
        r.compose(
          r.find((x: string) => !!x),
          r.props([
            lt,
            getLanguage(lt as Language),
            DEFAULT_LOCALE,
            DEFAULT_LANG,
          ]),
        ) as grudAny,
      ),
    )(vals);

    return accum;
  }, {} as MultilangValue<string>);
