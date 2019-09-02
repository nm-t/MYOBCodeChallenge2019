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
    expect(functions.calculateIncomeTax(100)).toBe(0);
});
test('Calculates Income Tax of 18201 to be 0', () => {
    expect(functions.calculateIncomeTax(18201)).toBe(0);
});
test('Calculates Income Tax of 80000 to be 1462', () => {
    expect(functions.calculateIncomeTax(80000)).toBe(1462);
});

// Calculate Net Income
test('Calculates Net Income of 60050 to be 4082', () => {
    const grossIncome = functions.calculateGrossIncome(60050);
    const incomeTax = functions.calculateIncomeTax(60050);
    expect(functions.calculateNetIncome(grossIncome, incomeTax)).toBe(4082);
});
test('Calculates Net Income of 80000 to be 5205', () => {
    const grossIncome = functions.calculateGrossIncome(80000);
    const incomeTax = functions.calculateIncomeTax(80000);
    expect(functions.calculateNetIncome(grossIncome, incomeTax)).toBe(5205);
});
test('Calculates Net Income of 18201 to be 1517', () => {
    const grossIncome = functions.calculateGrossIncome(18201);
    const incomeTax = functions.calculateIncomeTax(18201);
    expect(functions.calculateNetIncome(grossIncome, incomeTax)).toBe(1517);
});
test('Calculates Net Income of 100 to be 8', () => {
    const grossIncome = functions.calculateGrossIncome(100);
    const incomeTax = functions.calculateIncomeTax(100);
    expect(functions.calculateNetIncome(grossIncome, incomeTax)).toBe(8);
});
test('Calculates Net Income of 999999 to be 48037', () => {
    const grossIncome = functions.calculateGrossIncome(999999);
    const incomeTax = functions.calculateIncomeTax(999999);
    expect(functions.calculateNetIncome(grossIncome, incomeTax)).toBe(48037);
});

// Calculate Super
test('Calculates Super of 60050 at a rate of 9% to be 450', () => {
    const grossIncome = functions.calculateGrossIncome(60050);
    const superRate = 0.09;
    expect(functions.calculateSuper(grossIncome, superRate)).toBe(450);
});
test('Calculates Super of 60050 at a rate of 9.5% to be 475', () => {
    const grossIncome = functions.calculateGrossIncome(60050);
    const superRate = 0.095;
    expect(functions.calculateSuper(grossIncome, superRate)).toBe(475);
});
test('Calculates Super of 40000 at a rate of 10% to be 333', () => {
    const grossIncome = functions.calculateGrossIncome(40000);
    const superRate = 0.1;
    expect(functions.calculateSuper(grossIncome, superRate)).toBe(333);
});
test('Calculates Super of 123456 at a rate of 12% to be 1235', () => {
    const grossIncome = functions.calculateGrossIncome(123456);
    const superRate = 0.12;
    expect(functions.calculateSuper(grossIncome, superRate)).toBe(1235);
});
test('Calculates Super of 100 at a rate of 10% to be 1', () => {
    const grossIncome = functions.calculateGrossIncome(100);
    const superRate = 0.1;
    expect(functions.calculateSuper(grossIncome, superRate)).toBe(1);
});

// Calculate Pay
test('Calculates Pay of 0 at a rate of 9% to be 0', () => {
    const annualSalary = 0;
    const superRate = 0.09;
    expect(functions.calculatePay(annualSalary, superRate)).toBe(0);
});
test('Calculates Pay of 999999 at a rate of 9% to be 40537', () => {
    const annualSalary = 999999;
    const superRate = 0.09;
    expect(functions.calculatePay(annualSalary, superRate)).toBe(40537);
});
test('Calculates Pay of 123456 at a rate of 12% to be 6251', () => {
    const annualSalary = 123456;
    const superRate = 0.12;
    expect(functions.calculatePay(annualSalary, superRate)).toBe(6251);
});
test('Calculates Pay of 60050 at a rate of 9% to be 3632', () => {
    const annualSalary = 60050;
    const superRate = 0.09;
    expect(functions.calculatePay(annualSalary, superRate)).toBe(3632);
});
test('Calculates Pay of 60050 at a rate of 9.5% to be 3607', () => {
    const annualSalary = 60050;
    const superRate = 0.095;
    expect(functions.calculatePay(annualSalary, superRate)).toBe(3607);
});
test('Calculates Pay of 100 at a rate of 9% to be 7', () => {
    const annualSalary = 100;
    const superRate = 0.09;
    expect(functions.calculatePay(annualSalary, superRate)).toBe(7);
});
test('Calculates Pay of 18201 at a rate of 9% to be 1380', () => {
    const annualSalary = 18201;
    const superRate = 0.09;
    expect(functions.calculatePay(annualSalary, superRate)).toBe(1380);
});
test('Calculates Pay of 80000 at a rate of 9% to be 4605', () => {
    const annualSalary = 80000;
    const superRate = 0.09;
    expect(functions.calculatePay(annualSalary, superRate)).toBe(4605);
});
