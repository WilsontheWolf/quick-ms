"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTextFormat = exports.read24thFormat = exports.read12thFormat = void 0;
/**
 * Returns a total number of milliseconds detected from 24th time format.
 * @param {string} [text]
 * @returns {number}
 * @access private
 */
function read24thFormat(text) {
    const result = text.split(/:/);
    if (!result)
        throw new TypeError(`Can't convert: "${text}" into milliseconds.`);
    else if (result.length > 3)
        throw new TypeError(`Can't convert: "${text}" because it's too long. Max format: 00:00:00."`);
    if (result.length === 2)
        result.push('00');
    let j = 0;
    let k = 0;
    let ms = 0;
    for (let i = result.length - 1; i >= 0; i--) {
        k = Math.abs(parseInt(result[i]) * 1000 * Math.pow(60, j < 3 ? j : 2));
        //if(j === 3) k *= 24; // Days
        //else if(j === 4) k *= 24 * 7; // Weeks
        j++;
        ms += k;
    }
    if (isFinite(ms))
        return ms;
    else
        throw new TypeError(`Final value is greater than Number can hold.`);
}
exports.read24thFormat = read24thFormat;
/**
 * Returns a total number of milliseconds detected from 12th time format.
 * @param {string} [text]
 * @returns {number}
 * @access private
 */
function read12thFormat(text) {
    const result = text.split(/:/);
    if (!result)
        throw new TypeError(`Can't convert: "${text}" into milliseconds.`);
    else if (result.length < 2)
        throw new TypeError(`I do not recognize: "${text}" format.`);
    const modifier = text.slice(-2, text.length);
    result[0] = `${Math.abs(parseInt(result[0]))}`;
    //if(parseInt(result[0]) === 12) result[0] = '24';
    if (modifier === 'pm')
        result[0] = `${parseInt(result[0]) + 12}`;
    result[result.length - 1] = result[result.length - 1].slice(0, -2);
    if (result.length === 2)
        result.push('00');
    return read24thFormat(result.join(':'));
}
exports.read12thFormat = read12thFormat;
/**
 * Returns a total number of milliseconds detected from human readable, time format.
 * @param {string} [text]
 * @returns {number}
 * @access private
 */
function readTextFormat(text) {
    const result = text.match(/\d+[a-z]+/g);
    if (!result)
        throw new TypeError(`Can't convert: "${text}" into milliseconds.`);
    let ms = 0;
    for (const element of result) {
        const values = element.match(/(\d+)([a-z]+)/);
        if (!values)
            throw new Error("Some stuffs gone funky.");
        const [, num, type] = values;
        switch (type) {
            case 'y':
            case 'year':
            case 'years':
            case 'yrs':
            case 'yr': { // years
                ms += parseInt(num) * 3.154e+10;
                break;
            }
            case 'mo':
            case 'month':
            case 'months':
            case 'mnth':
            case 'mnths': { // months
                ms += parseInt(num) * 2.592e+9;
                break;
            }
            case 'week':
            case 'wk':
            case 'w':
            case 'weeks':
            case 'wks': { // Weeks
                ms += parseInt(num) * 6.048e+8;
                break;
            }
            case 'days':
            case 'day':
            case 'd': { // Days
                ms += parseInt(num) * 8.64e+7;
                break;
            }
            case 'hour':
            case 'hours':
            case 'h':
            case 'hr':
            case 'hrs': { // Hours
                ms += parseInt(num) * 3.6e+6;
                break;
            }
            case 'minute':
            case 'min':
            case 'mins':
            case 'm':
            case 'minutes': { // Minutes
                ms += parseInt(num) * 60000;
                break;
            }
            case 'second':
            case 'seconds':
            case 'sec':
            case 'secs':
            case 's': { // Seconds
                ms += parseInt(num) * 1000;
                break;
            }
            case 'millisecond':
            case 'milliseconds':
            case 'ms': { // Milliseconds
                ms += parseInt(num);
                break;
            }
            default: throw new TypeError(`I do not recognize: "${type}" format.`);
        }
    }
    if (isFinite(ms))
        return ms;
    else
        throw new TypeError(`Final value is greater than Number can hold.`);
}
exports.readTextFormat = readTextFormat;
//# sourceMappingURL=private.js.map