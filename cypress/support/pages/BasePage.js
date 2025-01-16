class BasePage {

    visit(path = '/') {
        cy.visit(path);
    }

    reload() {
        cy.reload();
    }

    verifyPageTitle(expectedTitle) {
        const titlePrefix = 'ParaBank | ';
        cy.title().should('eq', `${titlePrefix}${expectedTitle}`);
    }

    verifyHeader(expectedText) {
        cy.get('h1, .heading').should('be.visible').and('contain.text', expectedText);
    }

    navigateToPage(element, title, header = null) {
        this.clickElement(element);
        this.verifyPageTitle(title);

        if (header) {
            this.verifyHeader(header); // Verify the header if provided
        } else {
            cy.get('header').should('not.exist'); // Assert no header exists
        }
    }
    assertText(selector, expectedText) {
        cy.get(selector).should('be.visible').and('contain.text', expectedText);
    }

    clickElement(selector) {
        cy.get(selector).click();
    }

    typeText(selector, text) {
        cy.get(selector).type(text);
    }

    constructor() {
        this.selectors = {
            usernameInput: 'input[name="username"]',
            passwordInput: 'input[name="password"]',
            loginButton: 'input[type="submit"]',
        };
    }

    fillUsername(username) {
        this.typeText(this.selectors.usernameInput, username);
    }

    fillPassword(password) {
        this.typeText(this.selectors.passwordInput, password);
    }

    clickLoginButton() {
        this.clickElement(this.selectors.loginButton);
    }

    
}

export default BasePage;