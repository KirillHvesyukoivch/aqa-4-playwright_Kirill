import { logStep } from "utils/report/logStep.utils.js";
import { SalesPortalPage } from "./salesPortal.page.js";
import { ICredentials } from "data/types/credentials.types.js";
export class LoginPage extends SalesPortalPage {
    readonly emailInput = this.page.locator("#emailinput")
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.locator('button', {hasText: "Login"});
    readonly uniqueElement = this.loginButton;
    readonly inccorectCredentialMessage = this.page.locator("//div[contains(text(), 'Incorrect credentials')]")

     @logStep("fill Credentials")
    async fillCredentials(credentials: ICredentials){
    await this.emailInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    }

     @logStep("click logign button")
    async clickLogin(){
        this.loginButton.click();
    }
}