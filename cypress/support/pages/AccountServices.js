import BasePage from './BasePage';

class AccountServices extends BasePage {
    constructor() {
        super();
        this.selectors = {
            openAccount: '#leftPanel a[href="openaccount.htm"]',
            accountOverview: '#leftPanel a[href="overview.htm"]',
            transferFunds: '#leftPanel a[href="transfer.htm"]',
            billPay: '#leftPanel a[href="billpay.htm"]',
            findTrans: '#leftPanel a[href="findtrans.htm"]',
            updateContact: '#leftPanel a[href="updateprofile.htm"]',
            requestLoan: '#leftPanel a[href="requestloan.htm"]'
        };
    }

    openNewAccount(accountType, selectionIndex = 0) {
        this.clickElement(this.selectors.openAccount);
        cy.get('#type').select(accountType.toUpperCase());
        cy.get('#fromAccountId').select(selectionIndex);
        this.clickElement('input[value="Open New Account"]');
        cy.contains('Your new account number:').should('be.visible');
    }

    captureAccountNumber(selector) {
        return cy.get(selector)
            .invoke('text')
            .then((accountNumber) => {
                const trimmedAccountNumber = accountNumber.trim();
                cy.log(`Captured Account Number: ${trimmedAccountNumber}`);
                return cy.wrap(trimmedAccountNumber); // Ensure it's wrapped in a Cypress command
            });
    }

    transferFunds(fromIndex, toIndex, amount) {
        this.clickElement(this.selectors.transferFunds);
    
        // Select accounts
        cy.get('#fromAccountId').select(fromIndex);
        cy.get('#toAccountId').select(toIndex);
    
        // Enter amount and submit
        cy.get('#amount').type(amount);
        this.clickElement('input[value="Transfer"]');
    
        // Confirm transfer success
        cy.get("#showResult").should('contain', 'Transfer Complete!');
    }
    


}

export default AccountServices;