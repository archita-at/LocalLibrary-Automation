# LocalLibrary Login and Logout Test Plan

## Application Overview

Test plan for LocalLibrary login and logout modules covering super user, staff user, and reader user roles.

## Test Scenarios

### 1. Login and Logout Modules

**Seed:** `tests/seed.spec.ts`

#### 1.1. Super user login

**File:** `specs/login-logout-test-plan.md`

**Steps:**
  1. Open the application login page at /accounts/login/.
    - expect: Login form is visible with username, password, and login button.
  2. Enter super user credentials from test-data/users.json (username: test_super, password: Su-user1234).
    - expect: Username and password fields contain the entered values.
  3. Click the Login button.
    - expect: The dashboard page loads successfully.
  4. Verify the logged-in username on the dashboard.
    - expect: Dashboard displays username test_super.
  5. Verify the staff section is not visible for the super user.
    - expect: Staff section is hidden or absent.

#### 1.2. Staff user login

**File:** `specs/login-logout-test-plan.md`

**Steps:**
  1. Open the application login page at /accounts/login/.
    - expect: Login form is visible.
  2. Enter staff user credentials from test-data/users.json (username: test_staff, password: St-user1234).
    - expect: Username and password fields contain the entered values.
  3. Click the Login button.
    - expect: Dashboard page loads successfully.
  4. Verify the logged-in username on the dashboard.
    - expect: Dashboard displays username test_staff.
  5. Verify the staff section is visible for the staff user.
    - expect: Staff section is visible.

#### 1.3. Reader user login

**File:** `specs/login-logout-test-plan.md`

**Steps:**
  1. Open the application login page at /accounts/login/.
    - expect: Login form is visible.
  2. Enter reader user credentials from test-data/users.json (username: test_reader, password: Re-user1234).
    - expect: Username and password fields contain the entered values.
  3. Click the Login button.
    - expect: Dashboard page loads successfully.
  4. Verify the logged-in username on the dashboard.
    - expect: Dashboard displays username test_reader.
  5. Verify the staff section is not visible for the reader user.
    - expect: Staff section is hidden or absent.

#### 1.4. Super user logout

**File:** `specs/login-logout-test-plan.md`

**Steps:**
  1. Login with super user credentials (test_super / Su-user1234).
    - expect: Dashboard page is displayed after login.
  2. Click the logout button on the dashboard.
    - expect: Logout action completes and the page navigates to /accounts/logout/.
  3. Verify the logged-out confirmation message.
    - expect: Page displays a message such as Logged out! or equivalent.
  4. Verify the Re-login link is visible.
    - expect: Relogin link is visible.
  5. Verify the dashboard username and logout button are no longer visible.
    - expect: Username is not visible.
    - expect: Logout button is not visible.

#### 1.5. Staff user logout

**File:** `specs/login-logout-test-plan.md`

**Steps:**
  1. Login with staff user credentials (test_staff / St-user1234).
    - expect: Dashboard loads successfully.
  2. Click the logout button on the dashboard.
    - expect: Page navigates to /accounts/logout/.
  3. Verify the logged-out confirmation message and relogin link.
    - expect: Logged out message is visible.
    - expect: Relogin link is visible.
  4. Verify the dashboard username and logout button are hidden.
    - expect: Username is no longer visible.
    - expect: Logout button is no longer visible.

#### 1.6. Reader user logout

**File:** `specs/login-logout-test-plan.md`

**Steps:**
  1. Login with reader user credentials (test_reader / Re-user1234).
    - expect: Dashboard loads successfully.
  2. Click the logout button on the dashboard.
    - expect: Page navigates to /accounts/logout/.
  3. Verify the user is logged out and relogin link is visible.
    - expect: Logged out message is visible.
    - expect: Relogin link is visible.
  4. Verify the login/signup option is visible again.
    - expect: Login/Sign Up button is visible.

#### 1.7. Login validation: empty username

**File:** `specs/login-logout-test-plan.md`

**Steps:**
  1. Open the login page.
    - expect: Login form is visible.
  2. Enter only the password for any valid user and leave username blank.
    - expect: Password field contains the value and username field is empty.
  3. Click Login.
    - expect: A browser validation error appears for the username field.

#### 1.8. Login validation: empty password

**File:** `specs/login-logout-test-plan.md`

**Steps:**
  1. Open the login page.
    - expect: Login form is visible.
  2. Enter only the username for any valid user and leave password blank.
    - expect: Username field contains the value and password field is empty.
  3. Click Login.
    - expect: A browser validation error appears for the password field.

#### 1.9. Login validation: invalid credentials

**File:** `specs/login-logout-test-plan.md`

**Steps:**
  1. Open the login page.
    - expect: Login form is visible.
  2. Enter a valid username with an incorrect password.
    - expect: Input values are accepted.
  3. Click Login.
    - expect: An error message appears stating username and password did not match.
