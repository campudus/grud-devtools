const currencyCodeMap = {
  AE: "AED", // United Arab Emirates
  AT: "EUR", // Austria
  BE: "EUR", // Belgium
  BG: "BGN", // Bulgaria
  BR: "BRL", // Brazil
  CA: "CAD", // Canada
  CH: "CHF", // Switzerland
  CN: "CNY", // China
  CZ: "CZK", // Czechia
  DE: "EUR", // Germany
  DK: "DKK", // Denmark
  ES: "EUR", // Spain
  FI: "EUR", // Finland
  FR: "EUR", // France
  GB: "GBP", // Great Britain
  GR: "EUR", // Greece
  HK: "HKD", // Hong Kong
  HR: "HRK", // Croatia
  HU: "HUF", // Hungary
  ID: "IDR", // Indonesia
  IE: "EUR", // Ireland
  IL: "ILS", // Israel
  IN: "INR", // India
  IQ: "IQD", // Iraq
  IT: "EUR", // Italy
  JP: "JPY", // Japan
  KR: "KRW", // Korea South
  KW: "KWD", // Kuwait
  LI: "CHF", // Liechtenstein
  LU: "EUR", // Luxembourg
  MA: "MAD", // Morocco
  MC: "EUR", // Monaco
  ME: "EUR", // Montenegro
  MX: "MXN", // Mexico
  NL: "EUR", // Netherlands
  NO: "NOK", // Norway
  NZ: "NZD", // New Zealand
  PL: "PLN", // Poland
  PT: "EUR", // Portugal
  RO: "RON", // Romania
  RS: "RSD", // Serbia
  RU: "RUB", // Russian Federation
  SA: "SAR", // Saudi Arabia
  SE: "SEK", // Sweden
  SG: "SGD", // Singapore
  SI: "EUR", // Slovenia
  TH: "THB", // Thailand
  TR: "TRY", // Turkey
  TW: "TWD", // Taiwan
  UA: "UAH", // Ukraine
  US: "USD", // United States of America
  ZA: "ZAR", // South Africa
} as const;

