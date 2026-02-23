Feature: Product Search

  As a customer of Practice Software Testing
  I want to search for products
  So that I can find items I want to purchase

  Scenario Outline: Search for products by name
    Given I am on the home page
    When I search for "<searchTerm>"
    Then I should see at least <minResults> product in the results

    Examples:
      | searchTerm | minResults |
      | hammer     | 1          |
      | pliers     | 1          |
      | saw        | 1          |

  Scenario: Search with no matching results
    Given I am on the home page
    When I search for "xyznonexistent"
    Then I should see 0 products in the results
