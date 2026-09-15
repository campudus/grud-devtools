import type { grudAny, MultilangValue } from "./types/index.js";
export declare const condSelect: <T, V>(conditions: Array<[(_: T) => boolean, V]>) => (value: T) => V;
export declare const map: <Fn extends (..._: grudAny[]) => grudAny>(fn: Fn, ...colls: Parameters<Fn>[number][][]) => ReturnType<Fn>[];
export declare const joinMultilangValues: (langs: string[], vals: Array<MultilangValue<string>>) => MultilangValue<string>;
//# sourceMappingURL=tools.d.ts.map