// from https://github.com/joker-x/languages.js
const languageMap = {
  aa: ["Afar", "Afar"],
  ab: ["Abkhazian", "Аҧсуа"],
  af: ["Afrikaans", "Afrikaans"],
  ak: ["Akan", "Akana"],
  am: ["Amharic", "አማርኛ"],
  an: ["Aragonese", "Aragonés"],
  ar: ["Arabic", "العربية"],
  as: ["Assamese", "অসমীয়া"],
  av: ["Avar", "Авар"],
  ay: ["Aymara", "Aymar"],
  az: ["Azerbaijani", "Azərbaycanca / آذربايجان"],
  ba: ["Bashkir", "Башҡорт"],
  be: ["Belarusian", "Беларуская"],
  bg: ["Bulgarian", "Български"],
  bh: ["Bihari", "भोजपुरी"],
  bi: ["Bislama", "Bislama"],
  bm: ["Bambara", "Bamanankan"],
  bn: ["Bengali", "বাংলা"],
  bo: ["Tibetan", "བོད་ཡིག / Bod skad"],
  br: ["Breton", "Brezhoneg"],
  bs: ["Bosnian", "Bosanski"],
  ca: ["Catalan", "Català"],
  ce: ["Chechen", "Нохчийн"],
  ch: ["Chamorro", "Chamoru"],
  co: ["Corsican", "Corsu"],
  cr: ["Cree", "Nehiyaw"],
  cs: ["Czech", "Česky"],
  cu: ["Old Church Slavonic / Old Bulgarian", "словѣньскъ / slověnĭskŭ"],
  cv: ["Chuvash", "Чăваш"],
  cy: ["Welsh", "Cymraeg"],
  da: ["Danish", "Dansk"],
  de: ["German", "Deutsch"],
  dv: ["Divehi", "ދިވެހިބަސް"],
  dz: ["Dzongkha", "ཇོང་ཁ"],
  ee: ["Ewe", "Ɛʋɛ"],
  el: ["Greek", "Ελληνικά"],
  en: ["English", "English"],
  eo: ["Esperanto", "Esperanto"],
  es: ["Spanish", "Español"],
  et: ["Estonian", "Eesti"],
  eu: ["Basque", "Euskara"],
  fa: ["Persian", "فارسی"],
  ff: ["Peul", "Fulfulde"],
  fi: ["Finnish", "Suomi"],
  fj: ["Fijian", "Na Vosa Vakaviti"],
  fo: ["Faroese", "Føroyskt"],
  fr: ["French", "Français"],
  fy: ["West Frisian", "Frysk"],
  ga: ["Irish", "Gaeilge"],
  gd: ["Scottish Gaelic", "Gàidhlig"],
  gl: ["Galician", "Galego"],
  gn: ["Guarani", "Avañe'ẽ"],
  gu: ["Gujarati", "ગુજરાતી"],
  gv: ["Manx", "Gaelg"],
  ha: ["Hausa", "هَوُسَ"],
  he: ["Hebrew", "עברית"],
  hi: ["Hindi", "हिन्दी"],
  ho: ["Hiri Motu", "Hiri Motu"],
  hr: ["Croatian", "Hrvatski"],
  ht: ["Haitian", "Krèyol ayisyen"],
  hu: ["Hungarian", "Magyar"],
  hy: ["Armenian", "Հայերեն"],
  hz: ["Herero", "Otsiherero"],
  ia: ["Interlingua", "Interlingua"],
  id: ["Indonesian", "Bahasa Indonesia"],
  ie: ["Interlingue", "Interlingue"],
  ig: ["Igbo", "Igbo"],
  ii: ["Sichuan Yi", "ꆇꉙ / 四川彝语"],
  ik: ["Inupiak", "Iñupiak"],
  io: ["Ido", "Ido"],
  is: ["Icelandic", "Íslenska"],
  it: ["Italian", "Italiano"],
  iu: ["Inuktitut", "ᐃᓄᒃᑎᑐᑦ"],
  ja: ["Japanese", "日本語"],
  jv: ["Javanese", "Basa Jawa"],
  ka: ["Georgian", "ქართული"],
  kg: ["Kongo", "KiKongo"],
  ki: ["Kikuyu", "Gĩkũyũ"],
  kj: ["Kuanyama", "Kuanyama"],
  kk: ["Kazakh", "Қазақша"],
  kl: ["Greenlandic", "Kalaallisut"],
  km: ["Cambodian", "ភាសាខ្មែរ"],
  kn: ["Kannada", "ಕನ್ನಡ"],
  ko: ["Korean", "한국어"],
  kr: ["Kanuri", "Kanuri"],
  ks: ["Kashmiri", "कश्मीरी / كشميري"],
  ku: ["Kurdish", "Kurdî / كوردی"],
  kv: ["Komi", "Коми"],
  kw: ["Cornish", "Kernewek"],
  ky: ["Kirghiz", "Kırgızca / Кыргызча"],
  la: ["Latin", "Latina"],
  lb: ["Luxembourgish", "Lëtzebuergesch"],
  lg: ["Ganda", "Luganda"],
  li: ["Limburgian", "Limburgs"],
  ln: ["Lingala", "Lingála"],
  lo: ["Laotian", "ລາວ / Pha xa lao"],
  lt: ["Lithuanian", "Lietuvių"],
  lv: ["Latvian", "Latviešu"],
  mg: ["Malagasy", "Malagasy"],
  mh: ["Marshallese", "Kajin Majel / Ebon"],
  mi: ["Maori", "Māori"],
  mk: ["Macedonian", "Македонски"],
  ml: ["Malayalam", "മലയാളം"],
  mn: ["Mongolian", "Монгол"],
  mo: ["Moldovan", "Moldovenească"],
  mr: ["Marathi", "मराठी"],
  ms: ["Malay", "Bahasa Melayu"],
  mt: ["Maltese", "bil-Malti"],
  my: ["Burmese", "Myanmasa"],
  na: ["Nauruan", "Dorerin Naoero"],
  nd: ["North Ndebele", "Sindebele"],
  ne: ["Nepali", "नेपाली"],
  ng: ["Ndonga", "Oshiwambo"],
  nl: ["Dutch", "Nederlands"],
  nn: ["Norwegian Nynorsk", "Norsk (nynorsk)"],
  no: ["Norwegian", "Norsk (bokmål / riksmål)"],
  nr: ["South Ndebele", "isiNdebele"],
  nv: ["Navajo", "Diné bizaad"],
  ny: ["Chichewa", "Chi-Chewa"],
  oc: ["Occitan", "Occitan"],
  oj: ["Ojibwa", "ᐊᓂᔑᓈᐯᒧᐎᓐ / Anishinaabemowin"],
  om: ["Oromo", "Oromoo"],
  or: ["Oriya", "ଓଡ଼ିଆ"],
  os: ["Ossetian / Ossetic", "Иронау"],
  pa: ["Panjabi / Punjabi", "ਪੰਜਾਬੀ / पंजाबी / پنجابي"],
  pi: ["Pali", "Pāli / पाऴि"],
  pl: ["Polish", "Polski"],
  ps: ["Pashto", "پښتو"],
  pt: ["Portuguese", "Português"],
  qu: ["Quechua", "Runa Simi"],
  rm: ["Raeto Romance", "Rumantsch"],
  rn: ["Kirundi", "Kirundi"],
  ro: ["Romanian", "Română"],
  ru: ["Russian", "Русский"],
  rw: ["Rwandi", "Kinyarwandi"],
  sa: ["Sanskrit", "संस्कृतम्"],
  sc: ["Sardinian", "Sardu"],
  sd: ["Sindhi", "सिनधि"],
  se: ["Northern Sami", "Sámegiella"],
  sg: ["Sango", "Sängö"],
  sh: ["Serbo-Croatian", "Srpskohrvatski / Српскохрватски"],
  si: ["Sinhalese", "සිංහල"],
  sk: ["Slovak", "Slovenčina"],
  sl: ["Slovenian", "Slovenščina"],
  sm: ["Samoan", "Gagana Samoa"],
  sn: ["Shona", "chiShona"],
  so: ["Somalia", "Soomaaliga"],
  sq: ["Albanian", "Shqip"],
  sr: ["Serbian", "Српски"],
  ss: ["Swati", "SiSwati"],
  st: ["Southern Sotho", "Sesotho"],
  su: ["Sundanese", "Basa Sunda"],
  sv: ["Swedish", "Svenska"],
  sw: ["Swahili", "Kiswahili"],
  ta: ["Tamil", "தமிழ்"],
  te: ["Telugu", "తెలుగు"],
  tg: ["Tajik", "Тоҷикӣ"],
  th: ["Thai", "ไทย / Phasa Thai"],
  ti: ["Tigrinya", "ትግርኛ"],
  tk: ["Turkmen", "Туркмен / تركمن"],
  tl: ["Tagalog / Filipino", "Tagalog"],
  tn: ["Tswana", "Setswana"],
  to: ["Tonga", "Lea Faka-Tonga"],
  tr: ["Turkish", "Türkçe"],
  ts: ["Tsonga", "Xitsonga"],
  tt: ["Tatar", "Tatarça"],
  tw: ["Twi", "Twi"],
  ty: ["Tahitian", "Reo Mā`ohi"],
  ug: ["Uyghur", "Uyƣurqə / ئۇيغۇرچە"],
  uk: ["Ukrainian", "Українська"],
  ur: ["Urdu", "اردو"],
  uz: ["Uzbek", "Ўзбек"],
  ve: ["Venda", "Tshivenḓa"],
  vi: ["Vietnamese", "Tiếng Việt"],
  vo: ["Volapük", "Volapük"],
  wa: ["Walloon", "Walon"],
  wo: ["Wolof", "Wollof"],
  xh: ["Xhosa", "isiXhosa"],
  yi: ["Yiddish", "ייִדיש"],
  yo: ["Yoruba", "Yorùbá"],
  za: ["Zhuang", "Cuengh / Tôô / 壮语"],
  zh: ["Chinese", "中文"],
  zu: ["Zulu", "isiZulu"],
} as const;

