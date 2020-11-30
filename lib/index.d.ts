interface timeObject {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}
interface readableOptions {
    compact?: boolean;
    showEmpty?: boolean;
    showMS?: boolean;
}
/**
 * Returns a total number of milliseconds.
 * @param {string} [timeFormat]
 * @returns {number}
 * @access public
 */
declare function getMilliseconds(timeFormat: string): number;
/**
 * Returns timeObject.
 * @param {number} [ms]
 * @returns {timeObject}
 * @access public
 */
declare function getTimeObject(ms: number): timeObject;
/**
 * Return raw time value as a human readable string. (it skips ms)
 * @param {number} [ms]
 * @param {boolean} [isCompact]
 * @returns {string}
 * @access public
 */
declare function getReadableTime(ms: number, options?: readableOptions): string;
export { getMilliseconds, getTimeObject, getReadableTime };
//# sourceMappingURL=index.d.ts.map