describe("My first test", () => {
    it("It should return true", ()=>{
        expect(true).to.equal(true);
    });
});

describe("Testing form inputs", () => {
    beforeEach(function() {
        //Arrange
        cy.visit("http://localhost:3000/");
    });

    it("Input name into the name input", () => {
        cy.pause();
        //Arrange - get the element
        cy.get('input[name="name"]')
        //Act - mimic user interaction
        .type("Alexandre")
        //Asert - test/ verify
        .should("have.value", "Alexandre");       
    });

    it("checks email input", ()=> {
        cy.get('input[name="email"]').type("email@email.com").should("have.value", "email@email.com");
    })

    it("checks for password input", ()=>{
        cy.get('input[name="password"]').type("pa55word").should("have.value", "pa55word");
    })

    it("check the terms box", ()=> {
        cy.get('input[type=checkbox]').check().should("be.checked");
    })

    it("checks the submit button", ()=>{
        cy.get('form').submit();
    })
});