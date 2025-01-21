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

    navigateToPage(selector, expectedTitle = null, expectedHeader = null) {
        this.clickElement(selector);
    
        // If an expected title is provided, verify it
        if (expectedTitle) {
            this.verifyPageTitle(expectedTitle);
        }
    
        // If an expected header is provided, verify it
        if (expectedHeader) {
            this.verifyHeader(expectedHeader);
        }
    }

    assertText(selector, expectedText) {
        cy.get(selector).should('be.visible').and('contain.text', expectedText);
    }

    clickElement(selector) {
        cy.get(selector).should('exist').and('be.visible').click();
    }

    typeText(selector, text) {
        cy.get(selector).type(text);
    }

    cleanDatabase() {
        this.visit('/admin.htm');
        this.clickElement('button.button[value="CLEAN"]');
        this.assertText('#rightPanel p b', 'Database Cleaned');
    }

}

export default BasePage;