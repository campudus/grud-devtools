# GRUD dev tools

Tools to share common tasks for GRUD data.

All sub packages' exports are also exported by the package's main entry point.

## Publishing Workflow

Publishing is done in the jsr way. You can publish manually or automatically via github actions, which is the default and recommended way.

Steps to follow:

1. Make your changes
2. Update the version in `deno.jsonc` in semver format
3. Document your changes in the `CHANGELOG.md` file
4. Create a pull request and ask a nice colleague to approve your great changes
5. Merge the pull request and wait for the github action to publish the new version

## Install

Go to [https://jsr.io/@grud/devtools](https://jsr.io/@grud/devtools), choose your runtime and follow the instructions.

## Types

Can be found in the `grud-devtools/types` sub package.

## Type predicates

A number of useful predicates can be imported from `grud-devtools/predicates`

```typescript
import { isBooleanColumn } from "grud-devtools/predicates";
```

## Localization helpers

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

## License

```txt
Copyright 2016-present Campudus GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
