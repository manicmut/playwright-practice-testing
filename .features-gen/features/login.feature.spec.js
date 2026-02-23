// Generated from: features\login.feature
import { test } from "playwright-bdd";

test.describe('Login', () => {

  test('Successful login as admin user', async ({ Given, When, Then, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I login with email "admin@practicesoftwaretesting.com" and password "welcome01"', null, { page }); 
    await Then('I should be redirected to the "admin" page', null, { page }); 
  });

  test('Successful login as customer user', async ({ Given, When, Then, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I login with email "customer@practicesoftwaretesting.com" and password "welcome01"', null, { page }); 
    await Then('I should be redirected to the "account" page', null, { page }); 
  });

  test('Failed login with wrong email', async ({ Given, When, Then, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I login with email "wrongemail@test.com" and password "welcome01"', null, { page }); 
    await Then('I should see the error message "Invalid email or password"', null, { page }); 
  });

  test('Failed login with wrong password', async ({ Given, When, Then, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I login with email "customer@practicesoftwaretesting.com" and password "wrongpassword123"', null, { page }); 
    await Then('I should see the error message "Invalid email or password"', null, { page }); 
  });

  test('Failed login with empty email', async ({ Given, When, Then, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I login with email "" and password "welcome01"', null, { page }); 
    await Then('I should see the error message "Email is required"', null, { page }); 
  });

  test('Failed login with empty password', async ({ Given, When, Then, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I login with email "customer@practicesoftwaretesting.com" and password ""', null, { page }); 
    await Then('I should see the error message "Password is required"', null, { page }); 
  });

  test('Failed login with SQL injection attempt', async ({ Given, When, Then, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I login with email "admin\' OR \'1\'=\'1" and password "anything"', null, { page }); 
    await Then('I should see the error message "Invalid email or password"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I login with email \"admin@practicesoftwaretesting.com\" and password \"welcome01\"","stepMatchArguments":[{"group":{"start":19,"value":"\"admin@practicesoftwaretesting.com\"","children":[{"start":20,"value":"admin@practicesoftwaretesting.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":68,"value":"\"welcome01\"","children":[{"start":69,"value":"welcome01","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the \"admin\" page","stepMatchArguments":[{"group":{"start":30,"value":"\"admin\"","children":[{"start":31,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":12,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I login with email \"customer@practicesoftwaretesting.com\" and password \"welcome01\"","stepMatchArguments":[{"group":{"start":19,"value":"\"customer@practicesoftwaretesting.com\"","children":[{"start":20,"value":"customer@practicesoftwaretesting.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":71,"value":"\"welcome01\"","children":[{"start":72,"value":"welcome01","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the \"account\" page","stepMatchArguments":[{"group":{"start":30,"value":"\"account\"","children":[{"start":31,"value":"account","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":18,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When I login with email \"wrongemail@test.com\" and password \"welcome01\"","stepMatchArguments":[{"group":{"start":19,"value":"\"wrongemail@test.com\"","children":[{"start":20,"value":"wrongemail@test.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":54,"value":"\"welcome01\"","children":[{"start":55,"value":"welcome01","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Invalid email or password\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Invalid email or password\"","children":[{"start":32,"value":"Invalid email or password","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":24,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":25,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When I login with email \"customer@practicesoftwaretesting.com\" and password \"wrongpassword123\"","stepMatchArguments":[{"group":{"start":19,"value":"\"customer@practicesoftwaretesting.com\"","children":[{"start":20,"value":"customer@practicesoftwaretesting.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":71,"value":"\"wrongpassword123\"","children":[{"start":72,"value":"wrongpassword123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Invalid email or password\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Invalid email or password\"","children":[{"start":32,"value":"Invalid email or password","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":30,"pickleLine":27,"tags":[],"steps":[{"pwStepLine":31,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When I login with email \"\" and password \"welcome01\"","stepMatchArguments":[{"group":{"start":19,"value":"\"\"","children":[{"start":20,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":35,"value":"\"welcome01\"","children":[{"start":36,"value":"welcome01","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Email is required\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Email is required\"","children":[{"start":32,"value":"Email is required","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":36,"pickleLine":32,"tags":[],"steps":[{"pwStepLine":37,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When I login with email \"customer@practicesoftwaretesting.com\" and password \"\"","stepMatchArguments":[{"group":{"start":19,"value":"\"customer@practicesoftwaretesting.com\"","children":[{"start":20,"value":"customer@practicesoftwaretesting.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":71,"value":"\"\"","children":[{"start":72,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Password is required\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Password is required\"","children":[{"start":32,"value":"Password is required","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":42,"pickleLine":37,"tags":[],"steps":[{"pwStepLine":43,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When I login with email \"admin' OR '1'='1\" and password \"anything\"","stepMatchArguments":[{"group":{"start":19,"value":"\"admin' OR '1'='1\"","children":[{"start":20,"value":"admin' OR '1'='1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":51,"value":"\"anything\"","children":[{"start":52,"value":"anything","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Invalid email or password\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Invalid email or password\"","children":[{"start":32,"value":"Invalid email or password","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end