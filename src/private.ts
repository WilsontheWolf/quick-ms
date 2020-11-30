/**
 * Returns a total number of milliseconds detected from 24th time format.
 * @param {string} [text]
 * @returns {number}
 * @access private
 */
function read24thFormat(text: string): number {
    const result: RegExpMatchArray | null = text.split(/:/);
    if(!result) throw new TypeError(`Can't convert: "${text}" into milliseconds.`);
    else if(result.length > 3) throw new TypeError(`Can't convert: "${text}" because it's too long. Max format: 00:00:00."`);
    if(result.length === 2) result.push('00');
    let j: number = 0;
    let k: number = 0;
    let ms: number = 0;
    for(let i = result.length-1; i >= 0; i--) {
        k = Math.abs(parseInt(result[i]) * 1000 * Math.pow(60, j < 3 ? j : 2));
        //if(j === 3) k *= 24; // Days
        //else if(j === 4) k *= 24 * 7; // Weeks
        j++;
        ms += k;
    }
    if(isFinite(ms)) return ms;
    else throw new TypeError(`Final value is greater than Number can hold.`);
}

/**
 * Returns a total number of milliseconds detected from 12th time format.
 * @param {string} [text]
 * @returns {number}
 * @access private
 */
function read12thFormat(text: string): number {
    const result: RegExpMatchArray | null = text.split(/:/);
    if(!result) throw new TypeError(`Can't convert: "${text}" into milliseconds.`);
    else if(result.length < 2) throw new TypeError(`I do not recognize: "${text}" format.`);
    const modifier: string = text.slice(-2, text.length);
    result[0] = `${Math.abs(parseInt(result[0]))}`;
    
    //if(parseInt(result[0]) === 12) result[0] = '24';
    if(modifier === 'pm') result[0] = `${parseInt(result[0]) + 12}`;
    result[result.length-1] = result[result.length-1].slice(0, -2);
    if(result.length === 2) result.push('00');
    return read24thFormat(result.join(':'));
}

/**
 * Returns a total number of milliseconds detected from human readable, time format.
 * @param {string} [text]
 * @returns {number}
 * @access private
 */
function readTextFormat(text: string): number {
    const result: RegExpMatchArray | null = text.match(/(\d+[a-z])/g);
    if(!result) throw new TypeError(`Can't convert: "${text}" into milliseconds.`);
    let ms: number = 0;
    for(const element of result) {
        switch(element[element.length - 1]) {
            case 'y': { // Weeks
                ms += parseInt(element) * 3.154e+10;
                break;
            }
            case 'w': { // Weeks
                ms += parseInt(element) * 6.048e+8;
                break;
            }
            case 'd': { // Days
                ms += parseInt(element) * 8.64e+7;
                break;
            }
            case 'h': { // Hours
                ms += parseInt(element) * 3.6e+6;
                break;
            }
            case 'm': { // Minutes
                ms += parseInt(element) * 60000;
                break;
            }
            case 's': { // Seconds
                ms += parseInt(element) * 1000;
                break;
            }
            default: throw new TypeError(`I do not recognize: "${element}" format.`);
        }
    }

    if(isFinite(ms)) return ms;
    else throw new TypeError(`Final value is greater than Number can hold.`);
}

export { read12thFormat, read24thFormat, readTextFormat };