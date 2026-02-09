import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import testdata from '../test-data/users.json';

test.describe('Parameterized Login Tests', () => {
    for (const user of testdata.validUsers) {
        test(`Login test for ${user.email}`, async ({page}) => {
            const loginPage = new LoginPage(page);
            await loginPage.navigate();
            console.log(`Testing login for user: ${user.email}`);
            console.log(`Using password: ${user.password}`);
            await loginPage.login(user.email, user.password);
            // STEP 5: Check where we are now
      const currentUrl = page.url();
      console.log(`📍 Current URL: ${currentUrl}`);
      
      // STEP 6: Verify result based on user type
      if (user.name.includes('Valid')) {
        // Valid users: Should be redirected away
        expect(currentUrl).not.toContain('auth/login');
        console.log('✅ PASSED: Successfully logged in');
      } else {
        // Invalid users: Should stay on login page
        expect(currentUrl).toContain('auth/login');
        console.log('✅ PASSED: Login correctly rejected');
      }
        }
        );
    }
});