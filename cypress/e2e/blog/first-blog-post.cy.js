/// <reference types="cypress" />

describe('Blog Post tags-[blog]', () => {
  it('first blog post', () => {
    cy.visit('/blog/first-blog-post');
    cy.screenshot({
      capture: 'viewport',
    });
  });
});
