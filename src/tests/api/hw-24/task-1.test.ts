//Написать смоук API тест на логин
  //- создать и проверить схему
  //- проверить статус
  //- проверить наличие токена в хедерах

import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { loginSchema } from "data/schemas/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", () => {
    let token = "";

    test("API Login", async ({ request }) => {
        const loginResponse = await request.post(baseURL + endpoints.login, {
            data: credentials,
            headers: {
                "content-type": "application/json",
            },
        });
        const loginBody = await loginResponse.json();
        expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(loginBody.IsSuccess).toBe(true);
        expect.soft(loginBody.ErrorMessage).toBe(null);
        expect.soft(loginBody.User.username).toBe(credentials.username);

        const headers = loginResponse.headers();
        token = headers["authorization"]!;
        expect(token).toBeTruthy();

        await validateResponse(loginResponse, {
            status: STATUS_CODES.OK,
            schema: loginSchema,
            IsSuccess: true,
            ErrorMessage: null,
        });
    });
  });