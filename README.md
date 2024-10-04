# GRUD dev tools

Tools to share common tasks for GRUD data.

All sub packages' exports are also exported by the package's main entry point.

## Types

Can be found in the `grud-devtools/types` sub package.

## Type predicates

A number of useful predicates can be imported from `grud-devtools/predicates`

```typescript
import { isBooleanColumn } from "grud-devtools/predicates";
```

## Localisation helpers

```typescript
import { formatCurrency, getCurrency } from "grud-devtools/intl";

const langtag = "de-DE";
const amount = 1234.56;

formatCurrency(langtag, getCurrency(langtag), amount);
// > "1.234,56 EUR"
```

## `getDisplayValue`

Creates display value objects with entries for all required langtags.\
As such it needs to know which langtags should be generated.\
It will optionally format numbers, currencies and dates either for a specific
language, or infer a format for every given langtag.

```typescript
import { getDisplayValue } from "grud-devtools";

const supportedLangs = ["de-DE", "en-US"];

const gdv = getDisplayValue(supportedLangs);

const getGermanDisplayValue = gdv("de-DE");
const getDisplayValuePerLangtag = gdv();

getGermanDisplayValue(numberColumn, 1234.56);
// > { "de-DE": "1.234,56",
//     "en-US": "1.234,56" }
// All numbers formatted for German viewers -- e.g. GRUD frontend

getDisplayValuePerLangtag(numberColumn, 1234.56);
// > { "de-DE": "1.234,56",
//     "en-US": "1,234.56" }
// All numbers formatted for the country of the value -- e.g. national catalogues
```
