//Создайте e2e тест со следующими шагами:
//1. Зайти на сайт Sales Portal
//2. Залогиниться с вашими кредами
//3. Перейти на страницу Products List
//4. Перейти на станицу Add New Product
//5. Создать продукта
//6. Проверить наличие продукта в таблице
//7. Кликнуть на кнопку "Delete" в таблице для созданного продукта
//8. В модалке удаления кликнуть кнопку Yes, Delete
//9. Дождаться исчезновения модалки и загрузки страницы
//10. Проверить, что продукт отсутствует в таблице

//Вам понадобится:

//- PageObject модалки удаления продукта
//- Подключить модалку в PageObject страницы Products
//- Использовать фикстуры



import { test, expect } from "fixtures/business.fixture";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

 test.describe("Task 23, add new product and delete", async () => {
    test ("Create product and delete test", async({loginAsAdmin, loginPage, homePage, productsListPage, addNewProductPage }) => {
        
        await loginAsAdmin();
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

        await productsListPage.deleteButton(productDataGenerated.name).click();

        await productsListPage.deleteModal.waitForOpened();
        await productsListPage.deleteModal.confirmDetete();
        await productsListPage.waitForOpened();
        await expect(productsListPage.tableRowByName(productDataGenerated.name)).toHaveCount(0);;

    });
 });