import RegistrationPage from '../support/pages/RegistrationPage';

describe('User Registration Tests', () => {
    const registrationPage = new RegistrationPage();

    beforeEach('load the Register page', () => {
        registrationPage.visit('/register.htm');
        registrationPage.verifyPageTitle('Register for Free Online Account Access');
    });

    after(() => {
        registrationPage.cleanDatabase();
    });

    after(() => {
        registrationPage.cleanDatabase();
    });


    it('should register multiple users dynamically', () => {

        // Load user data from users.json and iterate over each user
        cy.fixture('users.json').then((users) => {
            users.forEach((user) => {
                registrationPage.fillRegistrationForm(user);

                // Verify successful registration
                cy.contains('Your account was created successfully. You are now logged in.')
                    .should('be.visible');

                // Log out and prepare for the next user
                registrationPage.clickElement('a[href="logout.htm"]');
                registrationPage.visitRegisterPage();
            });
        });
    });

    it('should require all inputs to be filled in order to register', () => {
    
        // Submit form with empty inputs
        registrationPage.clickElement('input.button[value="Register"]');
    
        // Verify error messages for required fields
        const errorMessages = [
            'First name is required.',
            'Last name is required.',
            'Address is required.',
            'City is required.',
            'State is required.',
            'Zip Code is required.',
            'Social Security Number is required.',
            'Username is required.',
            'Password is required.',
            'Password confirmation is required.',
        ];
    
        errorMessages.forEach((errorMessage) => {
            cy.contains('.error', errorMessage).should('be.visible');
        });
    });

});