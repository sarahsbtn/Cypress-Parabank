import BasePage from './BasePage';

class LoginForm extends BasePage {
    
    // Login Panel Selectors
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
}

export default LoginForm;