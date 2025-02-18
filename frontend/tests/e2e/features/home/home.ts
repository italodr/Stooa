/*!
 * This file is part of the Stooa codebase.
 *
 * (c) 2020 - present Runroom SL
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('a profile information', () => {
  cy.intercept('POST', 'https://localhost:8443/graphql', {
    fixture: 'self-user.json'
  }).as('gqlSelfUserQuery');
});

When('clicks on its profile', () => {
  cy.get('header').within(() => {
    cy.findByRole('button', { name: 'Linwood Hahn' }).click({ force: true });
  });
});

Then('sees the register form', () => {
  cy.findByRole('heading', { name: 'Register to get started' });

  cy.screenshot();
});

Then('sees login and register buttons', () => {
  cy.get('header').within(() => {
    cy.screenshot();
    cy.findByRole('link', { name: 'Register for free' });
    cy.findByRole('link', { name: 'Log in' });
  });
});

Then('sees the create fishbowl form', () => {
  cy.findByRole('heading', { name: 'Create a free fishbowl' });

  cy.screenshot();
});

Then('sees create fishbowl and profile buttons', () => {
  cy.get('header').within(() => {
    cy.screenshot();
    cy.findByRole('button', { name: 'Create a free fishbowl' });
    cy.findByRole('button', { name: 'Linwood Hahn' });
  });
});

Then('sees the edit profile form', () => {
  cy.wait('@gqlSelfUserQuery');

  cy.findByRole('heading', { name: 'Edit profile' });

  cy.screenshot();
});

Then('sees the change password form', () => {
  cy.findByRole('heading', { name: 'Change password' });

  cy.screenshot();
});

Then('no longer sees its profile', () => {
  cy.get('header').within(() => {
    cy.findByRole('link', { name: 'Linwood Hahn' }).should('not.exist');
  });
});
