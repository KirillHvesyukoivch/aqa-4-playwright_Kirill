//Реализовать е2е тест со следующими шагами:
  //- залогиниться
  //- Создать продукт через API
  //- Перейти на страницу Edit Product
  //- Заполнить поля валидными данными
  //- Сохранить продукт
  //- Проверить продукт в таблице
  //- Открыть модалку деталей продукта
  //- Проверить данные в модалке

import { test, expect } from "fixtures/business.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { ProductDetailsModal } from "ui/pages/products/details.modal";


test.describe("[Sales Portal] [Products]", () => {
    let id = "";
    let token = "";

    test("Update product", async ({ loginUIService, productsListPage, productsListUIService, productsApiService, homeUIService, editProductPage }) => {
        const modifiedProductData = generateProductData();
        token = await loginUIService.loginAsAdmin();
        let createdProduct = await productsApiService.create(token);
        id = createdProduct._id;
        await homeUIService.homePage.open("products");
        await productsListUIService.openEditProductPage(createdProduct.name);
        await editProductPage.fillForm(modifiedProductData);
        await editProductPage.clickSaveChanges();
        createdProduct = {...createdProduct,...modifiedProductData }
        await expect(productsListPage.tableRowByName(modifiedProductData.name)).toBeVisible();
        await productsListUIService.openDetailsModal(modifiedProductData.name);
        const actualProductData = await productsListPage.detailsModal.getData();
        await productsListUIService.assertDetailsData(actualProductData, createdProduct);


    });
     test.afterEach(async ({ productsApiService }) => {
        await productsApiService.delete(token, id);
        id = "";
    });
});