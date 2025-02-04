/// <reference types="cypress" />

describe('Blog Post tags-[blog]', () => {
  it('image diffing', () => {
    cy.visit('/blog/image-diffs');
    cy.screenshot({
      capture: 'fullPage',
    });
  });
});
