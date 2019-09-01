module.exports = {
    roundNumber: roundNumber,
    calculateGrossIncome: calculateGrossIncome,
    calculateIncomeTax: calculateIncomeTax,
    calculateNetIncome: calculateNetIncome,
    calculateSuper: calculateSuper,
    calculatePay: calculatePay
};

const CONST = {
    MONTHS: 12,
    INCOME_TAX: [
        {
            LOWER_BOUND: 0,
            UPPER_BOUND: 18200
        },
        {
            LOWER_BOUND: 18201,
            UPPER_BOUND: 37000,
            RATE: 0.19
        },
        {
            LOWER_BOUND: 37001,
            UPPER_BOUND: 80000,
            FIXED_AMOUNT: 3572,
            RATE: 0.325
        },
        {
            LOWER_BOUND: 80001,
            UPPER_BOUND: 180000,
            FIXED_AMOUNT: 17547,
            RATE: 0.37
        },
        {
            LOWER_BOUND: 180001,
            UPPER_BOUND: Number.MAX_SAFE_INTEGER,
            FIXED_AMOUNT: 54547,
            RATE: 0.45
        }
    ]
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
 * @param {*} annualSalary Employee's annual salary
 * Returns gross monthly income
 */
function calculateGrossIncome(annualSalary) {
    let grossIncome = annualSalary / CONST.MONTHS;
    grossIncome = roundNumber(grossIncome);

    return grossIncome;
}

/**
 * calculateIncomeTax(annualSalary)
 * @param {*} annualSalary Employee's annual salary
 * Returns income tax according to tax bracket (defined in CONST.INCOME_TAX)
 */
function calculateIncomeTax(annualSalary) {
    // Find the tax bracket for the annualSalary
    let bracket;
    for (let i = 0; i < CONST.INCOME_TAX.length; i++) {
        if (annualSalary < CONST.INCOME_TAX[i].UPPER_BOUND) {
            bracket = CONST.INCOME_TAX[i];
            break;
        }
    }

    let fixedAmount = 0;
    if (bracket.FIXED_AMOUNT != undefined) {
        fixedAmount = bracket.FIXED_AMOUNT;
    }

    let lowerBound = 0;
    if (bracket.LOWER_BOUND > 0) {
        lowerBound = bracket.LOWER_BOUND - 1;
    }

    // A rate of 1 indicates that the employee does not get taxed - they get the full amount back
    let rate = 1;
    if (bracket.RATE != undefined) {
        rate = bracket.RATE;
    }

    let incomeTax = (fixedAmount + (annualSalary - lowerBound) * rate) / CONST.MONTHS;
    incomeTax = roundNumber(incomeTax);

    return incomeTax;
}

/**
 * calculateNetIncome(annualSalary)
 * @param {*} grossIncome Employee's gross income (already rounded)
 * @param {*} incomeTax Employee's income tax (already rounded)
 * Returns net income by subtracting incomeTax from grossIncome
 */
function calculateNetIncome(grossIncome, incomeTax) {
    return grossIncome - incomeTax;
}

/**
 * calculateSuper(annualSalary)
 * @param {*} grossIncome Employee's gross income (already rounded)
 * @param {*} superRate Employee's super rate
 * Returns super amount according to grossIncome and superRate
 */
function calculateSuper(grossIncome, superRate) {
    let superValue = grossIncome * superRate;
    superValue = roundNumber(superValue);
    return superValue;
}

/**
 * calculatePay(annualSalary, superRate)
 * @param {*} annualSalary Employee's annual salary
 * @param {*} superRate Employee's super rate
 * Returns net pay for the calendar month
 */
function calculatePay(annualSalary, superRate) {
    const grossIncome = calculateGrossIncome(annualSalary);
    const incomeTax = calculateIncomeTax(annualSalary);
    const netIncome = calculateNetIncome(grossIncome, incomeTax);
    const superValue = calculateSuper(grossIncome, superRate);
    const pay = netIncome - superValue;

    return pay;
}

$('.generate-payslip').on('click', function(e) {
    e.preventDefault();
    const firstName = $('.first-name').val();
    const familyName = $('.family-name').val();
    const annualSalary = $('.annual-salary').val();
    const superRate = $('.super-rate').val();
});
