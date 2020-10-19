# BETTER-MS
Basically that's an old, well known ["ms"](https://www.npmjs.com/package/ms) - but in it's advanced form.
## ⚔️ **better-ms** VS. **ms**
- It is generally slightly faster
- Always shows back real values *(Classic ms returns rounded big values)*
- Supports more time formats (text, 24h & 12h types)
- Includes @Types *(It is written in TypeScript)*
- Always returns only positive values

<br />

## ⚙️ Features
- Works both in Node.js and in the browser
- Returns time value = 0 every time when provided argument is invalid or reached infinity.
- If you pass a string with a number and a valid unit, the number of equivalent milliseconds is returned

<br />

## 📚 Functions/Mechanics
|      Function     |              Arguments              |                                      Description                                     |
|:-----------------:|:-----------------------------------:|:------------------------------------------------------------------------------------:|
| getMilliseconds() |         timeFormat: `string`        |                        Returns a total number of milliseconds.                       |
|  getTimeObject()  |             ms: `number`            |                                Returns `{timeObject}`.                               |
| getReadableTime() | ms: `number`, isCompact?: `boolean` | Return raw time value as a human readable string. *(isCompact = `false` by default)* |

<br />

# Examples
- Getting raw values *(milliseconds)* :
```js
import { getMilliseconds } from 'better-ms';

console.log(getMilliseconds('1 day, 12 minutes'));
// OUT: 87120000

console.log(getMilliseconds('1h'));
console.log(getMilliseconds('-01:00'));
// OUT[1]: 3600000
// OUT[2]: 3600000

console.log(getMilliseconds('09:00 AM'));
// OUT: 32400000
```

> ### ❗️ **Remember**
> Format: `XX:XX` stands for **Hh:Mm**, if you want to be more accurate - you can add information about seconds. - `XX:XX:XX` that stands for **Hh:Mm:Ss**

<br />

- Getting time objects:
```js
import { getMilliseconds, getTimeObject } from 'better-ms';

console.log(getTimeObject(new Date().getTime()));
// OUT:  {
//   years: 50,
//   weeks: 41,
//   days: 4,
//   hours: 13,
//   minutes: 15,
//   seconds: 25,
//   milliseconds: 611
// }

console.log(getTimeObject(getMilliseconds('29hrs')));
// OUT:  {
//   years: 0,
//   weeks: 0,
//   days: 1,
//   hours: 5,
//   minutes: 0,
//   seconds: 0,
//   milliseconds: 0
// }
```
- Displaying raw time value:
```js
import { getMilliseconds, getReadableTime } from 'better-ms';

console.log(getReadableTime(60000));
// OUT: 1 second

console.log(getReadableTime(new Date().getTime()));
// OUT: 50 years, 41 weeks, 4 days, 13 hours, 29 minutes, 42 seconds

console.log(getReadableTime(23233000, true));
// OUT: 6h27m13s

console.log(getReadableTime(new Date(2014, 0, 1, 10, 40).getTime() - new Date(2014, 0, 1, 10, 5).getTime()));
// OUT: 35 minutes
```