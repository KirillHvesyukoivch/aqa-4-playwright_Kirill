import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";

type HomeModuleButton = "Products" | "Customers" | "Orders";

export class HomePage extends SalesPortalPage {
  readonly welcomeText = this.page.locator(".welcome-text");
  readonly productsButton = this.page.locator("#products-from-home");
  readonly customersButton = this.page.locator("#customers-from-home");
  readonly ordersButton = this.page.locator("#orders-from-home");
  readonly totalOrdersThisYear = this.page.locator("//div[@id ='total-orders-container']//p");
  readonly totalNewCustomers = this.page.locator("//div[@id ='total-customers-container']//p");
  readonly totalcanceledOrders = this.page.locator("//div[@id ='canceled-orders-container']//p");
  readonly uniqueElement = this.welcomeText;

  async clickOnViewModule(module: HomeModuleButton) {
    const moduleButtons: Record<HomeModuleButton, Locator> = {
      Products: this.productsButton,
      Customers: this.customersButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[module].click();
  }
}