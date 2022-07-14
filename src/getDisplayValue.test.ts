import * as gdv from "./getDisplayValue";
import {
  AttachmentCellValue,
  AttachmentColumn,
  BooleanColumn,
  ColumnID,
  CurrencyCellValue,
  CurrencyColumn,
  DateCellValue,
  DateColumn,
  DateTimeCellValue,
  DateTimeColumn,
  FolderID,
  GroupColumn,
  ISODateString,
  LinkCellValue,
  LinkColumn,
  Locale,
  NumberCellValue,
  NumberColumn,
  RichTextCellValue,
  RichTextColumn,
  ShortTextCellValue,
  ShortTextColumn,
  StatusColumn,
  TextCellValue,
  TextColumn,
  UUID,
} from "./types";

const langtags: Locale[] = ["de-DE", "en-GB", "en-US"];

describe("getDisplayValue()", () => {
  it("breaks", () => expect(1).toBe(2));
  const getDisplayValue = gdv.getDisplayValue(langtags);
  describe("bad column type", () => {
    expect(() =>
      getDisplayValue()({ kind: "no-such-kind" } as any)(null as any)
    ).toThrowError();
  });
  describe("shorttext", () => {
    it("should get single lang shorttext values", () => {
      const column: ShortTextColumn = {
        id: 1,
        kind: "shorttext",
        multilanguage: false,
      } as any;
      const value: ShortTextCellValue = { value: "foo" };
      expect(getDisplayValue()(column, value)).toEqual({
        "de-DE": "foo",
        "en-GB": "foo",
        "en-US": "foo",
      });
    });

    it("should get multilang shorttext values", () => {
      const column: ShortTextColumn = {
        id: 1,
        kind: "shorttext",
        multilanguage: true,
      } as any;
      const value: ShortTextCellValue["value"] = {
        "de-DE": "Gut.",
        "en-GB": "Agreeable, indeed.",
        "en-US": "Awesome!",
      };
      expect(getDisplayValue()(column, value)).toEqual({
        "de-DE": "Gut.",
        "en-GB": "Agreeable, indeed.",
        "en-US": "Awesome!",
      });
    });
  });

  describe("text", () => {
    it("should get single lang text values", () => {
      const column: TextColumn = {
        id: 1,
        kind: "shorttext",
        multilanguage: false,
      } as any;
      const value: ShortTextCellValue = { value: "foo" };
      expect(getDisplayValue()(column, value)).toEqual({
        "de-DE": "foo",
        "en-GB": "foo",
        "en-US": "foo",
      });
    });
    it("should get multilang text values", () => {
      const column: TextColumn = {
        id: 1,
        kind: "text",
        multilanguage: true,
      } as any;
      const value: TextCellValue["value"] = {
        "de-DE": "Gut.",
        "en-GB": "Agreeable, indeed.",
        "en-US": "Awesome!",
      };
      expect(getDisplayValue()(column, value)).toEqual({
        "de-DE": "Gut.",
        "en-GB": "Agreeable, indeed.",
        "en-US": "Awesome!",
      });
    });
  });

  describe("richtext", () => {
    it("should get single lang richtext values", () => {
      const column: RichTextColumn = {
        id: 1,
        kind: "richtext",
        multilanguage: false,
      } as any;
      const value: RichTextCellValue = { value: "foo" };
      expect(getDisplayValue()(column, value)).toEqual({
        "de-DE": "foo",
        "en-GB": "foo",
        "en-US": "foo",
      });
    });
    it("should get multilang richtext values", () => {
      const column: RichTextColumn = {
        id: 1,
        kind: "richtext",
        multilanguage: true,
      } as any;
      const value: RichTextCellValue["value"] = {
        "de-DE": "Gut.",
        "en-GB": "Agreeable, indeed.",
        "en-US": "Awesome!",
      };
      expect(getDisplayValue()(column, value)).toEqual({
        "de-DE": "Gut.",
        "en-GB": "Agreeable, indeed.",
        "en-US": "Awesome!",
      });
    });
  });

  describe("number", () => {
    it("should format single lang number values for specific langs when no user lang is given", () => {
      const column: NumberColumn = {
        id: 1,
        kind: "number",
        multilanguage: false,
      } as any;
      const value: NumberCellValue = { value: 1234.56 };
      const getDisplayValueWithoutUserLocale = getDisplayValue();
      expect(getDisplayValueWithoutUserLocale(column, value)).toEqual({
        "de-DE": "1.234,56",
        "en-GB": "1,234.56",
        "en-US": "1,234.56",
      });
    });
    it("should format single lang number values for all values to specified user Lang", () => {
      const column: NumberColumn = {
        id: 1,
        kind: "number",
        multilanguage: false,
      } as any;
      const value: NumberCellValue = { value: 1234.56 };
      const getDisplayValueForGerman = getDisplayValue("de-DE");
      const getDisplayValueForGB = getDisplayValue("en-GB");
      expect(getDisplayValueForGerman(column, value)).toEqual({
        "de-DE": "1.234,56",
        "en-GB": "1.234,56",
        "en-US": "1.234,56",
      });
      expect(getDisplayValueForGB(column, value)).toEqual({
        "de-DE": "1,234.56",
        "en-GB": "1,234.56",
        "en-US": "1,234.56",
      });
    });
  });

  describe("date", () => {
    it("should format date values for specific langs when no user lang is given", () => {
      const column: DateColumn = {
        id: 1,
        kind: "date",
        multilanguage: false,
      } as any;
      const value: DateCellValue = { value: ISODateString("2022-12-31") };
      const getDisplayValueWithoutUserLocale = getDisplayValue();
      expect(getDisplayValueWithoutUserLocale(column, value)).toEqual({
        "de-DE": "31.12.2022",
        "en-GB": "31/12/2022",
        "en-US": "12/31/2022",
      });
    });
    it("should format date values for all values to specified user Lang", () => {
      const column: DateColumn = {
        id: 1,
        kind: "date",
        multilanguage: false,
      } as any;
      const value: DateCellValue = { value: ISODateString("2022-12-31") };
      const getDisplayValueForGerman = getDisplayValue("de-DE");
      const getDisplayValueForGB = getDisplayValue("en-GB");
      expect(getDisplayValueForGerman(column, value)).toEqual({
        "de-DE": "31.12.2022",
        "en-GB": "31.12.2022",
        "en-US": "31.12.2022",
      });
      expect(getDisplayValueForGB(column, value)).toEqual({
        "de-DE": "31/12/2022",
        "en-GB": "31/12/2022",
        "en-US": "31/12/2022",
      });
    });
  });

  describe("datetime", () => {
    it("should format datetime values for specific langs when no user lang is given", () => {
      const column: DateColumn = {
        id: 1,
        kind: "datetime",
        multilanguage: false,
      } as any;
      const value: DateCellValue = {
        value: ISODateString("2022-12-31T12:34:56"),
      };
      const getDisplayValueWithoutUserLocale = getDisplayValue();
      expect(getDisplayValueWithoutUserLocale(column, value)).toEqual({
        "de-DE": "31.12.2022, 12:34",
        "en-GB": "31/12/2022, 12:34",
        "en-US": "12/31/2022, 12:34",
      });
    });
    it("should format datetime values for all values to specified user Lang", () => {
      const column: DateTimeColumn = {
        id: 1,
        kind: "datetime",
        multilanguage: false,
      } as any;
      const value: DateTimeCellValue = { value: ISODateString("2022-12-31") };
      const getDisplayValueForGerman = getDisplayValue("de-DE");
      const getDisplayValueForGB = getDisplayValue("en-GB");
      expect(getDisplayValueForGerman(column, value)).toEqual({
        "de-DE": "31.12.2022, 01:00",
        "en-GB": "31.12.2022, 01:00",
        "en-US": "31.12.2022, 01:00",
      });
      expect(getDisplayValueForGB(column, value)).toEqual({
        "de-DE": "31/12/2022, 01:00",
        "en-GB": "31/12/2022, 01:00",
        "en-US": "31/12/2022, 01:00",
      });
    });
  });

  describe("attachment", () => {
    it("should format attachment values", () => {
      const column: AttachmentColumn = {
        id: ColumnID(6),
        ordering: 6,
        name: "previewImage",
        kind: "attachment",
        multilanguage: false,
        identifier: false,
        displayName: { de: "Vorschaubild", en: "Preview image" },
        description: {},
        separator: false,
        attributes: {},
      };
      const value: AttachmentCellValue["value"] = [
        {
          ordering: 1,
          url: {
            de: "/files/5a27f9d5-bae4-41c3-991c-46176a00157e/de/filtered.svg",
          },
          uuid: UUID("5a27f9d5-bae4-41c3-991c-46176a00157e"),
          folder: null,
          folders: [],
          title: { de: "filtered.svg" },
          description: { de: "" },
          internalName: { de: "7e919a19-bd70-4f48-bd9b-83dc91ee213b.svg" },
          externalName: { de: "filtered.svg" },
          mimeType: { de: "image/svg+xml" },
          createdAt: ISODateString("2022-06-23T10:15:39.723+02:00"),
          updatedAt: ISODateString("2022-06-23T10:15:39.774+02:00"),
        },
        {
          ordering: 2,
          url: { de: "/files/4c2b74b8-7b9a-4a54-991a-dee65bbf4133/de/wip.pdf" },
          uuid: "4c2b74b8-7b9a-4a54-991a-dee65bbf4133" as UUID,
          folder: FolderID(15),
          folders: [9, 15] as FolderID[],
          title: { de: "wip.pdf" },
          description: { de: "" },
          internalName: { de: "8d6871a2-62a4-4fc0-9b37-5dae72863d9f.pdf" },
          externalName: { de: "wip.pdf" },
          mimeType: { de: "application/pdf" },
          createdAt: ISODateString("2022-06-23T10:19:17.145+02:00"),
          updatedAt: ISODateString("2022-06-23T10:19:17.202+02:00"),
        },
      ];
      expect(getDisplayValue()(column, value)).toEqual([
        {
          "de-DE": "filtered.svg",
          "en-GB": "filtered.svg",
          "en-US": "filtered.svg",
        },
        {
          "de-DE": "wip.pdf",
          "en-GB": "wip.pdf",
          "en-US": "wip.pdf",
        },
      ]);
    });
  });
  describe("link", () => {
    it("should format simpler link columns", () => {
      const column: LinkColumn = {
        id: ColumnID(2),
        ordering: 1,
        name: "manufacturer",
        kind: "link",
        multilanguage: false,
        identifier: true,
        displayName: {
          de: "Hersteller",
          en: "Manufacturer",
          fr: "Fabricant",
          es: "Fabricante",
        },
        description: {},
        separator: false,
        attributes: {},
        toTable: 2,
        toColumn: {
          id: ColumnID(1),
          ordering: 1,
          name: "name",
          kind: "shorttext",
          multilanguage: false,
          identifier: true,
          displayName: { de: "Name", en: "Name", fr: "Nom", es: "Nombre" },
          description: {},
          separator: false,
          attributes: {},
        },
      };

      const value: LinkCellValue["value"] = [
        { id: 114, value: "Abus" },
        { id: 128, value: "Accell " },
      ];

      expect(getDisplayValue()(column, value)).toEqual([
        {
          "de-DE": "Abus",
          "en-GB": "Abus",
          "en-US": "Abus",
        },

        {
          "de-DE": "Accell ",
          "en-GB": "Accell ",
          "en-US": "Accell ",
        },
      ]);
    });
  });

  describe("column", () => {
    it("should format group columns", () => {
      const column: GroupColumn = {
        id: ColumnID(76),
        ordering: 7,
        name: "haibikeClassificationGroup",
        kind: "group",
        multilanguage: false,
        identifier: false,
        displayName: {
          de: "Haibike Klassifikation",
          en: "Haibike Classification",
        },
        description: {
          de: "Fahrradklassifikation nur für Haibike",
          en: "Bike classifikation only for Haibike",
        },
        separator: false,
        attributes: {},
        groups: [
          {
            id: ColumnID(64),
            ordering: 8,
            name: "haibikeClassification",
            kind: "link",
            multilanguage: false,
            identifier: false,
            displayName: {
              de: "Haibike Klassifikation (2017)",
              en: "Haibike Classification (2017)",
            },
            description: {
              de: "Klassifikation für Modelljahr 2017",
              en: "Classifikation for model year 2017",
            },
            separator: false,
            attributes: {},
            toTable: 83,
            toColumn: {
              id: ColumnID(0),
              ordering: 0,
              name: "ID",
              kind: "concat",
              multilanguage: false,
              identifier: true,
              displayName: {},
              description: {},
              separator: false,
              attributes: {},
              concats: [
                {
                  id: ColumnID(1),
                  ordering: 1,
                  name: "classname",
                  kind: "link",
                  multilanguage: false,
                  identifier: true,
                  displayName: {
                    fr: "Nom de classe",
                    de: "Klassenname",
                    en: "Class name",
                    es: "Nombre de categoría",
                  },
                  description: {},
                  separator: false,
                  attributes: {},
                  toTable: 82,
                  toColumn: {
                    id: ColumnID(1),
                    ordering: 1,
                    name: "classname",
                    kind: "shorttext",
                    multilanguage: false,
                    identifier: true,
                    displayName: {
                      fr: "Nom de classe",
                      de: "Klassenname",
                      en: "Class name",
                      es: "Nombre",
                    },
                    description: {},
                    separator: false,
                    attributes: {},
                  },
                },
                {
                  id: ColumnID(2),
                  ordering: 2,
                  name: "bikeseries",
                  kind: "link",
                  multilanguage: false,
                  identifier: true,
                  displayName: {
                    fr: "Séries",
                    de: "Serie",
                    en: "Series",
                    es: "Serie",
                  },
                  description: {},
                  separator: false,
                  attributes: {},
                  toTable: 81,
                  toColumn: {
                    id: ColumnID(0),
                    ordering: 0,
                    name: "ID",
                    kind: "concat",
                    multilanguage: false,
                    identifier: true,
                    displayName: {},
                    description: {},
                    separator: false,
                    attributes: {},
                    concats: [
                      {
                        id: ColumnID(1),
                        ordering: 1,
                        name: "bikedomain",
                        kind: "link",
                        multilanguage: false,
                        identifier: true,
                        displayName: {
                          de: "Einsatz",
                          en: "Domain",
                          es: "Área de uso",
                        },
                        description: {},
                        separator: false,
                        attributes: {},
                        toTable: 80,
                        toColumn: {
                          id: ColumnID(0),
                          ordering: 0,
                          name: "ID",
                          kind: "concat",
                          multilanguage: false,
                          identifier: true,
                          displayName: {},
                          description: {},
                          separator: false,
                          attributes: {},
                          concats: [
                            {
                              id: ColumnID(1),
                              ordering: 1,
                              name: "bikeKind",
                              kind: "link",
                              multilanguage: false,
                              identifier: true,
                              displayName: {
                                de: "Gattung",
                                en: "Type",
                                es: "Modelo",
                              },
                              description: {},
                              separator: false,
                              attributes: {},
                              toTable: 79,
                              toColumn: {
                                id: ColumnID(1),
                                ordering: 1,
                                name: "identifier",
                                kind: "shorttext",
                                multilanguage: false,
                                identifier: true,
                                displayName: {
                                  de: "Gattung",
                                  en: "Type",
                                  fr: "Type",
                                  es: "Modelo",
                                },
                                description: {},
                                separator: false,
                                attributes: {},
                              },
                            },
                            {
                              id: ColumnID(2),
                              ordering: 2,
                              name: "domain",
                              kind: "shorttext",
                              multilanguage: false,
                              identifier: true,
                              displayName: {
                                de: "Einsatz",
                                en: "Domain",
                                es: "Área de uso",
                              },
                              description: {},
                              separator: false,
                              attributes: {},
                            },
                          ],
                        },
                      },
                      {
                        id: ColumnID(2),
                        ordering: 2,
                        name: "series",
                        kind: "shorttext",
                        multilanguage: false,
                        identifier: true,
                        displayName: {
                          fr: "Séries",
                          de: "Serie",
                          en: "Series",
                          es: "Serie",
                        },
                        description: {},
                        separator: false,
                        attributes: {},
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            id: ColumnID(75),
            ordering: 9,
            name: "haibikeClassificationSince2018",
            kind: "link",
            multilanguage: false,
            identifier: false,
            displayName: {
              de: "Haibike Klassifikation (ab 2018)",
              en: "Haibike Classification (since 2018)",
            },
            description: {
              de: "Klassifikation ab Modelljahr 2018",
              en: "Classifikation since model year 2018",
            },
            separator: false,
            attributes: {},
            toTable: 153,
            toColumn: {
              id: ColumnID(0),
              ordering: 0,
              name: "ID",
              kind: "concat",
              multilanguage: false,
              identifier: true,
              displayName: {},
              description: {},
              separator: false,
              attributes: {},
              concats: [
                {
                  id: ColumnID(1),
                  ordering: 1,
                  name: "bikeCategory",
                  kind: "link",
                  multilanguage: false,
                  identifier: true,
                  displayName: { de: "Kategorie", en: "Category" },
                  description: {},
                  separator: false,
                  attributes: {},
                  toTable: 152,
                  toColumn: {
                    id: ColumnID(0),
                    ordering: 0,
                    name: "ID",
                    kind: "concat",
                    multilanguage: false,
                    identifier: true,
                    displayName: {},
                    description: {},
                    separator: false,
                    attributes: {},
                    concats: [
                      {
                        id: ColumnID(1),
                        ordering: 1,
                        name: "bikeClass",
                        kind: "link",
                        multilanguage: false,
                        identifier: true,
                        displayName: { de: "Klasse", en: "Class" },
                        description: {},
                        separator: false,
                        attributes: {},
                        toTable: 151,
                        toColumn: {
                          id: ColumnID(0),
                          ordering: 0,
                          name: "ID",
                          kind: "concat",
                          multilanguage: false,
                          identifier: true,
                          displayName: {},
                          description: {},
                          separator: false,
                          attributes: {},
                          concats: [
                            {
                              id: ColumnID(1),
                              ordering: 1,
                              name: "bikeKind",
                              kind: "link",
                              multilanguage: false,
                              identifier: true,
                              displayName: { de: "Gattung", en: "Kind" },
                              description: {},
                              separator: false,
                              attributes: {},
                              toTable: 79,
                              toColumn: {
                                id: ColumnID(1),
                                ordering: 1,
                                name: "identifier",
                                kind: "shorttext",
                                multilanguage: false,
                                identifier: true,
                                displayName: {
                                  de: "Gattung",
                                  en: "Type",
                                  fr: "Type",
                                  es: "Modelo",
                                },
                                description: {},
                                separator: false,
                                attributes: {},
                              },
                              constraint: {
                                cardinality: { from: 0, to: 1 },
                                deleteCascade: false,
                              },
                            },
                            {
                              id: ColumnID(2),
                              ordering: 2,
                              name: "className",
                              kind: "link",
                              multilanguage: false,
                              identifier: true,
                              displayName: {
                                de: "Klassenname",
                                en: "Class name",
                              },
                              description: {},
                              separator: false,
                              attributes: {},
                              toTable: 82,
                              toColumn: {
                                id: ColumnID(1),
                                ordering: 1,
                                name: "classname",
                                kind: "shorttext",
                                multilanguage: false,
                                identifier: true,
                                displayName: {
                                  fr: "Nom de classe",
                                  de: "Klassenname",
                                  en: "Class name",
                                  es: "Nombre",
                                },
                                description: {},
                                separator: false,
                                attributes: {},
                              },
                              constraint: {
                                cardinality: { from: 0, to: 1 },
                                deleteCascade: false,
                              },
                            },
                            {
                              id: ColumnID(3),
                              ordering: 3,
                              name: "segment",
                              kind: "link",
                              multilanguage: false,
                              identifier: true,
                              displayName: { de: "Segment", en: "Segment" },
                              description: {
                                de: "Zusatz, um Klasse zu spezifizieren",
                              },
                              separator: false,
                              attributes: {},
                              toTable: 150,
                              toColumn: {
                                id: ColumnID(1),
                                ordering: 1,
                                name: "name",
                                kind: "shorttext",
                                multilanguage: false,
                                identifier: true,
                                displayName: { de: "Segment", en: "Segment" },
                                description: {},
                                separator: false,
                                attributes: {},
                              },
                              constraint: {
                                cardinality: { from: 0, to: 1 },
                                deleteCascade: false,
                              },
                            },
                          ],
                        },
                        constraint: {
                          cardinality: { from: 0, to: 1 },
                          deleteCascade: false,
                        },
                      },
                      {
                        id: ColumnID(2),
                        ordering: 2,
                        name: "identifier",
                        kind: "shorttext",
                        multilanguage: false,
                        identifier: true,
                        displayName: { de: "Bezeichnung", en: "Identifier" },
                        description: {},
                        separator: false,
                        attributes: {},
                      },
                    ],
                  },
                  constraint: {
                    cardinality: { from: 0, to: 1 },
                    deleteCascade: false,
                  },
                },
                {
                  id: ColumnID(2),
                  ordering: 2,
                  name: "identifier",
                  kind: "shorttext",
                  multilanguage: false,
                  identifier: true,
                  displayName: { de: "Bezeichnung", en: "Identifier" },
                  description: {},
                  separator: false,
                  attributes: {},
                },
              ],
            },
            constraint: {
              cardinality: { from: 0, to: 1 },
              deleteCascade: false,
            },
          },
        ],
      };
      const value = {
        value: [
          [
            {
              id: 21,
              value: [
                [{ id: 3, value: "SEET" }],
                [
                  {
                    id: 14,
                    value: [
                      [
                        {
                          id: 7,
                          value: [
                            [{ id: 2, value: "Performance" }],
                            "Advanced Offroad",
                          ],
                        },
                      ],
                      "AllMtn",
                    ],
                  },
                ],
              ],
            },
          ],
          [
            {
              id: 54,
              value: [
                [
                  {
                    id: 21,
                    value: [
                      [
                        {
                          id: 10,
                          value: [
                            [{ id: 1, value: "ePerformance" }],
                            [{ id: 2, value: "SDURO" }],
                            [{ id: 8, value: "SPORT" }],
                          ],
                        },
                      ],
                      "HARDTAIL",
                    ],
                  },
                ],
                "HardSeven ",
              ],
            },
          ],
        ],
      };

      expect(getDisplayValue()(column, value)).toEqual({
        "de-DE":
          "SEET Performance Advanced Offroad AllMtn ePerformance SDURO SPORT HARDTAIL HardSeven",
        "en-GB":
          "SEET Performance Advanced Offroad AllMtn ePerformance SDURO SPORT HARDTAIL HardSeven",
        "en-US":
          "SEET Performance Advanced Offroad AllMtn ePerformance SDURO SPORT HARDTAIL HardSeven",
      });
    });
  });

  describe("boolean", () => {
    const column: BooleanColumn = {
      multilanguage: false,
      id: 1,
      name: "oh boole mio",
      displayName: { "de-DE": "Ja", "en-US": "Yes" },
      description: {},
      kind: "boolean",
      identifier: true,
    } as unknown as BooleanColumn;

    const gdv = getDisplayValue()(column);

    expect(gdv({ value: true })).toEqual({
      "de-DE": "Ja",
      "en-GB": "oh boole mio",
      "en-US": "Yes",
    });
    expect(gdv({ value: false })).toEqual({
      "de-DE": "",
      "en-GB": "",
      "en-US": "",
    });
  });

  describe("status", () => {
    it("should format status columns", () => {
      const column: StatusColumn = {
        id: ColumnID(8),
        ordering: 8,
        name: "status-test",
        kind: "status",
        multilanguage: false,
        identifier: false,
        displayName: {},
        description: {},
        separator: false,
        attributes: {},
        rules: [
          {
            name: "hans",
            color: "fffaf1",
            icon: {
              type: "fa",
              value: "pencil",
            },
            tooltip: {
              "de-DE": "Dies ist ein tooltip",
              "en-GB": "UAGH",
            },
            displayName: {
              "de-DE": "Der Displayname",
              "en-GB": "Uagh",
            },
            conditions: {
              composition: "OR",
              values: [
                {
                  column: ColumnID(3),
                  operator: "IS",
                  value: true,
                },
                {
                  column: ColumnID(1),
                  operator: "IS",
                  value: "VR19",
                },
              ],
            },
          },
        ],
      };

      const gdv = getDisplayValue()(column);

      expect(gdv({ value: [true] })).toEqual({
        "de-DE": "Der Displayname",
        "en-GB": "Uagh",
        "en-US": "Der Displayname",
      });
      expect(gdv({ value: [false] })).toEqual({
        "de-DE": "",
        "en-GB": "",
        "en-US": "",
      });
    });
  });

  describe("currency", () => {
    const column = {
      kind: "currency",
      multilanguage: true,
      languagetype: "country",
    } as CurrencyColumn;
    const value: CurrencyCellValue = {
      value: { "de-DE": 1234.56, "en-US": 1234.56, "en-GB": 1234.56 },
    };
    it("should format currency columns for specific langtags", () => {
      const formatForGermany = getDisplayValue("de-DE");
      expect(formatForGermany(column, value)).toEqual({
        "de-DE": "1.234,56 €",
        "en-GB": "1.234,56 £",
        "en-US": "1.234,56 $",
      });
    });
    it("should format currency values for respective languages", () => {
      const formatForEachCountry = getDisplayValue();
      expect(formatForEachCountry(column, value)).toEqual({
        "de-DE": "1.234,56 €",
        "en-GB": "£1,234.56",
        "en-US": "$1,234.56",
      });
    });
  });
});
