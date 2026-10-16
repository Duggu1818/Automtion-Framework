# SauceDemo Login Test Plan

**Application:** https://www.saucedemo.com/  
**Feature:** Login  
**Page title:** Swag Labs

## Preconditions and test data

- Start each scenario from a fresh browser context at the login page.
- Use the demo credentials shown on the page:
  - Standard user: `standard_user`
  - Password: `secret_sauce` (shared by the listed demo users)
  - Locked account: `locked_out_user`
- Verify messages in the login form's visible alert and confirm failed attempts remain on the login page.

## Scenarios

### 1. Login form is available

**Steps**
1. Open the application root URL.
2. Inspect the login form and its visible helper text.

**Expected results**
- The page title is `Swag Labs`.
- Username and Password fields and the Login button are visible.
- The page lists accepted demo usernames and the shared password.

### 2. Login succeeds with valid credentials

**Steps**
1. Enter `standard_user` in Username.
2. Enter `secret_sauce` in Password.
3. Select Login.

**Expected results**
- The browser navigates to `/inventory.html`.
- The authenticated page displays the Products heading.

### 3. Username is required

**Steps**
1. Leave Username and Password empty.
2. Select Login.

**Expected results**
- The login page remains open.
- A visible alert reports `Epic sadface: Username is required`.

### 4. Password is required

**Steps**
1. Enter `standard_user` in Username.
2. Leave Password empty.
3. Select Login.

**Expected results**
- The login page remains open.
- A visible alert reports `Epic sadface: Password is required`.

### 5. Invalid credentials are rejected

**Steps**
1. Enter an unrecognized username and an incorrect password.
2. Select Login.

**Expected results**
- The login page remains open.
- A visible alert reports `Epic sadface: Username and password do not match any user in this service`.

### 6. Locked-out user is rejected

**Steps**
1. Enter `locked_out_user` in Username.
2. Enter `secret_sauce` in Password.
3. Select Login.

**Expected results**
- The login page remains open; no authenticated inventory is shown.
- A visible alert reports `Epic sadface: Sorry, this user has been locked out.`.

## Execution notes

- The success, empty-form, missing-password, invalid-credentials, and locked-account behaviors were manually checked against the live site while preparing this plan.
- Use role/label-based locators for the form controls and assert the alert text and URL or destination heading, rather than relying on styling or element position.
