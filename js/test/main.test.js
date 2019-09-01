const functions = require('../main.js');

// Round number
test('Rounds 1.9 up to be 2', () => {
    expect(functions.roundNumber(1.9)).toBe(2);
});
test('Rounds 1.1 down to be 1', () => {
    expect(functions.roundNumber(1.1)).toBe(1);
});
test('Rounds 99.5 up to be 100', () => {
    expect(functions.roundNumber(99.5)).toBe(100);
});
test('Rounds 0.2 up to be 0', () => {
    expect(functions.roundNumber(0.2)).toBe(0);
});

// Calculate Gross Income
test('Calculates Gross Income of 60050 to be 5004', () => {
    expect(functions.calculateGrossIncome(60050)).toBe(5004);
});
test('Calculates Gross Income of 40000 to be 3333', () => {
    expect(functions.calculateGrossIncome(40000)).toBe(3333);
});
test('Calculates Gross Income of 123456 to be 10288', () => {
    expect(functions.calculateGrossIncome(123456)).toBe(10288);
});
test('Calculates Gross Income of 80999 to be 6750', () => {
    expect(functions.calculateGrossIncome(80999)).toBe(6750);
});

// Calculate Income Tax
test('Calculates Income Tax of 60050 to be 922', () => {
    expect(functions.calculateIncomeTax(60050)).toBe(922);
});
test('Calculates Income Tax of 40000 to be 379', () => {
    expect(functions.calculateIncomeTax(40000)).toBe(379);
});
test('Calculates Income Tax of 123456 to be 2802', () => {
    expect(functions.calculateIncomeTax(123456)).toBe(2802);
});
test('Calculates Income Tax of 999999 to be 35296', () => {
    expect(functions.calculateIncomeTax(999999)).toBe(35296);
});
test('Calculates Income Tax of 100 to be 8', () => {
    expect(functions.calculateIncomeTax(100)).toBe(8);
});

// Calculate Net Income
test('Calculates Net Income of 60050 to be 922', () => {
    const grossIncome = functions.calculateGrossIncome(60050);
    const incomeTax = functions.calculateIncomeTax(60050);
    expect(functions.calculateNetIncome(grossIncome, incomeTax)).toBe(4082);
});

// Calculate Super
test('Calculates Super of 60050 at a rate of 9% to be 450', () => {
    const grossIncome = functions.calculateGrossIncome(60050);
    const superRate = 0.09;
    expect(functions.calculateSuper(grossIncome, superRate)).toBe(450);
});

// Calculate Pay
test('Calculates Pay of 60050 at a rate of 9% to be 3632', () => {
    const annualSalary = 60050;
    const superRate = 0.09;
    expect(functions.calculatePay(annualSalary, superRate)).toBe(3632);
});
