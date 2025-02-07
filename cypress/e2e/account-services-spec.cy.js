import AccountServices from '../support/pages/AccountServices';
import LoginForm from '../support/pages/LoginForm';
import RegistrationPage from '../support/pages/RegistrationPage';

describe('Account Services Tests', () => {
    const accountServices = new AccountServices();
    const registrationPage = new RegistrationPage();
    const loginForm = new LoginForm();

    let user;
    let initialAccountNumber;
    let checkingAccountNumber;
    let savingsAccountNumber;

    before(() => {
        accountServices.cleanDatabase();
        cy.fixture('users').then((users) => {
            user = users[0];
            registrationPage.registerUser(false); // Register user without logging out

            // Capture the initial account number from the table
            accountServices.visit('/overview.htm');
            accountServices.captureAccountNumber('#accountTable tbody tr:first-child td:first-child')
                .then((accountNumber) => {
                    initialAccountNumber = accountNumber;
                    expect(initialAccountNumber).to.not.be.empty; // Assert it's not empty
                });
        });

        accountServices.clickElement('a[href="logout.htm"]'); // Log out after registration
    });

    describe('Open New Account Tests', () => {

        beforeEach(() => {
            accountServices.visit('/');
            loginForm.login(user.username, user.password);
            cy.contains('Accounts Overview').should('be.visible');
        });

        it('should allow the user to open a new checking account', () => {
            accountServices.openNewAccount('CHECKING');
            accountServices.verifyHeader('Account Opened!');

            // Capture the new checking account number
            accountServices.captureAccountNumber('b:contains("Your new account number:") + *')
                .then((accountNumber) => {
                    checkingAccountNumber = accountNumber;
                    cy.log(`Checking Account Number: ${checkingAccountNumber}`);
                });
        });

        it('should allow the user to open a new savings account', () => {
            accountServices.openNewAccount('SAVINGS');
            accountServices.verifyHeader('Account Opened!');

            // Capture the new savings account number
            accountServices.captureAccountNumber('b:contains("Your new account number:") + *')
                .then((accountNumber) => {
                    savingsAccountNumber = accountNumber;
                    cy.log(`Savings Account Number: ${savingsAccountNumber}`);
                });
        });
    });

    describe('Accounts Overview Tests', () => {

        beforeEach(() => {
            accountServices.visit('/');
            loginForm.login(user.username, user.password);
            cy.contains('Accounts Overview').should('be.visible');
        });
        
        it('should show the initial account and the two accounts the user created', () => {
            // Navigate to the Accounts Overview page
            accountServices.navigateToPage(accountServices.selectors.accountOverview, 'Accounts Overview');
        
            // Store the expected account numbers in an array
            const expectedAccountNumbers = [initialAccountNumber, checkingAccountNumber, savingsAccountNumber];
        
            // Select only the first 3 rows to exclude the total row
            cy.get('#accountTable tbody tr').then(($rows) => {
                cy.wrap($rows.slice(0, 3)).each(($row, index) => {
                    const accountNumber = expectedAccountNumbers[index];
                    cy.wrap($row).find('td').first().invoke('text').then((displayedAccountNumber) => {
                        expect(displayedAccountNumber.trim()).to.equal(accountNumber); // Verify account number matches
                        cy.log(`Account verified: ${displayedAccountNumber.trim()}`);
                    });
                });
            });
        
            // Ensure only the first 3 rows are checked (excluding the total row)
            cy.get('#accountTable tbody tr').should('have.length.greaterThan', 3);
        });


        it('should show the balance and available amount for each account', () => {
            accountServices.navigateToPage(accountServices.selectors.accountOverview, 'Accounts Overview');
            cy.get('#accountTable tbody tr').should('have.length.greaterThan', 0);
            cy.get('#accountTable tbody tr').each(($row) => {
                cy.wrap($row).find('td').eq(1).should('not.be.empty'); // Check Balance column
                cy.wrap($row).find('td').eq(2).should('not.be.empty'); // Check Available Amount column
            });
        });
    });

    describe('Transfer Funds Tests', () => {

        beforeEach(() => {
            accountServices.visit('/');
            loginForm.login(user.username, user.password);
            cy.contains('Accounts Overview').should('be.visible');
        });

        it('should transfer funds from accounts', () => {
            accountServices.navigateToPage(accountServices.selectors.transferFunds, 'Transfer Funds');
            cy
        });
    });





});

