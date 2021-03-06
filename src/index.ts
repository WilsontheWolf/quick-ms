import { read12thFormat, read24thFormat, readTextFormat } from './private';

interface timeObject {
    years: number
    months: number
    weeks: number
    days: number
    hours: number
    minutes: number
    seconds: number
    milliseconds: number
}

interface readableOptions {
    compact?: boolean
    showEmpty?: boolean
    showMS?: boolean
}

/**
 * Returns a total number of milliseconds.
 * @param {string} [timeFormat]
 * @returns {number}
 * @access public
 */
function getMilliseconds(timeFormat: string): number {
    if (!timeFormat || timeFormat === '') return 0;
    timeFormat = timeFormat.replace(/[, ]+/g, '').toLowerCase();
    if (timeFormat.includes(':')) {
        if (['pm', 'am'].includes(timeFormat.slice(-2, timeFormat.length))) return read12thFormat(timeFormat);
        else return read24thFormat(timeFormat);
    }
    else return readTextFormat(timeFormat);
}

/**
 * Returns timeObject.
 * @param {number} [ms]
 * @returns {timeObject}
 * @access public
 */
function getTimeObject(ms: number): timeObject {
    const result: timeObject = {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: Math.floor(ms)
    };
    if (!ms || typeof ms !== 'number' || !isFinite(ms)) return result;

    // Calculate time in rough way
    while (result.milliseconds >= 1000) {
        if (result.milliseconds >= 3.154e+10) {
            result.years++;
            result.milliseconds -= 3.154e+10;
        }
        if (result.milliseconds >= 2.592e+9) {
            result.months++;
            result.milliseconds -= 2.592e+9;
        }
        if (result.milliseconds >= 6.048e+8) {
            result.weeks++;
            result.milliseconds -= 6.048e+8;
        }
        if (result.milliseconds >= 8.64e+7) {
            result.days++;
            result.milliseconds -= 8.64e+7;
        }
        if (result.milliseconds >= 3.6e+6) {
            result.hours++;
            result.milliseconds -= 3.6e+6;
        }
        if (result.milliseconds >= 60000) {
            result.minutes++;
            result.milliseconds -= 60000;
        }
        if (result.milliseconds >= 1000) {
            result.seconds++;
            result.milliseconds -= 1000;
        }
    }

    // Make it smooth, aka sort
    if (result.seconds >= 60) {
        result.minutes += Math.floor(result.seconds / 60);
        result.seconds = result.seconds - (Math.floor(result.seconds / 60) * 60);
    }
    if (result.minutes >= 60) {
        result.hours += Math.floor(result.minutes / 60);
        result.minutes = result.minutes - (Math.floor(result.minutes / 60) * 60);
    }
    if (result.hours >= 24) {
        result.days += Math.floor(result.hours / 24);
        result.hours = result.hours - (Math.floor(result.hours / 24) * 24);
    }
    if (result.days >= 7) {
        result.weeks += Math.floor(result.days / 7);
        result.days = result.days - (Math.floor(result.days / 7) * 7);
    }
    if (result.weeks >= 52) {
        result.months += Math.floor(result.weeks / 4);
        result.weeks = result.weeks - (Math.floor(result.weeks / 7) * 7);
    }
    if (result.months >= 12) {
        result.years += Math.floor(result.months / 12);
        result.months = result.months - (Math.floor(result.months / 12) * 12);
    }

    return result;
}

/**
 * Return raw time value as a human readable string. (it skips ms)
 * @param {number} [ms]
 * @param {boolean} [isCompact]
 * @returns {string}
 * @access public
 */
function getReadableTime(ms: number, options: readableOptions = {}): string {
    if (!ms || typeof ms !== 'number' || !isFinite(ms)) return '0s';
    const t = getTimeObject(ms);
    const reply: string[] = [];

    if (!options.showMS && ms <= 1000) throw new TypeError(`Final value is smaller than 1 second (Exactly: ${ms}ms). To show milliseconds use the showMS option.`);
    if (options.compact) {
        if (options.showEmpty ? true : t.years) reply.push(`${t.years}y`);
        if (options.showEmpty ? true : t.months) reply.push(`${t.months}mo`);
        if (options.showEmpty ? true : t.weeks) reply.push(`${t.weeks}w`);
        if (options.showEmpty ? true : t.days) reply.push(`${t.days}d`);
        if (options.showEmpty ? true : t.hours) reply.push(`${t.hours}h`);
        if (options.showEmpty ? true : t.minutes) reply.push(`${t.minutes}m`);
        if (options.showEmpty ? true : t.seconds) reply.push(`${t.seconds}s`);
        if (options.showMS ? options.showEmpty ? true : t.milliseconds : false) reply.push(`${t.milliseconds}ms`);
    }
    else {
        if (options.showEmpty ? true : t.years) reply.push(`${t.years} year${t.years > 1 ? 's' : ''}`);
        if (options.showEmpty ? true : t.months) reply.push(`${t.months} month${t.months > 1 ? 's' : ''}`);
        if (options.showEmpty ? true : t.weeks) reply.push(`${t.weeks} week${t.weeks > 1 ? 's' : ''}`);
        if (options.showEmpty ? true : t.days) reply.push(`${t.days} day${t.days > 1 ? 's' : ''}`);
        if (options.showEmpty ? true : t.hours) reply.push(`${t.hours} hour${t.hours > 1 ? 's' : ''}`);
        if (options.showEmpty ? true : t.minutes) reply.push(`${t.minutes} minute${t.minutes > 1 ? 's' : ''}`);
        if (options.showEmpty ? true : t.seconds) reply.push(`${t.seconds} second${t.seconds > 1 ? 's' : ''}`);
        if (options.showMS ? options.showEmpty ? true : t.milliseconds : false) reply.push(`${t.milliseconds} millisecond${t.milliseconds > 1 ? 's' : ''}`);
    }

    if (reply.length > 0 ) return reply.join(', ');
    else throw new TypeError(`There is nothing to display.${options.showMS && ms>0? ' To show milliseconds use the showMS option.' : ''}`);
}

export { getMilliseconds, getTimeObject, getReadableTime };