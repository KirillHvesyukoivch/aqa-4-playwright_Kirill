import { test, expect } from "@playwright/test";

test.describe('smoke for registration form', () => {

    const locatorRegister = "#registerOnLogin";
    const localorUsername = "#userNameOnRegister";
    const locatorPassword = "#passwordOnRegister";
    const locatorSubmit = "#register";
    const locatorMessage = "#errorMessageOnRegister";
    const textPositive  = "Successfully registered! Please, click Back to return on login page";
    const locatorBack = "#backOnRegister";
    const localorUsernameLogin = "#userName";
    const locatorPasswordLogin = "#password";
    const locatorSubmitLogin = "#submit";
    const textPositiveLogin = "#successMessage";

    
    test('happyPath', async ({ page }) => {
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

    test('task 2', async ({ page }) => {
        const validLogin = "Vasya";
        const validPassword = "VasyaVasya";
         const loginSucess = `Hello, ${validLogin}!`;
        await page.goto('https://anatoly-karpovich.github.io/demo-login-form');
        await page.locator(locatorRegister).click();
        await page.locator(localorUsername).fill(validLogin);
        await page.locator(locatorPassword).fill(validPassword);
        await page.locator(locatorSubmit).click();
        await expect(page.locator(locatorMessage)).toHaveText(textPositive)
        await page.locator(locatorBack).click();
        await page.locator(localorUsernameLogin).fill(validLogin);
        await page.locator(locatorPasswordLogin).fill(validPassword);
        await page.locator(locatorSubmitLogin).click();
         await expect(page.locator(textPositiveLogin)).toHaveText(loginSucess)

    });
    
});