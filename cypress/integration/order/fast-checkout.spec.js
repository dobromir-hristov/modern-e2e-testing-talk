/// <reference types="Cypress" />
describe('Order a pizza', () => {
    it('should order a pizza', () => {
        cy.visit('https://www.dominos.bg/')
        // click the Order Now button
        cy.get('.navbar-nav .button[data-type=order]').click()
        // work within the modal
        cy.get('#popupModal').within(() => {
            cy.get('[data-rel=popup-login]').within(() => {
                // add login details
                cy.get('input#login-email').type('dobromir92@gmail.com')
                cy.get('input#login-pass').type('dominos')
                // click login button
                cy.get('.button.login').click()
            })
            // Go next
            cy.get('[data-rel=order-steps]').find('[data-rel="D"]').click()
            // assert we are on step 1
            cy.url().should('contain', '#step2')
            // make the order
            cy.get('.make_order').should('be.visible').click()
        })
        cy.url().should('contain', 'menu')
        // choose a Margarita
        cy.get('[data-perma="margarita"]').click()
        // Add it to the cart
        cy.get('.Add_btn').click()
        // finish the order
        cy.get('.checkout').click()
        // check that we are on the checkout page
        cy.url().should('contain', '/checkout')
        cy.get('.basket-product')
            .should('have.length', 1)
            .should('contain', 'Маргарита')
        // finish checkout
    })
})