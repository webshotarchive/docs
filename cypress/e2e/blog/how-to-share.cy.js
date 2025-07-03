/// <reference types="cypress" />

describe('Blog Post tags-[blog]', () => {
  it('how to share tags', () => {
    cy.visit('/blog/how-to-share');
    cy.screenshot({
      capture: 'fullPage',
    });
  });
  it('test page', () => {
    cy.visit('/docs/tutorial-basics/test');
    cy.screenshot({
      capture: 'fullPage',
    });
  });
});
