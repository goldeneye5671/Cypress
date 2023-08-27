/// <reference types="cypress" />
describe("Login to app", () => {

    beforeEach("", () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get(`[data-test="username"]`).type("standard_user")
        cy.get(`[data-test="password"]`).type("secret_sauce")
        cy.get(`[data-test="login-button"]`).click()
    
        cy.url().should("be.eq", "https://www.saucedemo.com/inventory.html")
    })

    it("Logs in and logs out", () => {
        cy.get("#react-burger-menu-btn").click()
        cy.get(`#logout_sidebar_link`).click()
    
        cy.url().should("be.eq", "https://www.saucedemo.com/")
    })

    it("Adds pne item to the cart", () => {
        cy.get(".inventory_list").children().should("have.length.above", 0)
        cy.get(".inventory_list").children().contains("Sauce Labs Backpack").click()

        cy.url().should("be.eq", "https://www.saucedemo.com/inventory-item.html?id=4")

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should("have.text", "1")

        cy.get('.shopping_cart_link').click()

        cy.get(".cart_list").contains("Sauce Labs Backpack").click()

        cy.get('[data-test="remove-sauce-labs-backpack"]').should("exist")
    })

    it("Adds many item to the cart and checks for cart price", () => {
        cy.get(".inventory_list").children().should("have.length.above", 0)
        cy.get(".inventory_list").children().contains("Sauce Labs Backpack").click()

        cy.url().should("be.eq", "https://www.saucedemo.com/inventory-item.html?id=4")

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should("have.text", "1")

        cy.get('[data-test="back-to-products"]').click()

        cy.get(".inventory_list").children().contains("Sauce Labs Bike Light").click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()


        // cy.get('.shopping_cart_link').click()

        // cy.get(".cart_list").contains("Sauce Labs Backpack").click()

        // cy.get('[data-test="remove-sauce-labs-backpack"]').should("exist")
    })
})