import { Page } from "@playwright/test";
import { SalesPortalPage } from "ui/pages/salesPortal.page.js"; 


export class DeleteModal extends SalesPortalPage {
    readonly uniqueElement = this.page.locator("//div[@name ='confirmation-modal']");
    readonly title = this.uniqueElement.locator('h5');
    readonly confirmDeteteButton = this.uniqueElement.locator("//button[@type = 'submit']");
    async confirmDetete(){
        this.confirmDeteteButton.click();
    }




}