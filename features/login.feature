Feature: Login

  As a user of Practice Software Testing
  I want to login with my credentials
  So that I can access my account

  Scenario Outline: Successful login with valid credentials
    Given I am on the login page
    When I login with email "<email>" and password "<password>"
    Then I should be redirected to the "<expectedPage>" page

    Examples:
      | email                                | password  | expectedPage |
      | admin@practicesoftwaretesting.com    | welcome01 | admin        |
      | customer@practicesoftwaretesting.com | welcome01 | account      |
      | customer2@practicesoftwaretesting.com | welcome01 | account     |

  Scenario Outline: Failed login with invalid credentials
    Given I am on the login page
    When I login with email "<email>" and password "<password>"
    Then I should see the error message "<expectedError>"

    Examples:
      | email                                | password         | expectedError              |
      | wrongemail@test.com                  | welcome01        | Invalid email or password  |
      | customer@practicesoftwaretesting.com | wrongpassword123 | Invalid email or password  |
      | admin' OR '1'='1                     | anything         | Invalid email or password  |

  Scenario Outline: Failed login with empty fields
    Given I am on the login page
    When I login with email "<email>" and password "<password>"
    Then I should see the error message "<expectedError>"

    Examples:
      | email                                | password  | expectedError       |
      |                                      | welcome01 | Email is required   |
      | customer@practicesoftwaretesting.com |           | Password is required |
      |                                      |           | Email is required   |
