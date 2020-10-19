"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReadableTime = exports.getTimeObject = exports.getMilliseconds = void 0;
const private_1 = require("./private");
/**
 * Returns a total number of milliseconds.
 * @param {string} [timeFormat]
 * @returns {number}
 * @access public
 */
function getMilliseconds(timeFormat) {
    if (!timeFormat || timeFormat === '')
        return 0;
    timeFormat = timeFormat.replace(/[, ]+/g, '').toLowerCase();
    if (timeFormat.includes(':')) {
        if (['pm', 'am'].includes(timeFormat.slice(-2, timeFormat.length)))
            return private_1.read12thFormat(timeFormat);
        else
            return private_1.read24thFormat(timeFormat);
    }
    else
        return private_1.readTextFormat(timeFormat);
}
exports.getMilliseconds = getMilliseconds;
/**
 * Returns timeObject.
 * @param {number} [ms]
 * @returns {timeObject}
 * @access public
 */
function getTimeObject(ms) {
    if (!ms || typeof ms !== 'number' || !isFinite(ms))
        return { years: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
    let result = {
        years: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: Math.round(ms)
    };
    result.seconds = Math.floor(result.milliseconds / 1000);
    result.milliseconds = result.milliseconds - (result.seconds * 1000);
    result.minutes = Math.floor(result.seconds / 60);
    result.seconds = result.seconds - (result.minutes * 60);
    result.hours = Math.floor(result.minutes / 60);
    result.minutes = result.minutes - (result.hours * 60);
    result.days = Math.floor(result.hours / 24);
    result.hours = result.hours - (result.days * 24);
    result.weeks = Math.floor(result.days / 7);
    result.days = result.days - (result.weeks * 7);
    result.years = Math.floor((result.weeks * 7 + result.days) / 365.25);
    result.weeks = Math.floor(result.weeks - (result.years * (52 + 5 / 28)));
    return result;
}
exports.getTimeObject = getTimeObject;
/**
 * Return raw time value as a human readable string.
 * @param {number} [ms]
 * @param {boolean} [isCompact]
 * @returns {string}
 * @access public
 */
function getReadableTime(ms, isCompact = false) {
    if (!ms || typeof ms !== 'number' || !isFinite(ms))
        return '0s';
    const t = getTimeObject(ms);
    if (isCompact) {
        let reply = [];
        if (t.years)
            reply.push(`${t.years}y`);
        if (t.weeks)
            reply.push(`${t.weeks}w`);
        if (t.days)
            reply.push(`${t.days}d`);
        if (t.hours)
            reply.push(`${t.hours}h`);
        if (t.minutes)
            reply.push(`${t.minutes}m`);
        if (t.seconds)
            reply.push(`${t.seconds}s`);
        return reply.join('');
    }
    else {
        let reply = [];
        if (t.years)
            reply.push(`${t.years} year${t.years > 1 ? 's' : ''}`);
        if (t.weeks)
            reply.push(`${t.weeks} week${t.weeks > 1 ? 's' : ''}`);
        if (t.days)
            reply.push(`${t.days} day${t.days > 1 ? 's' : ''}`);
        if (t.hours)
            reply.push(`${t.hours} hour${t.hours > 1 ? 's' : ''}`);
        if (t.minutes)
            reply.push(`${t.minutes} minute${t.minutes > 1 ? 's' : ''}`);
        if (t.seconds)
            reply.push(`${t.seconds} second${t.seconds > 1 ? 's' : ''}`);
        return reply.join(', ');
    }
}
exports.getReadableTime = getReadableTime;
//# sourceMappingURL=index.js.map