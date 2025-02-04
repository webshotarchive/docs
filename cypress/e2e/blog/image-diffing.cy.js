/// <reference types="cypress" />

describe('Blog Post tags-[blog]', () => {
  it('image diffing', () => {
    cy.visit('/blog/diffs');
    cy.screenshot({
      capture: 'fullPage',
    });
  });
});
