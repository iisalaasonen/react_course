describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen"
    }
    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function() {
    cy.contains("login").click()
    cy.contains("log in to application")
  })
  describe("Login", function() {
    it("user can log in", function() {
      cy.contains("login").click()
      cy.get("#username").type("mluukkai")
      cy.get("#password").type("salainen")
      cy.get("#login-button").click()

      cy.contains("Matti Luukkainen logged in")
    })
    it("login fails with wrong password", function() {
      cy.contains("login").click()
      cy.get("#username").type("mluukkai")
      cy.get("#password").type("wrong")
      cy.get("#login-button").click()

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid")

      cy.get("html").should("not.contain", "Matti Luukkainen logged in")
    })
  })
  describe("When logged in", function() {
    beforeEach(function() {
      cy.login({ username: "mluukkai", password: "salainen" })
    })
    it("a new blog can be created", function() {
      cy.contains("create new blog").click()
      cy.get("#title").type(" by cypress")
      cy.get("#author").type("tester")
      cy.get("#url").type("test.com")
      cy.get("#create-button").click()
      cy.get("#blogView").contains("by cypress")
    })
    it("it is possible to like a blog", function() {
      cy.createBlog({ title: "Like this blog", author: "tester", url: "test.com" })
      cy.contains("view").click()
      cy.contains("like").click()
    })
    it("user can delete own blog", function() {
      cy.createBlog({ title: "Like this blog", author: "tester", url: "test.com" })
      cy.contains("view").click()
      cy.contains("remove").click()
    })
    it.only("blogs are  in ascending order", function() {
      cy.createBlog({ title: "Blog1", author: "tester", url: "test.com" })
      cy.createBlog({ title: "Blog2", author: "tester", url: "test.com" })
      cy.createBlog({ title: "Blog3", author: "tester", url: "test.com" })
      cy.contains("Blog2").click()
      cy.get(".allContent").eq(1)
        .contains("like").click()
        .wait(500)
        .contains("like").click()
        .wait(500)
      cy.contains("Blog1").click()
      cy.get(".allContent").eq(0)
        .contains("like").click()
        .wait(500)
      cy.get(".blogNameButton").then((blogs) => {
        const button1 = blogs[0]
        cy.wrap(button1).contains("Blog3")
        const button2 = blogs[1]
        cy.wrap(button2).contains("Blog1")
        const button3 = blogs[2]
        cy.wrap(button3).contains("Blog2")
      })
    })

  })

})