//Разработать е2е теста со следующими шагами:
 //- Открыть Sales Portal локально поднятый в докере
 //- Войти в приложения используя учетные данные указанные в readme к проекту
 //- Создать продукт (модуль Products)
 //- Верифицировать появившуюся нотификацию
 //- Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)

import { test, expect } from "@playwright/test";
import { credentials } from "config/env";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

 test.describe("Task 22, add new product", async () => {
    test ("Create product test", async({page}) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const productsListPage = new ProductsListPage(page);
        const addNewProductPage = new AddNewProductPage(page);

        await loginPage.open();
        await loginPage.fillCredentials(credentials);
        await loginPage.clickOnLoginButton();
        await homePage.waitForOpened();
        await homePage.clickOnViewModule("Products");
        await productsListPage.waitForOpened();
        await productsListPage.clickAddNewProduct();
        await addNewProductPage.waitForOpened();
        const productDataGenerated = generateProductData();
        await addNewProductPage.fillForm(productDataGenerated);
        await addNewProductPage.clickSave();
        await productsListPage.waitForOpened();

        await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
        await expect(productsListPage.tableRowByName(productDataGenerated.name)).toBeVisible();

        await expect(productsListPage.nameCell(productDataGenerated.name)).toHaveText(productDataGenerated.name);
        await expect(productsListPage.priceCell(productDataGenerated.name)).toHaveText(`$${productDataGenerated.price.toString()}`);
        await expect(productsListPage.manufacturerCell(productDataGenerated.name)).toHaveText(productDataGenerated.manufacturer);
    })
 });