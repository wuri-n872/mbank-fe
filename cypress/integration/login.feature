# cypress/integration/login.feature

Feature: Login to Application
As a valid user
I want to log in with valid credentials into Application
    
    Scenario: Email and Password Must Be Filled
        Given I open login page
        When I click the login button
        Then I should see required message

    Scenario: Bad Email Input
        Given I open login page
        When I fill username "wrong-formated email" and password "password"
            And I click the login button
        Then I should see invalid email message

    Scenario: Invalid Login
        Given I open login page
        When I fill username "wuri.nugrahadi@mitrais.com" and password "wrong-password"
            And I click the login button
        Then I should see login error message

    Scenario: Valid Login
        Given I open login page
        When I fill username "wuri.nugrahadi@mitrais.com" and password "password"
            And I click the login button
        Then I should see homepage