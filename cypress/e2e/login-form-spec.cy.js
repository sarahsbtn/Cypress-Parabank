import LoginForm from '../support/pages/LoginForm';
import RegistrationPage from '../support/pages/RegistrationPage';

describe('Login Form Tests', () => {
    const loginForm = new LoginForm();
    const registrationPage = new RegistrationPage();

    // Register a user prior to tests 
    let user;

    before(() => {
        loginForm.cleanDatabase();
        cy.fixture('users').then((users) => {
            user = users[0];
            registrationPage.registerUser(); // Registers the first user from the fixture
        });
    });

    beforeEach('load the homepage', () => {
        loginForm.visit('/');
        loginForm.verifyPageTitle('Welcome | Online Banking');
    });

    after(() => {
        loginForm.cleanDatabase();
    });

    const scenarios = [
        {
            description: 'both input fields are empty',
            username: '',
            password: '',
            expectedError: 'Please enter a username and password.',
        },
        {
            description: 'the username field is empty',
            username: '',
            password: 'password',
            expectedError: 'Please enter a username and password.',
        },
        {
            description: 'the password field is empty',
            username: 'username',
            password: '',
            expectedError: 'Please enter a username and password.',
        },
        {
            description: 'the username is incorrect',
            username: 'invalid_username',
            password: 'valid_password',
            expectedError: 'The username and password could not be verified.',
        },
        {
            description: 'the password is incorrect',
            username: 'valid_username',
            password: 'invalid_password',
            expectedError: 'The username and password could not be verified.',
        }
    ];

    describe('Login Errors Tests', () => {

        scenarios.forEach(({ description, username, password, expectedError }) => {
            it(`should display an error message when ${description}`, () => {
                if (username) loginForm.fillUsername(username);
                if (password) loginForm.fillPassword(password);
                loginForm.clickLoginButton();
                loginForm.assertErrorMessage(expectedError);
            });
        });
    });

    describe('Login and Logout Tests', () => {
        it('should login successfully with registered user', () => {
            loginForm.login(user.username, user.password);
            loginForm.verifyPageTitle('Accounts Overview');
            loginForm.clickElement(loginForm.selectors.logoutButton);
        });

        it('should logout successfully and redirect to the homepage', () => {
            loginForm.login(user.username, user.password);
            loginForm.verifyPageTitle('Accounts Overview');
            loginForm.clickElement(loginForm.selectors.logoutButton);
            loginForm.verifyPageTitle('Welcome | Online Banking');
        });
    });

    describe('Forgotten Login Information Tests', () => {
        it('should retrieve user credentials when using Forgot login info', () => {
            loginForm.clickElement(loginForm.selectors.forgottenLoginLink);
            loginForm.verifyHeader('Customer Lookup');
            loginForm.forgotLoginInfo(user);
            loginForm.assertText('#rightPanel p', 'Your login information was located successfully. You are now logged in.');
            cy.get('#rightPanel p').eq(1).within(() => {
                cy.contains('b', 'Username').parent().should('contain.text', user.username);
                cy.contains('b', 'Password').parent().should('contain.text', user.password);
            });

        });

        it('should require all inputs to be filled in order to retrieve user credentials', () => {
            loginForm.clickElement(loginForm.selectors.forgottenLoginLink);
            loginForm.verifyHeader('Customer Lookup');
            loginForm.clickElement('input.button[value="Find My Login Info"]');

            const errorMessages = [
                'First name is required.',
                'Last name is required.',
                'Address is required.',
                'City is required.',
                'State is required.',
                'Zip Code is required.',
                'Social Security Number is required.',
            ];

            errorMessages.forEach((errorMessage) => {
                cy.contains('.error', errorMessage).should('be.visible');
            });
        });
    });
});

