 Feature: SauceDemo login
  As a SauceDemo user
  I want to log in with my credentials
  So that I can access the products page

  Background:
    Given I am on the SauceDemo login page

  Scenario: Login form is displayed
    Then the page title should be "Swag Labs"
    And I should see the username field
    And I should see the password field
    And I should see the Login button
    And I should see the accepted demo usernames
    And I should see the shared demo password

  Scenario: Login succeeds with valid credentials
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I submit the login form
    Then I should be on the inventory page
    And I should see the "Products" heading

  Scenario: Login is rejected when the username is missing
    When I submit the login form without entering a username or password
    Then I should remain on the login page
    And I should see the login error "Epic sadface: Username is required"

  Scenario: Login is rejected when the password is missing
    When I enter username "standard_user"
    And I leave the password field empty
    And I submit the login form
    Then I should remain on the login page
    And I should see the login error "Epic sadface: Password is required"

  Scenario: Login is rejected when the credentials are invalid
    When I enter username "invalid_user"
    And I enter password "wrong_password"
    And I submit the login form
    Then I should remain on the login page
    And I should see the login error "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login is rejected for a locked-out user
    When I enter username "locked_out_user"
    And I enter password "secret_sauce"
    And I submit the login form
    Then I should remain on the login page
    And I should see the login error "Epic sadface: Sorry, this user has been locked out."

  Scenario: Demo credentials are shown on the login page
    Then I should see the shared demo password "secret_sauce"
    And I should see "standard_user" in the accepted demo usernames
    And I should see "locked_out_user" in the accepted demo usernames
