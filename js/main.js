/**
 * roundNumber(number)
 * @param {*} number Number to be rounded
 * Returns input rounded up (if >= 0.5), or down
 */
function roundNumber(number) {
    let remainder = number % 1;

    if (remainder >= 0.5) {
        number = Math.ceil(number);
    }
    else {
        number = Math.floor(number);
    }

    return number;
}
module.exports = roundNumber;
