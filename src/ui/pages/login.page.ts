//Написать Page Object класс для страницы Sign In:
 // - email input
  //- password input
  //- login button
  //- fillCredentials method
  //- click on login button method

import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page.js";
import { ICredentials } from "data/types/credentials.types.js";

export class LoginPage extends SalesPortalPage {
    readonly emailInput = this.page.locator("#emailinput")
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.locator('button', {hasText: "Login"});
    readonly uniqueElement = this.loginButton;
    readonly inccorectCredentialMessage = this.page.locator("//div[contains(text(), 'Incorrect credentials')]")
    async fillCredentials(credentials: ICredentials){
       await this.emailInput.fill(credentials.username);
       await this.passwordInput.fill(credentials.password);
    }
    async clickOnLoginButton(){
        this.loginButton.click();
    }

}
