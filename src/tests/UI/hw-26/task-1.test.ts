//Создайте 3 интеграционных теста для проверки следующих метрик на странице Home:
//1. Orders This Year
//2. New Customers
////3. Canceled Orders

//Для реализации подмокивайте респонс эндпоинта metrics

 // - Orders This Year: Metrics.orders.totalOrders
  //- New Customers: Metrics.customers.totalNewCustomers
  //- Canceled Orders: Metrics.orders.totalCanceledOrders

//Остальной объект оставьте как есть сейчас в респонсе, замените просто на ваши данные в метриках нужных

import { SALES_PORTAL_URL } from "config/env";
import { generateMetrickData } from "data/salesPortal/generateMetricsData";
import { test, expect } from "fixtures/business.fixture";


test.describe('[Integration] [Sales Portal] [Home]', () => {
    test(" test Orders This Year, New Customers, Canceled Orders ", async ({ loginAsAdmin, homePage, page, mock }) => {
        const expectedMetricData = generateMetrickData();
        await mock.homePageMetrics({
        IsSuccess: true,
        Metrics: expectedMetricData,
        ErrorMessage: null, 
        });
        await loginAsAdmin();
        await page.goto(SALES_PORTAL_URL + "home");
        await homePage.waitForOpened();
        expect(await homePage.totalOrdersThisYear.innerText()).toEqual(expectedMetricData.orders.totalOrders.toString());
        expect(await homePage.totalNewCustomers.innerText()).toEqual(expectedMetricData.customers.totalNewCustomers.toString());
        expect(await homePage.totalcanceledOrders.innerText()).toEqual(expectedMetricData.orders.totalCanceledOrders.toString());
    });
     });