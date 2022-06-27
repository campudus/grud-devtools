# GRUD dev tools

Tools to share common tasks for GRUD data.

## Types

## `getDisplayValue`

Creates display value objects with entries for all required langtags.  
As such it needs to know which langtags should be generated.  
It will optionally format numbers, currencies and dates either for a specific 
language, or infer a format for every given langtag.

``` typescript
import { getDisplayValue } from 'grud-devtools';

const supportedLangs = ["de-DE", "en-US"];

const gdv = getDisplayValue(supportedLangs);

const getGermanDisplayValue = gdv("de-DE");
const getDisplayValuePerLangtag = gdv();

getGermanDisplayValue(numberColumn, 1234.56)
// > { "de-DE": "1.234,56",
//     "en-US": "1.234,56" }
// All numbers formatted for German viewers -- e.g. GRUD frontend

getDisplayValuePerLangtag(numberColumn, 1234.56)
// > { "de-DE": "1.234,56",
//     "en-US": "1,234.56" }
// All numbers formatted for the country of the value -- e.g. national catalogues
```
