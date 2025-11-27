import { test, expect} from "@playwright/test";

test.describe('hw-20', () => {

    test('task 1', async ({page}) => {
        const dynamicControlLocator = "//a[text() = 'Dynamic Controls']";
        const removeButtonLocator = "//button[text() = 'Remove']";
        const headText1Locator = "//h4[1]";
        const header1ExpectedText = "Dynamic Controls";
        const headText2Locator = "//p[1]";
        const header2ExpectedText =  "This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.";
        const checkboxLocator = "//input[@type = 'checkbox']";
        const addButtonLocator = "//button[text() = 'Add']";
        const mesaggeLocator = "//p[@id = 'message']";
        const goneText = "It's gone!"
        const returnText = "It's back!";

        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator(dynamicControlLocator).click();
        await expect(page.locator(removeButtonLocator)).toBeVisible();
        await expect(page.locator(headText1Locator)).toHaveText(header1ExpectedText);
        await expect(page.locator(headText2Locator)).toHaveText(header2ExpectedText);
        await page.locator(checkboxLocator).check(); 
        await page.locator(removeButtonLocator).click();
        await expect(page.locator(checkboxLocator)).toHaveCount(0);
        await expect(page.locator(addButtonLocator)).toBeVisible();
        await expect(page.locator(mesaggeLocator)).toHaveText(goneText);
        await page.locator(addButtonLocator).click();
        await expect(page.locator(checkboxLocator)).toBeVisible();
        await expect(page.locator(mesaggeLocator)).toHaveText(returnText);

    });
})