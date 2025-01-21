import LoginForm from '../support/pages/LoginForm';
import RegistrationPage from '../support/pages/RegistrationPage';

describe('Login Form Tests', () => {
    const loginForm = new LoginForm();
    const registrationPage = new RegistrationPage();

    // Register a user to check login is successful  
    before(() => {
        registrationPage.visit('/');
        registrationPage.visitRegisterPage();
        cy.fixture('users').then((users) => {
            const firstUser = users[0]; // Select the first user from the array
            registrationPage.fillRegistrationForm(firstUser);
    
            // Validate successful registration
            cy.contains('Your account was created successfully. You are now logged in.').should('be.visible');
            loginForm.clickElement(loginForm.selectors.logoutButton);
        });
    });

    beforeEach('load the homepage', () => {
        loginForm.visit('/');
        loginForm.verifyPageTitle('Welcome | Online Banking');
    });

    after(() => {
        loginForm.clickElement(loginForm.selectors.logoutButton);
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
        },
    ];

    scenarios.forEach(({ description, username, password, expectedError }) => {
        it(`should display an error message when ${description}`, () => {
            if (username) loginForm.fillUsername(username);
            if (password) loginForm.fillPassword(password);
            loginForm.clickLoginButton();
            loginForm.assertErrorMessage(expectedError);
        });
    });

    it('should login successfully with registered user', () => {
        cy.fixture('users').then((users) => {
            const { username, password } = users[0]; // Username and password from first user
            loginForm.login(username, password); 
            loginForm.verifyPageTitle('Accounts Overview')
        });
    })
});

