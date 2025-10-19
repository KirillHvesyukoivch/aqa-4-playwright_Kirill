import { test, expect } from "@playwright/test";

test.describe('smoke for registration form', () => {

    const locatorRegister = "#registerOnLogin";
    const localorUsername = "#userNameOnRegister";
    const locatorPassword = "#passwordOnRegister";
    const locatorSubmit = "#register";
    const locatorMessage = "#errorMessageOnRegister";
    const textPositive  = "Successfully registered! Please, click Back to return on login page"
    
    test('happyPath task 2', async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-login-form');
        await page.locator(locatorRegister).click();
        await page.locator(localorUsername).fill("Kirill");
        await page.locator(locatorPassword).fill("KirillKirill");
        await page.locator(locatorSubmit).click();
        await expect(page.locator(locatorMessage)).toHaveText(textPositive)
    });

    test('No Password', async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-login-form');
        await page.locator(locatorRegister).click();
        await page.locator(localorUsername).fill("Kirill");
        await page.locator(locatorSubmit).click();
        await expect(page.locator(locatorMessage)).not.toHaveText(textPositive)
    });

    test('No Login', async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-login-form');
        await page.locator(locatorRegister).click();
        await page.locator(locatorPassword).fill("KirillKirill");
        await page.locator(locatorSubmit).click();
        await expect(page.locator(locatorMessage)).not.toHaveText(textPositive)
    });

    test('short Login', async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-login-form');
        await page.locator(locatorRegister).click();
        await page.locator(localorUsername).fill("ff");
        await page.locator(locatorPassword).fill("KirillKirill");
        await page.locator(locatorSubmit).click();
        await expect(page.locator(locatorMessage)).not.toHaveText(textPositive)
    });
    test('short weakPassword', async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-login-form');
        await page.locator(locatorRegister).click();
        await page.locator(localorUsername).fill("Kidasdas");
        await page.locator(locatorPassword).fill("qwer");
        await page.locator(locatorSubmit).click();
        await expect(page.locator(locatorMessage)).not.toHaveText(textPositive)
    });
    
});