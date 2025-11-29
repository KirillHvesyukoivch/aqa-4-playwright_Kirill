import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { IProduct, IProductResponse } from "data/types/product.types";
import _ from "lodash";
import { AddNewProductPage, ProductsListPage } from "ui/pages/products";
import { logStep } from "utils/report/logStep.utils";

export class UpdateProductUIService {
  updateProductPage: AddNewProductPage;
  productsListPage: ProductsListPage;

  constructor(private page: Page) {
    this.updateProductPage = new AddNewProductPage(page);
    this.productsListPage = new ProductsListPage(page);
  }

   @logStep("update product")
  async update(productData?: Partial<IProduct>) {
    const data = generateProductData(productData);
    await this.updateProductPage.fillForm(data);
    const response = await this.updateProductPage.interceptResponse<IProductResponse, any>(
      apiConfig.endpoints.products,
      this.updateProductPage.clickSave.bind(this.updateProductPage),
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual(data);

    await this.productsListPage.waitForOpened();
    return response.body.Product;
  }
}