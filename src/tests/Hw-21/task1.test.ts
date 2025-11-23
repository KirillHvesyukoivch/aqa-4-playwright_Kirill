//Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
//https://anatoly-karpovich.github.io/demo-login-form/

//Требования:
//Страница регистрации:
  //Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
  //Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

//Страница логина:
  //Username: обязательное
  //Password: обязательное

import { test, expect } from "@playwright/test";
import { dataSetForTest} from "./TestData/testData_task1";

test.describe('DDT negative registartion form ', () => {
  const host = "https://anatoly-karpovich.github.io/demo-login-form/";
  const openRegistartionButtonLocator = '#registerOnLogin';
  const loginFieldLocator = '#userNameOnRegister';
  const passwordFieldLocator = '#passwordOnRegister';
  const submitRegistrationButtonLocator = '#register';
  const errorMessageLocator = '#errorMessageOnRegister';

  for (const data of dataSetForTest){
    test(data.caseName, async ({ page }) => {
      await page.goto(host);
      await page.locator(openRegistartionButtonLocator).click();
      await page.locator(loginFieldLocator).fill(data.username);
      await page.locator(passwordFieldLocator).fill(data.password);
      await page.locator(submitRegistrationButtonLocator).click();
      await expect(page.locator(errorMessageLocator)).toHaveText(data.expectedmessage)
    });
  }
});