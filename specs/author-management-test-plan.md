# Author Management Test Plan

## Application Overview

Test plan for the LocalLibrary author management feature. Covers add, update, and delete author actions for super user, staff user, and reader user roles.

## Test Scenarios

### 1. Author Management

**Seed:** `tests/seed.spec.ts`

#### 1.1. Super user can add an author

**File:** `specs/author-management-test-plan.md`

**Steps:**
  1. -
    - expect: User is authenticated as super user and on the dashboard page.
  2. Navigate to the author management or authors section.
    - expect: Authors section or author management page is visible.
  3. Click the Add Author button or link.
    - expect: Author creation form is visible with required fields such as first name, last name, and date of birth.
  4. Enter valid author information and submit the form.
    - expect: Form accepts the input values.
    - expect: The application confirms the author was created successfully.
    - expect: The new author appears in the author list.

#### 1.2. Staff user can add an author

**File:** `specs/author-management-test-plan.md`

**Steps:**
  1. -
    - expect: User is authenticated as staff user and on the dashboard page.
  2. Navigate to the author management or authors section.
    - expect: Authors section or author management page is visible.
  3. Click the Add Author button or link.
    - expect: Author creation form is visible.
  4. Enter valid author information and submit the form.
    - expect: The author is created successfully.
    - expect: The new author appears in the author list.

#### 1.3. Reader user cannot access add author

**File:** `specs/author-management-test-plan.md`

**Steps:**
  1. -
    - expect: User is authenticated as reader user and on the dashboard page.
  2. Attempt to open the author management or authors section.
    - expect: Author management navigation is not visible, or access is denied.
  3. If the reader enters the author management URL directly, submit the request.
    - expect: The application returns an access denied message or redirects away from the author management page.

#### 1.4. Super user can update an author

**File:** `specs/author-management-test-plan.md`

**Steps:**
  1. -
    - expect: User is authenticated as super user and there is an existing author in the list.
  2. Navigate to the author list and select an author to edit.
    - expect: The author edit form is visible with the selected author's current details.
  3. Modify one or more author fields and submit the update.
    - expect: The application confirms the author update was successful.
    - expect: The author list shows the updated author details.

#### 1.5. Staff user can update an author

**File:** `specs/author-management-test-plan.md`

**Steps:**
  1. -
    - expect: User is authenticated as staff user and there is an existing author in the list.
  2. Navigate to the author list and select an author to edit.
    - expect: The author edit form is visible.
  3. Change author details and submit the update.
    - expect: The author updates successfully.
    - expect: The author list reflects the updated author details.

#### 1.6. Reader user cannot access update author

**File:** `specs/author-management-test-plan.md`

**Steps:**
  1. -
    - expect: User is authenticated as reader user.
  2. Attempt to access the author edit page or click an edit action if visible.
    - expect: The edit option is not visible or disabled.
    - expect: If accessed directly, access is denied or redirected.

#### 1.7. Super user can delete an author

**File:** `specs/author-management-test-plan.md`

**Steps:**
  1. -
    - expect: User is authenticated as super user and there is an existing author in the list.
  2. Navigate to the author list and choose an author to delete.
    - expect: Delete action is available for the author.
  3. Confirm the delete action when prompted.
    - expect: The author is removed from the list.
    - expect: A success message confirms deletion.

#### 1.8. Staff user can delete an author

**File:** `specs/author-management-test-plan.md`

**Steps:**
  1. -
    - expect: User is authenticated as staff user and there is an existing author in the list.
  2. Navigate to the author list and choose an author to delete.
    - expect: Delete action is available.
  3. Confirm the delete action.
    - expect: The author disappears from the list.
    - expect: A deletion success confirmation appears.

#### 1.9. Reader user cannot access delete author

**File:** `specs/author-management-test-plan.md`

**Steps:**
  1. -
    - expect: User is authenticated as reader user.
  2. Attempt to access delete author UI or submit a delete request directly.
    - expect: Delete controls are not visible.
    - expect: Direct access results in access denied or redirect.

#### 1.10. Validation for add author with missing required fields

**File:** `specs/author-management-test-plan.md`

**Steps:**
  1. -
    - expect: User is authenticated as super user or staff user and author creation form is open.
  2. Leave required author fields blank and submit the form.
    - expect: The form is not accepted.
    - expect: Validation messages appear for required fields.
  3. Correct the data and resubmit.
    - expect: The author is created successfully once required data is provided.
