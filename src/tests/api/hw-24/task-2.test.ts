  //Написать смоук API тест на получение всех продуктов (без фильтрационных параметров)   //со следующими шагами:
    // - Залогиниться
    //- Создать продукт и проверить 201й статус
    //- Получить все продукты
    //- создать и проверить схему
    // - проверить статус
    // - проверить, что в массиве тела респонса есть созданный продукт
    // - Проверить поля IsSuccess и ErrorMessage

import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { getAllProductsResponseSchema } from "data/schemas/products/getAllProducts.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
    let id = "";
    let token = "";

    test.afterEach(async ({ request }) => {
        const response = await request.delete(`${baseURL}${endpoints.products}/${id}`, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status()).toBe(STATUS_CODES.DELETED);
    });

    test("Get All products after creation", async ({ request }) => {
        const loginResponse = await request.post(baseURL + endpoints.login, {
        data: credentials,
        headers: {
            "content-type": "application/json",
        },
        } );
        const loginBody = await loginResponse.json();
        expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(loginBody.IsSuccess).toBe(true);
        expect.soft(loginBody.ErrorMessage).toBe(null);
        expect.soft(loginBody.User.username).toBe(credentials.username);

        const headers = loginResponse.headers();
        token = headers["authorization"]!;
        expect(token).toBeTruthy();

        const productData = generateProductData();
        const createProductResponse = await request.post(baseURL + endpoints.products, {
            data: productData,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
             },
        });

        const createProductBody = await createProductResponse.json();
        await validateResponse(createProductResponse, {
            status: STATUS_CODES.CREATED,
            schema: createProductSchema,
            IsSuccess: true,
            ErrorMessage: null,
        });

        const actualProductData = createProductBody.Product;

        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);

        id = actualProductData._id;

        const getAllProductsResponse = await request.get(baseURL + endpoints.productsAll, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        await validateResponse(getAllProductsResponse, {
            status: STATUS_CODES.OK,
            schema: getAllProductsResponseSchema,
            IsSuccess: true, 
            ErrorMessage: null,
        });

        const getAllProductsResponseBody = await getAllProductsResponse.json();
        expect (getAllProductsResponseBody.Products.find((product: { _id: string; }) => product._id === id)).not.toBeUndefined();
    })
});