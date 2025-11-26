
import { SalesPortalPage } from "../salesPortal.page";
import { IProductInTable } from "data/types/product.types";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ProductDetailsModal } from "./details.modal";
import { DeleteModal } from "./delete.modal";

export class ProductsListPage extends SalesPortalPage {
    readonly detailsModal = new ProductDetailsModal(this.page);
    readonly deleteModal = new DeleteModal(this.page);
    readonly productsPageTitle = this.page.locator("h2.fw-bold");
    readonly addNewProductButton = this.page.locator('[name="add-button"]');
    readonly tableRow = this.page.locator("tbody tr");
    readonly uniqueElement = this.addNewProductButton;
    readonly nameCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(0);
    readonly priceCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(1);
    readonly manufacturerCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(2);
    readonly editButton = (productName: string) => this.tableRowByName(productName).getByTitle("Edit");
    readonly detailsButton = (productName: string) => this.tableRowByName(productName).getByTitle("Details");
    readonly deleteButton = (productName: string) => this.tableRowByName(productName).getByTitle("Delete");


    readonly tableRowByName = (productName: string) =>
        this.page.locator(`//table/tbody/tr[./td[text()="${productName}"]]`);

    async clickAddNewProduct() {
        await this.addNewProductButton.click();
    }

    async getProductData(productName: string): Promise<IProductInTable> {
        const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName).locator("td").allInnerTexts();
        return {
            name: name!,
            price: +price!.replace("$", ""),
            manufacturer: manufacturer! as MANUFACTURERS,
            createdOn: createdOn!,
        };
    }

    async getTableData(): Promise<IProductInTable[]> {
        const data: IProductInTable[] = [];
        const rows = await this.tableRow.all();
        for (const row of rows) {
            const [name, price, manufacturer, createdOn] = await row.locator("td").allInnerTexts();
            data.push({
                name: name!,
                price: +price!.replace("$", ""),
                manufacturer: manufacturer! as MANUFACTURERS,
                createdOn: createdOn!,
            });
        }
        return data;
    }


}
