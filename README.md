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

- Front End
    - HTML/CSS/Javascript
    - jQuery
        - Makes for more readable code, and simplified Javascript
- Tooling
    - npm
        - Most familiar with npm (over Grunt/Gulp/Yarn/etc.)
    - Express
        - Easy to set up
        - Prevents CORS issues caused due to `type="module"` attribute on Javascript script tags
    - Jest
        - Simple test framework for Javascript
    - Netlify
        - Free and simple to use
- Back End
    - Amazon Web Services (AWS)
        - Already have AWS account
        - Have used AWS for numerous other projects
    - AWS API Gateway
        - Allows easy configuration to set up an API
        - Works well within AWS ecosystem
    - AWS DynamoDB
        - AWS-based database, easily accessible via AWS' API Gateway

### Running the application
_Provide instructions on how to run the application._

Please note that you must be connected to the internet for the program to run successfully - this is due to the API and database's hosting on AWS.

__Locally:__ From the CLI, run `node server.js`. In the browser, navigate to `localhost:3000`.

__Live:__ https://unruffled-minsky-7bbadc.netlify.com/

### Testing
_Provide a test harness to validate your solution._

From the CLI, run `npm run test`. Only financial functions are tested.
UI is not tested. Tests are written within the [Jest](https://jestjs.io) test framework.

## Future improvements

- Refactor DynamoDB structure to use lastName as primary key (rather than firstName)
- Refactor Javascript to use Payee object
- HAS_ROUNDING flag in CONST to enable/disable rounding of dollar values
- Reset/'Generate another' buttons
- [Use toLocaleString() for date](https://stackoverflow.com/questions/1643320/get-month-name-from-date/18648314#18648314)
- More sophisticated validation on form (super cannot be already in percentage format (e.g.: 0.09 instead of 9), reasonable super rates)

## Resources
- Styles adapted from [Bootstrap](https://getbootstrap.com/docs/3.3/components/)
- [AWS API Gateway and DynamoDB](https://aws.amazon.com/blogs/compute/using-amazon-api-gateway-as-a-proxy-for-dynamodb/)
- [Listing multiple resources in an IAM role](https://forums.aws.amazon.com/thread.jspa?threadID=220021)
- [The API must be deployed/redeployed once the CORS support settings have been updated](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)
- [Favicon Gallery](https://www.favicon-generator.org/search/TURQUIOSE/)
