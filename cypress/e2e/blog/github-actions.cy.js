/// <reference types="cypress" />

describe('Blog Post tags-[blog]', () => {
  it('github actions', () => {
    cy.visit('/blog/github-actions');
    cy.screenshot({
      capture: 'fullPage',
    });
  });
});
