import {
    CONST,
    calculateGrossIncome,
    calculateIncomeTax,
    calculateNetIncome,
    calculateSuper,
    calculatePay,
    formatDollarValue
} from './main.js';

const $container = $('main');

let firstName,
    familyName,
    annualSalary,
    superRate,
    payDate,
    grossIncome,
    incomeTax,
    netIncome,
    superValue,
    pay;

function generatePayslip(firstName, familyName, annualSalary, superRate) {
    const dateObj = new Date();
    let date = dateObj.getDate();
    let monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const payDatePrint = `${date} ${months[monthIndex]} ${year}`;

    if (date.toString().length === 1) {
        date = '0' + date;
    };
    // Add 1 to make month human-readable
    monthIndex++;
    if (monthIndex.toString().length === 1) {
        monthIndex = ('0' + monthIndex);
    };

    payDate = `${year}-${monthIndex}-${date}`;
    grossIncome = calculateGrossIncome(annualSalary);
    incomeTax = calculateIncomeTax(annualSalary);
    netIncome = calculateNetIncome(grossIncome, incomeTax);
    superValue = calculateSuper(grossIncome, superRate);
    pay = calculatePay(annualSalary, superRate);

    $container.html(`` +
        `<h1>Payslip</h1>` +
        `<h2>${firstName} ${familyName}</h2>` +
        `<table>` +
            `<tbody>` +
                `<tr>` +
                    `<th>Pay Date</th>` +
                    `<td>${payDatePrint}</td>` +
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

$('input').on('keydown', function() {
    $('.validation-error').hide();
});

$('.generate-payslip').on('click', function(e) {
    e.preventDefault();
    firstName = $('.first-name').val();
    familyName = $('.family-name').val();
    annualSalary = $('.annual-salary').val();
    superRate = Number($('.super-rate').val()) * 1/100;

    if (firstName && familyName && annualSalary && superRate) {
        generatePayslip(firstName, familyName, annualSalary, superRate);
    }
    else {
        $('.validation-error').show();
    }
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
                displayOutcome('error', 'User has already been paid this month. Payslip not stored in database.');
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

/**
 * payEmployee(dateString)
 * @param {string} dateString Date to parse
 * Checks date in payslip against today's date.
 * If the months match, the employee has been paid this month.
 */
function payEmployee() {
    $.ajax({
        type: "POST",
        url: "https://nfwrihtz7i.execute-api.ap-southeast-2.amazonaws.com/Prod/employees",
        data: JSON.stringify({
            "firstName": firstName,
            "lastName": familyName,
            "grossIncome": grossIncome,
            "incomeTax": incomeTax,
            "netIncome": netIncome,
            "superValue": superValue,
            "payValue": pay,
            "payDate": payDate,
            "annualIncome": annualSalary,
            "frequency": CONST.FREQUENCY
        }),
        contentType: "application/json",
        success: function() {
            displayOutcome('success', 'Payslip information has been stored.');
        },
        error: function() {
            displayOutcome('error', 'AJAX call failed. Please try again!');
        }
    });
}

/**
 * displayOutcome(dateString)
 * @param {string} status Status of outcome (error/success)
 * @param {string} message Message to display to user
 * Displays a message to the user and applies a class,
 * depending on the status.
 */
function displayOutcome(status, message) {
    $container.html(`` +
        `<h1 class="is-${status}">${message}</h1>` +
    ``);
}
