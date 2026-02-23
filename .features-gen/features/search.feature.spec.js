// Generated from: features\search.feature
import { test } from "playwright-bdd";

test.describe('Product Search', () => {

  test('Search for a product by name', async ({ Given, When, Then, page }) => { 
    await Given('I am on the home page', null, { page }); 
    await When('I search for "hammer"', null, { page }); 
    await Then('I should see products in the results', null, { page }); 
  });

  test('Search returns multiple products', async ({ Given, When, Then, page }) => { 
    await Given('I am on the home page', null, { page }); 
    await When('I search for "pliers"', null, { page }); 
    await Then('I should see at least 1 product in the results', null, { page }); 
  });

  test('Search with no matching results', async ({ Given, When, Then, page }) => { 
    await Given('I am on the home page', null, { page }); 
    await When('I search for "xyznonexistent"', null, { page }); 
    await Then('I should see 0 products in the results', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\search.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given I am on the home page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I search for \"hammer\"","stepMatchArguments":[{"group":{"start":13,"value":"\"hammer\"","children":[{"start":14,"value":"hammer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then I should see products in the results","stepMatchArguments":[]}]},
  {"pwTestLine":12,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I am on the home page","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I search for \"pliers\"","stepMatchArguments":[{"group":{"start":13,"value":"\"pliers\"","children":[{"start":14,"value":"pliers","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should see at least 1 product in the results","stepMatchArguments":[{"group":{"start":22,"value":"1","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":18,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given I am on the home page","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When I search for \"xyznonexistent\"","stepMatchArguments":[{"group":{"start":13,"value":"\"xyznonexistent\"","children":[{"start":14,"value":"xyznonexistent","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then I should see 0 products in the results","stepMatchArguments":[{"group":{"start":13,"value":"0","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end