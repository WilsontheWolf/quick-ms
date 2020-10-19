/**
 * Returns a total number of milliseconds detected from 24th time format.
 * @param {string} [text]
 * @returns {number}
 * @access private
 */
declare function read24thFormat(text: string): number;
/**
 * Returns a total number of milliseconds detected from 12th time format.
 * @param {string} [text]
 * @returns {number}
 * @access private
 */
declare function read12thFormat(text: string): number;
/**
 * Returns a total number of milliseconds detected from human readable, time format.
 * @param {string} [text]
 * @returns {number}
 * @access private
 */
declare function readTextFormat(text: string): number;
export { read12thFormat, read24thFormat, readTextFormat };
//# sourceMappingURL=private.d.ts.map