//Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
//Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

//Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

//Сайт: https://the-internet.herokuapp.com/tables

import { test, expect, Page } from "@playwright/test";
import {users} from "./TestData/testData_task2";

async function getInfroByEmail(page: Page, email: string):Promise<Record<string, string>> {
    const table = page.locator('//table[@id ="table2"]');
    const headers = await table.locator('.header').allTextContents();
    headers.pop();
    const row = await table.locator('//tr', {hasText :email}).locator("//td").allTextContents();
    console.log(row);
    return headers.reduce<Record<string, string>>((returnElement, el, index ) =>{
        returnElement[el] = row[index] ?? "";
        return returnElement;
    },{});
    }

test.describe("SearchFunction", () => {
  users.forEach((user) => {
    test(`Validation of ${user.Email}`, async ({ page }) => {
      await page.goto("https://the-internet.herokuapp.com/tables");
      const result = await getInfroByEmail(page, user.Email);
      expect(result).toEqual(user);
    });
  });
});