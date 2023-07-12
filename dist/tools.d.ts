import { MultilangValue } from "./types";
export declare const condSelect: <T, V>(conditions: [(_: T) => boolean, V][]) => (value: T) => V;
export declare const map: <Fn extends (..._: any[]) => any>(fn: Fn, ...colls: Parameters<Fn>[number][][]) => ReturnType<Fn>[];
export declare const joinMultilangValues: (langs: string[], vals: Array<MultilangValue<string>>) => MultilangValue<string>;
//# sourceMappingURL=tools.d.ts.map