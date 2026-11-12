const { test, expect } = require('@playwright/test');
 
test('Scenario 1: diagnose Simple Form Demo result', async ({ page }) => {
  await page.goto('https://www.testmuai.com/selenium-playground/');
  await page.getByRole('link', { name: 'Simple Form Demo' }).click();
  await expect(page).toHaveURL(/simple-form-demo/);
 
  const message = 'Welcome to TestMu AI';
  const input = page.getByPlaceholder('Please enter your Message');
  const button = page.getByRole('button', { name: 'Get Checked Value' });
 
  await input.fill(message);
  console.log('Input HTML:', await input.evaluate(element => element.outerHTML));
  console.log('Button HTML:', await button.evaluate(element => element.outerHTML));
  console.log(
    'Result elements before click:',
    await page.locator('[id="user-message"]').evaluateAll(elements =>
      elements.map(element => element.outerHTML),
    ),
  );
 
  await button.click();
  await page.waitForTimeout(500);
 
  console.log(
    'Result elements after click:',
    await page.locator('[id="user-message"]').evaluateAll(elements =>
      elements.map(element => element.outerHTML),
    ),
  );
  console.log(
    'Elements with id="message":',
    await page.locator('[id="message"]').evaluateAll(elements =>
      elements.map(element => element.outerHTML),
    ),
  );
});

 