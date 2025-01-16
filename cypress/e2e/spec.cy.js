import BasePage from '../support/pages/BasePage';

describe('Homepage Tests', () => {
    const basePage = new BasePage();

    // Link configurations
    const headerLinks = [
        { selector: '.leftmenu a[href="about.htm"]', title: 'About Us', header: 'ParaSoft Demo Website' },
        { selector: '.leftmenu a[href="services.htm"]', title: 'Services', header: 'Available Bookstore SOAP services:' },
        { selector: '.leftmenu a[href="admin.htm"]', title: 'Administration', header: 'Administration' },
    ];

    const buttonLinks = [
        { selector: '.button a[href="index.htm"]', title: 'Welcome | Online Banking', header: null },
        { selector: '.button a[href="about.htm"]', title: 'About Us', header: 'ParaSoft Demo Website' },
        { selector: '.button a[href="contact.htm"]', title: 'Customer Care', header: 'Customer Care' },
    ];

    const footerLinks = [
        { selector: '#footerPanel a[href="index.htm"]', title: 'Welcome | Online Banking', header: null },
        { selector: '#footerPanel a[href="about.htm"]', title: 'About Us', header: 'ParaSoft Demo Website' },
        { selector: '#footerPanel a[href="services.htm"]', title: 'Services', header: 'Available Bookstore SOAP services:' },
        { selector: '#footerPanel a[href="sitemap.htm"]', title: 'Site Map', header: null },
        { selector: '#footerPanel a[href="contact.htm"]', title: 'Customer Care', header: 'Customer Care' },
    ];

    beforeEach('load the homepage', () => {
        basePage.visit('/');
        basePage.verifyPageTitle('Welcome | Online Banking');
    });

    // General UI Tests
    describe('General UI Elements', () => {
        it('should display the logo image', () => {
            cy.get('.logo').should('be.visible');
        });

        it('should display the navigation links', () => {
            const navigationLinks = ['About Us', 'Services', 'Products', 'Locations', 'Admin Page'];

            navigationLinks.forEach((link) => {
                cy.contains(link).should('be.visible');
            });
        });

        it('should display the login panel with username and password inputs', () => {
            cy.get('#loginPanel').should('be.visible').within(() => {
                cy.get('form').should('exist');
                cy.get('input[name="username"]').should('exist');
                cy.get('input[name="password"]').should('exist');
            });
        });

        it('should display footer links', () => {
            const footerTextLinks = ['Home', 'About Us', 'Services', 'Products', 'Locations', 'Forum', 'Site Map', 'Contact Us'];

            footerTextLinks.forEach((link) => {
                cy.contains(link).should('be.visible');
            });
        });
    });

    // Navigation Tests
    describe('Navigation Tests', () => {
        it('should navigate to the correct pages using header panel links', () => {
            headerLinks.forEach(link => {
                basePage.visit('/');
                basePage.verifyPageTitle('Welcome | Online Banking');
                basePage.navigateToPage(link.selector, link.title, link.header);
            });
        });

        it('should navigate to the correct pages using the button links', () => {
            buttonLinks.forEach(link => {
                basePage.visit('/');
                basePage.verifyPageTitle('Welcome | Online Banking');
                basePage.navigateToPage(link.selector, link.title, link.header);
            });
        });

        it('should navigate to the correct pages using the footer links', () => {
            footerLinks.forEach(link => {
                basePage.visit('/');
                basePage.verifyPageTitle('Welcome | Online Banking');
                basePage.navigateToPage(link.selector, link.title, link.header);
            });
        });

        it('should navigate to the Forgotten login info page', () => {
            basePage.navigateToPage('#loginPanel a[href="lookup.htm"]', 'Customer Lookup', 'Customer Lookup');
        });

        it('should navigate to the Register page', () => {
            basePage.navigateToPage('#loginPanel a[href="register.htm"]', 'Register for Free Online Account Access', 'Signing up is easy!');
        });
    });
});