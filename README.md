# Overview

This API is used to keep record of expenses. Every entry can register a title, a description, the amount spent, the date, a category of expense and the payment method.

# Installation

1. Clone the repository:
    
    ```bash
    git clone https://github.com/sandrorzimmer/expenses.git
    ```
    
2. Navigate to the project directory:
    
    ```bash
    cd expenses
    ```
    
3. Instal the dependencies:
    
    ```bash
    npm install
    ```
    
4. Set up the environment variables creating a **“.env”** file and providing the necessary configuration. You can use the **“.env.example”** file as a reference.

# Usage

To start the API server, run the following command:

```bash
npm start
```

The server will start running at [http://localhost:3000](http://localhost:3000/).

## Endpoints

### Expenses

- **GET - /expenses**
    
    Retrieves the list of expenses from the database.
    
    All requests return a JSON response containing information.
    
    Example:
    
    ```json
    {
    	"_id": "647a3dd1395cb7629cfca584",
    	"title": "Butcher",
    	"description": "Meat",
    	"amount": "5.10",
    	"date": "2023-05-20T00:00:00.000Z",
    	"category": {
    		"_id": "6477e6052172e4a7134f17aa",
    		"name": "Food"
    	},
    	"paymentMethod": {
    		"_id": "6479f52ef6c5228f784e9bd1",
    		"name": "Bank of Ireland account"
    	},
    	"__v": 0
    }
    ```
    
- **GET - /expenses/:id**
    
    Retrieves the expense of the specified ID.
    
- **GET - /expenses/search/:year**
    
    Retrieves a list of expenses from the specified year in parameters.
    
- **GET - /expenses/search/:year/:month**
    
    Retrieves a list of expenses from the specified year and month in parameters.
    
- **GET - /expenses/search/:year/:month/:day**
    
    Retrieves a list of expenses from the specified year, month and day in parameters.
    
- **GET - /expenses/search?title=butcher**
    
    Retrieves a list of expenses containing the word “butcher” in the title.
    
    The search by keyword is also possible for the fields description, category and payment method.
    
- **GET - /expenses/search?minDate=2023-05-20**
    
    Retrieves a list of expenses whose date is greater than or equal to “2023-05-20”.
    
- **GET - /expenses/search?maxDate=2023-05-31**
    
    Retrieves a list of expenses whose date is lower than or equal to “2023-05-31”.
    
- **GET - /expenses/search?minDate=2023-05-20&maxDate=2023-05-31**
    
    Retrieves a list of expenses whose date is between “2023-05-20” and “2023-05-31”, including these dates.
    
- **GET - /expenses/currentMonth**
    
    Retrieves a list of expenses of the current month.
    
- **GET - /expenses/lastMonth**
    
    Retrieves a list of expenses of the last month.
    
- **POST - /expenses**
    
    Creates a new expense item. Expects the expense data to be included in the request body.
    
    If the operation is successful, returns a JSON response with the newly created item.
    
    An expense can have the following fields:
    
    ```json
    {
        "title": "Cable TV",
        "description": "Monthly paid cable TV",
        "amount": 50,
        "date": "2023-06-01",
        "category": "6479384436b197545aaf1091",
        "paymentMethod": "6479f8a3bd3ca9a7f113f97a"
    }
    ```
    
    *Category* and *payment method* must use a valid ID of these items. They refer to a previously registered category and payment method. Both fields are required.
    
    *Title* and *amount* are also required fields.
    
    *Description* is optional.
    
    If *date* is not provided, it will be set as the current date by default.
    
- **PUT- /expenses/:id**
    
    Updates an expense item. Expects the expense data to be included in the request body.
    
    If the operation is successful, returns a JSON response with the updated item.
    
- **DELETE- /expenses/:id**
    
    Deletes an expense item.
    
    If the operation is successful, returns a JSON response with a message informing that the specified ID was deleted.
    

### Categories

- **GET - /categories**
    
    Retrieves the list of categories from the database.
    
    Example:
    
    ```json
    {
    	"_id": "6477e6572172e4a7134f17b5",
    	"name": "Supermarket",
    	"createdAt": "2023-06-01T00:27:16.251Z",
    	"__v": 0
    }
    ```
    
- **GET - /categories/:id**
    
    Retrieves the category of the specified ID.
    
- **POST- /categories**
    
    Creates a new category item. Expects the category data to be included in the request body.
    
    If the operation is successful, returns a JSON response with the newly created item.
    
    An category can have the following fields:
    
    ```json
    {
        "name": "Education"
    }
    ```
    
    *Name* is required.
    
    There is also a field ********createdAt******** which is set to the current date by default.
    
- **PUT - /categories/:id**
    
    Updates a category. Expects the category data to be included in the request body.
    
    If the operation is successful, returns a JSON response with the updated item.
    
- **DELETE- /categories/:id**
    
    Deletes a category.
    
    If the operation is successful, returns a JSON response with a message informing that the specified ID was deleted.
    

### Payment methods

- **GET - /paymentMethods**
    
    Retrieves the list of payment methods from the database.
    
    Example:
    
    ```json
    {
    	"_id": "6479f52ef6c5228f784e9bd1",
    	"name": "Bank of Ireland account",
    	"createdAt": "2023-06-02T13:53:30.274Z",
    	"__v": 0
    }
    ```
    
- **GET - /paymentMethods/:id**
    
    Retrieves the payment method of the specified ID.
    
- **POST- /paymentMethods**
    
    Creates a new payment method item. Expects the payment method data to be included in the request body.
    
    If the operation is successful, returns a JSON response with the newly created item.
    
    A payment method can have the following fields:
    
    ```json
    {
        "name": "Credit card"
    }
    ```
    
    *Name* is required.
    
    There is also a field *createdAt* which is set to the current date by default.
    
- **PUT - /paymentMethods/:id**
    
    Updates a payment method. Expects the payment method data to be included in the request body.
    
    If the operation is successful, returns a JSON response with the updated item.
    
- **DELETE- /paymentMethods/:id**
    
    Deletes a payment method.
    
    If the operation is successful, returns a JSON response with a message informing that the specified ID was deleted.

## Pagination

By default, the API uses a limit of 10 items per page.

Using the keywords ***limit*** and ***page*** will change these parameters.

These are some examples:

- **GET - /expenses**
    
    Retrieves the first ten expenses, sorted by ID in ascending order. This is the default way.
    
- **GET - /expenses?limit=20**
    
    Retrieves the first 20 expenses, sorted by ID in ascending order.
    
- **GET - /expenses?limit=20&page=2**
    
    Retrieves 20 expenses, sorted by ID in ascending order.
    
    The parameter *page=2* indicates that this is the second page, meaning the first 20 expenses are skipped, and the result includes the 21st to 40th expense.
    

## Sorting

By default, the results are sorted by ID in ascending order.

Using the keyword ***sortBy*** and a positive or negative number ***1*** will change these parameters.

- ***field:1*** = specified field in ascending order
- ***field:-1*** = specified field in descending order

For example:

- **GET - /expenses?sortBy=title:-1**
    
    Retrieves the first ten expenses sorted by title in descending order.
    
- **GET - /expenses?limit=20&page=2&sortBy=title:1**
    
    This is a combined form, using pagination and sorting.
    
    Retrieves 20 expenses, sorted by title in ascending order, skipping the first 20 items.

# Error handling

The API uses the following set of status responses and error messages according to the situation.

- **status: 400 - message: One or more provided data are incorrect**
    - An invalid date was provided in search.
    - An invalid ID value was provided.
- **status: 400 - message: The following errors were found: <field> is required**
    - A required field is missing.
- **status: 404 - message: Page not found**
    - The page does not exist. There might be a typo in the URL.
- **status: 500 - message: Internal server error**
    - An unexpected error has occurred on the server while processing the request.

# Security

This API is not currently implementing security measures, like encryption, authentication or authorization mechanisms.

# Testing

This API does not currently provide automated tests. All performed tests were realized manually during development.

# Contribution

Contributions are highly appreciated and help improve the project. To contribute, please follow these guidelines:

## Bug reports

If you encounter a bug or issue with the API, please help us by submitting a detailed bug report. Follow these steps to report a bug:

1. Check the existing **[GitHub Issues](https://github.com/sandrorzimmer/expenses/issues)** to see if the bug has already been reported.
2. If the bug hasn't been reported, **[create a new issue](https://github.com/sandrorzimmer/expenses/issues/new)**.
3. Provide a clear and descriptive title for the issue.
4. Include steps to reproduce the bug, along with any relevant code snippets or error messages.
5. Add any additional context or information that might be helpful for understanding and resolving the issue.

## Feature requests

If you have a suggestion or would like to request a new feature for the Expenses API, please follow these steps:

1. Check the existing **[GitHub Issues](https://github.com/sandrorzimmer/expenses/issues)** to see if the feature has already been requested.
2. If the feature hasn't been requested, **[create a new issue](https://github.com/sandrorzimmer/expenses/issues/new)**.
3. Clearly describe the feature you would like to see added and explain its purpose and potential benefits.
4. Provide any relevant examples, use cases, or implementation details that can help in understanding the feature request.

## Pull requests

We welcome pull requests that address bug fixes, feature enhancements, or code improvements. To submit a pull request:

1. Fork the repository and create a new branch for your changes.
2. Make your changes and ensure the code follows the existing coding style and conventions.
3. Write tests to cover the changes if applicable.
4. Commit your changes with a clear and descriptive commit message.
5. Open a pull request against the ***main*** branch of the original repository.
6. Provide a detailed description of the changes and their purpose.

Please note that all contributions are subject to review and may require some iteration before they are merged into the main codebase.

Thank you for considering contributing to the Expenses API! Your contributions play a valuable role in enhancing the API and making it more robust and feature-rich.

# License

This project is licensed under the **[MIT License](https://chat.openai.com/c/LICENSE)**.