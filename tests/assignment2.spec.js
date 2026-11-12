const { test, expect } = require('@playwright/test');
 
test('Scenario 3: validate and submit the Input Form', async ({ page }) => {
  await page.goto('https://www.testmuai.com/selenium-playground/');
  await page.getByRole('link', { name: 'Input Form Submit' }).click();
 
  const form = page.locator('form').filter({ has: page.locator('#inputEmail4') });
  await expect(form).toBeVisible();
 
  const submitButton = form.getByRole('button', { name: 'Submit', exact: true });
 
  // Submit empty form and verify browser validation is triggered.
  await submitButton.click();
  const invalidField = form.locator('input:invalid, select:invalid').first();
  await expect(invalidField).toBeVisible();
  expect(await invalidField.evaluate(element => element.validationMessage)).not.toBe('');
 
  // Fill the form.
  await form.locator('input[placeholder="Name"]').fill('Taylor Morgan');
  await form.locator('#inputEmail4').fill('taylor.morgan@example.com');
  await form.locator('input[placeholder="Password"]').fill('PlaywrightTest123!');
  await form.locator('input[placeholder="Company"]').fill('Example Company');
  await form.locator('input[placeholder="Website"]').fill('https://example.com');
  await form.locator('select').selectOption({ label: 'United States' });
  await form.locator('input[placeholder="City"]').fill('Austin');
  await form.locator('input[placeholder="Address 1"]').fill('100 Main Street');
  await form.locator('input[placeholder="Address 2"]').fill('Suite 200');
  await form.locator('input[placeholder="State"]').fill('Texas');
  await form.locator('#inputZip').fill('78701');
 
  await submitButton.click();
 
  // Verify submitted form values in the resulting URL.
  await page.waitForURL(url =>
    url.pathname.endsWith('/input-form-demo/') &&
    url.searchParams.get('name') === 'Taylor Morgan' &&
    url.searchParams.get('email') === 'taylor.morgan@example.com'
  );
 
  // The current page includes this success text in the DOM, but your run showed it hidden.
  const successMessage = page.locator('.success-msg');
  await expect(successMessage).toHaveText(
    'Thanks for contacting us, we will get back to you shortly.'
  );
});

 