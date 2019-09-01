module.exports = {
    roundNumber: roundNumber,
    calculateGrossIncome: calculateGrossIncome
};

const CONST = {
    MONTHS: 12,
};

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

/**
 * calculateGrossIncome(annualSalary)
 * @param {*} annualSalary Number to be rounded
 * Returns input rounded up (if >= 0.5), or down
 */
function calculateGrossIncome(annualSalary) {
    let grossIncome = annualSalary / CONST.MONTHS;
    grossIncome = roundNumber(grossIncome);

    return grossIncome;
}
