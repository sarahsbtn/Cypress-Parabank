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

    assertText(selector, expectedText) {
        cy.get(selector).should('be.visible').and('contain.text', expectedText);
    }

    clickElement(selector) {
        cy.get(selector).click();
    }

    typeText(selector, text) {
        cy.get(selector).type(text);
    }

    assertText(selector, expectedText) {
        cy.get(selector).should('be.visible').and('contain.text', expectedText);
    }

    selectDropdown(selector, value) {
        cy.get(selector).select(value);
    }

    checkCheckbox(selector) {
        cy.get(selector).check();
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

}

export default BasePage;