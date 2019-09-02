# MYOB Code Challenge 2019 (Nathalia M. Tan)

## Overview
### THE CHALLENGE: HR PAYROLL SYSTEM
When I input the employee's details: first name, last name, annual salary and super rate, the program should generate a payslip information with name, pay period, gross income, income tax, net income and super. The program should store the payslip information internally for audit purposes. It should also prevent me from paying an employee who already received payment for the month.

The calculation details will be the following:
- pay period = per calendar month
- gross income = annual salary / 12 months
- income tax = based on the tax table provided in the PDF
- net income = gross income - income tax
- super = gross income x super rate
- pay = net income - super

Notes: All calculation results should be rounded to the whole dollar. If >= 50 cents round up to the next dollar increment, otherwise round down.

### TECHNICAL REQUIREMENTS
- The program has two parts:
    - Front end web app can be written using any framework.
    - Back end server can be any chosen language.
- When the 'Generate Payslip' button is clicked the user is shown the generated payslip which is computed on the client side.
- When the 'Pay' button is clicked. The user information is sent to the backend server where the payslip information is stored on the server for audit purposes

## Developer notes
### Assumptions
_List any assumptions that you have made in order to solve this problem._

- Tax rates for 2012 - 2013 apply
- When searching for a payee, the program uses the first entry found in the database matching first and last name

### Technology stack
_List the reasons for your choice in technology stack._

### Running the application
_Provide instructions on how to run the application._

### Testing
_Provide a test harness to validate your solution._

From the CLI, run `npm run test`. Tests are written within the [Jest](https://jestjs.io) test framework.

## Future improvements

- HAS_ROUNDING flag in CONST to enable/disable rounding of dollar values
- More sophisticated validation on form (super cannot be already in percentage format (e.g.: 0.09 instead of 9), reasonable super rates)
- Reset/'Generate another' buttons
- [Use toLocaleString() for date](https://stackoverflow.com/questions/1643320/get-month-name-from-date/18648314#18648314)
- Refactor query to use lastName as primary key (rather than firstName)
- Refactor to use Payee object

## Resources
- [AWS API Gateway and DynamoDB](https://aws.amazon.com/blogs/compute/using-amazon-api-gateway-as-a-proxy-for-dynamodb/)
- [Listing multiple resources in an IAM role](https://forums.aws.amazon.com/thread.jspa?threadID=220021)
- [The API must be deployed/redeployed once the CORS support settings have been updated](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)
- [Favicon Gallery](https://www.favicon-generator.org/search/TURQUIOSE/)
- Styles adapted from [Bootstrap](https://getbootstrap.com/docs/3.3/components/)
