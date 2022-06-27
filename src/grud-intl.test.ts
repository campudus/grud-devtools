import * as i from "./grud-intl";

describe("grud-intl", () => {
  describe("isCountry()", () => {
    it.each`
      country      | validity
      ${"DE"}      | ${true}
      ${"CH"}      | ${true}
      ${null}      | ${false}
      ${undefined} | ${false}
      ${""}        | ${false}
      ${"ab"}      | ${false}
    `("should return valid: $country = $validity", ({ country, validity }) => {
      expect(i.isCountry(country)).toEqual(validity);
    });
  });
  describe("isLanguage()", () => {
    it.each`
      lang         | validity
      ${"de"}      | ${true}
      ${"fr"}      | ${true}
      ${null}      | ${false}
      ${undefined} | ${false}
      ${""}        | ${false}
      ${"US"}      | ${false}
    `("should return valid: $lang = $validity", ({ lang, validity }) => {
      expect(i.isLanguage(lang)).toEqual(validity);
    });
  });
  describe("isLocale()", () => {
    it.each`
      locale       | validity
      ${"en-GB"}   | ${true}
      ${undefined} | ${false}
      ${"AC/DC"}   | ${false}
      ${"aa-BB"}   | ${false}
    `("should return valid $locale = $validity", ({ locale, validity }) => {
      expect(i.isLocale(locale)).toEqual(validity);
    });
  });

  describe("splitLocale()", () => {
    it.each`
      locale       | lang         | ctry
      ${"de-DE"}   | ${"de"}      | ${"DE"}
      ${"de"}      | ${"de"}      | ${undefined}
      ${"DE"}      | ${undefined} | ${"DE"}
      ${undefined} | ${undefined} | ${undefined}
      ${null}      | ${undefined} | ${undefined}
      ${"AC/DC"}   | ${undefined} | ${undefined}
    `("should split $locale to [$lang, $ctry]", ({ locale, lang, ctry }) => {
      expect(i.splitLocale(locale)).toEqual([lang, ctry]);
    });
  });

  describe("getLanguage()", () => {
    it.each`
      locale       | lang
      ${"de"}      | ${"de"}
      ${"de-DE"}   | ${"de"}
      ${"DE"}      | ${i.DEFAULT_LANG}
      ${undefined} | ${i.DEFAULT_LANG}
      ${"ac-DC"}   | ${i.DEFAULT_LANG}
    `("should find $locale to contain language $lang", ({ locale, lang }) => {
      expect(i.getLanguage(locale)).toBe(lang);
    });
  });
  describe("getCountry()", () => {
    it.each`
      locale       | ctry
      ${"de"}      | ${undefined}
      ${"de-DE"}   | ${"DE"}
      ${undefined} | ${undefined}
      ${"AC-DC"}   | ${undefined}
    `("should find $locale to contain country $ctry", ({ locale, ctry }) => {
      expect(i.getCountry(locale)).toBe(ctry);
    });
  });
  describe("getCurrency()", () => {
    it.each`
      langtag      | currency
      ${"DE"}      | ${"EUR"}
      ${"de-DE"}   | ${"EUR"}
      ${"de-CH"}   | ${"CHF"}
      ${undefined} | ${i.DEFAULT_CURRENCY}
    `(
      "should find currency $currency for langtag $langtag",
      ({ langtag, currency }) => {
        expect(i.getCurrency(langtag)).toBe(currency);
      }
    );
  });

  describe("formatCurrency()", () => {
    const amount = 1234.56;
    it.each`
      langtag    | currency | result
      ${"de-DE"} | ${"EUR"} | ${"1.234,56 €"}
      ${"en-GB"} | ${"GBP"} | ${"£1,234.56"}
      ${"fr-CH"} | ${"CHF"} | ${"1 234.56 CHF"}
      ${"en-US"} | ${"USD"} | ${"$1,234.56"}
    `(
      "should format correctly for $langtag",
      ({ langtag, currency, result }) => {
        // be aware of uncommon white space in the results
        expect(i.formatCurrency(langtag, currency, amount)).toBe(result);
      }
    );
  });

  describe("formatNumber()", () => {
    const amount = 1234.56;
    it.each`
      langtag    | result
      ${"de-DE"} | ${"1.234,56"}
      ${"en-GB"} | ${"1,234.56"}
      ${"fr-CH"} | ${"1 234,56"}
      ${"en-US"} | ${"1,234.56"}
    `("should format correctly for $langtag", ({ langtag, result }) => {
      // be aware of uncommon white space in the results
      expect(i.formatNumber(langtag, amount)).toBe(result);
    });
  });

  describe("formatDate()", () => {
    const date = "2022-06-20";
    it.each`
      langtag    | result
      ${"de-DE"} | ${"20.6.2022"}
      ${"en-GB"} | ${"20/06/2022"}
      ${"en-US"} | ${"6/20/2022"}
    `("should format correctly for $langtag", ({ langtag, result }) => {
      // be aware of uncommon white space in the results
      expect(i.formatDate(langtag, date)).toBe(result);
    });
  });

  describe("formatDateTime()", () => {
    const date = "2022-06-20T12:34:56.789Z";
    it.each`
      langtag    | result
      ${"de-DE"} | ${"20.6.2022, 14:34"}
      ${"en-GB"} | ${"20/06/2022, 14:34"}
      ${"en-US"} | ${"6/20/2022, 14:34"}
    `("should format correctly for $langtag", ({ langtag, result }) => {
      // be aware of uncommon white space in the results
      expect(i.formatDateTime(langtag, date)).toBe(result);
    });
  });
});
