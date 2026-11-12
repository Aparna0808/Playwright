const { test, expect } = require('@playwright/test');
 
test('Scenario 2: set the Default value 15 slider to 95', async ({ page }) => {
  await page.goto('https://www.testmuai.com/selenium-playground/');
  await page.getByRole('link', { name: 'Drag & Drop Sliders' }).click();
 
  const slider = page.locator('input[type="range"]').first();
  await expect(slider).toBeVisible();
 
  const { min, max, step } = await slider.evaluate(element => {
    const input = element;
    return {
      min: Number(input.min || 0),
      max: Number(input.max || 100),
      step: Number(input.step || 1),
    };
  });
 
  const target = 95;
  expect(target).toBeGreaterThanOrEqual(min);
  expect(target).toBeLessThanOrEqual(max);
  expect((target - min) % step).toBe(0);
 
  await slider.focus();
  await slider.press('Home');
 
  for (let value = min; value < target; value += step) {
    await slider.press('ArrowRight');
  }
 
  await expect(slider).toHaveValue(String(target));
});
