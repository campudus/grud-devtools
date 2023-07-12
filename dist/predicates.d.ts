import { Column, CurrencyColumn, BooleanColumn, ConcatColumn, LinkColumn, NumberColumn, RichTextColumn, ShortTextColumn, TextColumn, DateColumn, DateTimeColumn, AttachmentColumn, StatusColumn } from "./types";
export declare const isMultilangColumn: (column: Column) => boolean;
export declare const isAttachmentColumn: (column: Column) => column is AttachmentColumn;
export declare const isBooleanColumn: (column: Column) => column is BooleanColumn;
export declare const isCurrencyColumn: (column: Column) => column is CurrencyColumn;
export declare const isConcatColumn: (column: Column) => column is ConcatColumn;
export declare const isGroupColumn: (column: Column) => column is ConcatColumn;
export declare const isLinkColumn: (column: Column) => column is LinkColumn;
export declare const isNumberColumn: (column: Column) => column is NumberColumn;
export declare const isRichtextColumn: (column: Column) => column is RichTextColumn;
export declare const isShorttextColumn: (column: Column) => column is ShortTextColumn;
export declare const isTextColumn: (column: Column) => column is TextColumn;
export declare const isDateColumn: (column: Column) => column is DateColumn;
export declare const isDateTimeColumn: (column: Column) => column is DateTimeColumn;
export declare const isStatusColumn: (column: Column) => column is StatusColumn;
//# sourceMappingURL=predicates.d.ts.map