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

    $('.pay-employee').on('click', function() {
        checkEmployee();
    });
}

$('.generate-payslip').on('click', function(e) {
    e.preventDefault();
    firstName = $('.first-name').val();
    familyName = $('.family-name').val();
    annualSalary = $('.annual-salary').val();
    superRate = Number($('.super-rate').val()) * 1/100;
    generatePayslip(firstName, familyName, annualSalary, superRate);
});

/**
 * checkEmployee()
 * Makes a GET Ajax call to query database according to firstName,
 * then checks if there's a match on lastName,
 * then checks if the employee has been paid this month.
 */
function checkEmployee() {
    // Query the database for the payee
    var dbResponse;
    $.ajax({
        type: "GET",
        url: `https://nfwrihtz7i.execute-api.ap-southeast-2.amazonaws.com/Prod/employees/firstName?firstName=${firstName}`,
        async: false,
        success: function(data) {
            dbResponse = data;
        }
    });
    dbResponse = dbResponse.employees;

    // Employee doesn't exist in the database, proceed to pay
    if (dbResponse.length == 0) {
        payEmployee();
    }
    // Results were found, determine whether or not the employee should be paid
    else {
        let payee;
        for (let i = 0; i < dbResponse.length; i++) {
            // Proceed as soon as a match is found
            if (dbResponse[i].lastName === familyName) {
                payee = dbResponse[i];
                break;
            }
        }

        // Check to see if the employee has been paid this month
        if (payee !== undefined) {
            const paidThisMonth = hasBeenPaidThisMonth(payee.payDate);
            if (!paidThisMonth) {
                payEmployee();
            }
            else {
                displayOutcome('error', 'User has already been paid this month');
            }
        }
        // Employee doesn't exist in the database, proceed to pay
        else {
            payEmployee();
        }
    }
}

/**
 * hasBeenPaidThisMonth(dateString)
 * @param {string} dateString Date to parse
 * Checks date in payslip against today's date.
 * If the months match, the employee has been paid this month.
 */
function hasBeenPaidThisMonth(dateString) {
    let dateComponents = dateString.split('-');
    let payslipMonth = Number(dateComponents[1]);

    const dateObj = new Date();
    // Add 1 to make month human-readable
    const currentMonth = dateObj.getMonth() + 1;

    return payslipMonth === currentMonth;
}

function payEmployee() {

}

function displayOutcome(status, message) {

}
