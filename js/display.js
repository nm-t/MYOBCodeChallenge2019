import {
    calculateGrossIncome,
    calculateIncomeTax,
    calculateNetIncome,
    calculateSuper,
    calculatePay,
    formatDollarValue
} from './main.js';

let firstName,
    familyName,
    annualSalary,
    superRate;

function generatePayslip(firstName, familyName, annualSalary, superRate) {
    const $container = $('main');

    const dateObj = new Date();
    const date = dateObj.getDate(),
          monthIndex = dateObj.getMonth(),
          year = dateObj.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const payDate = `${date} ${months[monthIndex]} ${year}`

    const grossIncome = calculateGrossIncome(annualSalary);
    const incomeTax = calculateIncomeTax(annualSalary);
    const netIncome = calculateNetIncome(grossIncome, incomeTax);
    const superValue = calculateSuper(grossIncome, superRate);
    const pay = calculatePay(annualSalary, superRate);

    $container.html(`` +
        `<h1>Payslip</h1>` +
        `<h2>${firstName} ${familyName}</h2>` +
        `<table>` +
            `<tbody>` +
                `<tr>` +
                    `<th>Pay Date</th>` +
                    `<td>${payDate}</td>` +
                `</tr>` +
                `<tr>` +
                    `<th>Pay Frequency</th>` +
                    `<td>Monthly</td>` +
                `</tr>` +
                `<tr>` +
                    `<th>Annual Income</th>` +
                    `<td>${formatDollarValue(annualSalary)}</td>` +
                `</tr>` +
                `<tr>` +
                    `<th>Gross Income</th>` +
                    `<td>${formatDollarValue(grossIncome)}</td>` +
                `</tr>` +
                `<tr>` +
                    `<th>Income Tax</th>` +
                    `<td>${formatDollarValue(incomeTax)}</td>` +
                `</tr>` +
                `<tr>` +
                    `<th>Net Income</th>` +
                    `<td>${formatDollarValue(netIncome)}</td>` +
                `</tr>` +
                `<tr>` +
                    `<th>Super</th>` +
                    `<td>${formatDollarValue(superValue)}</td>` +
                `</tr>` +
                `<tr>` +
                    `<th>Pay</th>` +
                    `<td>${formatDollarValue(pay)}</td>` +
                `</tr>` +
            `</tbody>` +
        `</table>` +
        `<button class="pay-employee">Pay</button>`
    );
}

$('.generate-payslip').on('click', function(e) {
    e.preventDefault();
    firstName = $('.first-name').val();
    familyName = $('.family-name').val();
    annualSalary = $('.annual-salary').val();
    superRate = Number($('.super-rate').val()) * 1/100;
    generatePayslip(firstName, familyName, annualSalary, superRate);
});