export type Country = keyof typeof currencyCodeMap;
export type Currency = typeof currencyCodeMap[Country];
export type Language = keyof typeof languageMap;
export type Locale = `${Language}-${Country}`; // technically wrong, but all we're able to look up

export const isCountry = (str?: string): str is Country =>
  !!str && Object.keys(currencyCodeMap).includes(str);
export const isLanguage = (str?: string): str is Language =>
  !!str && Object.keys(languageMap).includes(str);
export const isLocale = (str?: string): str is Locale =>
  !!str &&
  isLanguage(str.substring(0, 2)) &&
  str.charAt(2) === "-" &&
  isCountry(str.substring(3));

export const splitLocale = (
  locale?: Locale | Language | Country,
): [Language | undefined, Country | undefined] => {
  const str: string = locale ?? "";

  return isLocale(locale)
    ? [str.substring(0, 2) as Language, str.substring(3) as Country]
    : isCountry(str)
    ? [undefined, str as Country]
    : isLanguage(str)
    ? [str as Language, undefined]
    : [undefined, undefined];
};

export const getLanguage = (locale: Locale | Language): Language =>
  splitLocale(locale)[0] ?? DEFAULT_LANG;
export const getCountry = (locale: Locale): Country | undefined =>
  splitLocale(locale)[1];
