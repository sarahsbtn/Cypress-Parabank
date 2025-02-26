import BasePage from './BasePage';

class LoginForm extends BasePage {
    
    constructor() {
        super();
        this.selectors = {
            usernameInput: 'input[name="username"]',
            passwordInput: 'input[name="password"]',
            loginButton: 'input[type="submit"]',
            forgottenLoginLink: 'a[href="lookup.htm"]',
            regstierLink: 'a[href="register.htm"]',
            logoutButton: 'a[href="logout.htm"]'
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

    login(username, password) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLoginButton();
    }

    assertErrorMessage(expectedText) {
        this.assertText('h1', 'Error!');
        this.assertText('p.error', expectedText);
    }

    forgotLoginInfo(userDetails) {
        cy.get('input[name="firstName"]').type(userDetails.firstName);
        cy.get('input[name="lastName"]').type(userDetails.lastName);
        cy.get('input[name="address.street"]').type(userDetails.address);
        cy.get('input[name="address.city"]').type(userDetails.city);
        cy.get('input[name="address.state"]').type(userDetails.state);
        cy.get('input[name="address.zipCode"]').type(userDetails.zipCode);
        cy.get('input[name="ssn"]').type(userDetails.ssn);
        this.clickElement('input.button[value="Find My Login Info"]');
    }
    
}

export default LoginForm;