import BasePage from './BasePage';

class RegisterationPage extends BasePage {
    visitRegisterPage() {
        this.clickElement('a[href="register.htm"]');
        this.verifyPageTitle('Register for Free Online Account Access');
        this.verifyHeader('Signing up is easy!');
    }

    fillRegistrationForm(userDetails) {
        cy.get('input[name="customer.firstName"]').type(userDetails.firstName);
        cy.get('input[name="customer.lastName"]').type(userDetails.lastName);
        cy.get('input[name="customer.address.street"]').type(userDetails.address);
        cy.get('input[name="customer.address.city"]').type(userDetails.city);
        cy.get('input[name="customer.address.state"]').type(userDetails.state);
        cy.get('input[name="customer.address.zipCode"]').type(userDetails.zipCode);
        cy.get('input[name="customer.phoneNumber"]').type(userDetails.phone);
        cy.get('input[name="customer.ssn"]').type(userDetails.ssn);
        cy.get('input[name="customer.username"]').type(userDetails.username);
        cy.get('input[name="customer.password"]').type(userDetails.password);
        cy.get('input[name="repeatedPassword"]').type(userDetails.confirmPassword);
        cy.get('input.button[value="Register"]').click();
    }

    submitRegistration() {
        cy.get('input.button[value="Register"]').click();
    }

    registerUser(shouldLogout = true, fixturePath = 'users') {
        cy.fixture(fixturePath).then((users) => {
            const user = users[0];
            this.visit('/');
            this.clickElement('a[href="register.htm"]'); 
            this.fillRegistrationForm(user);
            cy.contains('Your account was created successfully. You are now logged in.').should('be.visible');
            if (shouldLogout) {
                this.clickElement('a[href="logout.htm"]');
            }
        });
    }

};

export default RegisterationPage;