export const getCurrency = (locale: Locale | Country): Currency => {
  const countryCode = isCountry(locale) ? locale : getCountry(locale);
  return (
    (countryCode && (currencyCodeMap as any)[countryCode]) ?? DEFAULT_CURRENCY
  );
};

export function formatCurrency(
  lt: Country | Locale,
  currency: Currency,
  value: number,
): string;
export function formatCurrency(
  lt: Country | Locale,
  currency: Currency,
): (_: number | bigint) => string;
export function formatCurrency(
  langtag: Country | Locale = DEFAULT_LOCALE,
  currency = DEFAULT_CURRENCY,
  value: number = 0,
) {
  const formatter = new Intl.NumberFormat(langtag, {
    style: "currency",
    currency,
  });
  return arguments.length < 3 ? formatter.format : formatter.format(value);
}

export function formatNumber(lt: Country | Locale, value: number): string;
export function formatNumber(lt: Country | Locale): (_: number) => string;
export function formatNumber(
  langtag: Country | Locale = DEFAULT_LOCALE,
  value: number = 0,
) {
  const formatter = new Intl.NumberFormat(langtag);
  return arguments.length < 2 ? formatter.format : formatter.format(value);
}

export function formatDate(lt: Country | Locale, value: string): string;
export function formatDate(lt: Country | Locale): (_: string) => string;
export function formatDate(
  langtag: Country | Locale = DEFAULT_LOCALE,
  date?: string,
) {
  if (arguments.length < 2) {
    return (theDate: string) => formatDate(langtag, theDate);
  }
  return new Intl.DateTimeFormat(langtag, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(Date.parse(date ?? ""));
}

export function formatDateTime(lt: Country | Locale, ISODate: string): string;
export function formatDateTime(lt: Country | Locale): (_: string) => string;
export function formatDateTime(
  langtag: Country | Locale = DEFAULT_LOCALE,
  ISODateString?: string,
) {
  if (arguments.length < 2) {
    return (theDate: string) => formatDate(langtag, theDate);
  }
  return new Intl.DateTimeFormat(langtag, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }).format(Date.parse(ISODateString ?? ""));
}

export const DEFAULT_CURRENCY: Currency = "EUR";
export const DEFAULT_LANG: Language = "de";
export const DEFAULT_LOCALE: Locale = "de-DE";
