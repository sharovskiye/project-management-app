# Project Management App

## Attention: Unsupported Project

This project is no longer maintained and is provided for demonstration purposes only. Please note that it may contain outdated dependencies and does not receive updates since its release.

## Used Technologies

The project utilizes the following technologies and libraries:

- **React** - for building the user interface.
- **Redux** and **@reduxjs/toolkit** - for state management.
- **React Router** - for navigation between pages.
- **Material-UI** - for pre-built components and styling.
- **Formik** and **Yup** - for working with forms and data validation.
- **i18next** - for localization of textual content.
- **react-beautiful-dnd** - for implementing drag-and-drop functionality.
- **Husky** and **lint-staged** - for running linters before commits.
- **GitHub Actions** - for continuous integration and workflow automation.
- Other tools to enhance development and code maintenance.

## Overview of Functional Blocks and Tasks Solved by the Application:

### Welcome Page (Route)

- **Tasks:**
  - Displays general information about the team, project, and course.
  - Implements a transition to the Sign In / Sign Up form upon clicking the respective buttons.
  - Automatically redirects the user to the "Main Route" when a valid token is present.
  - Ensures automatic redirection to the "Welcome Page" upon token expiration.

### Header

- **Tasks:**
  - Displays a sticky header on all pages with a valid token.
  - Animates the sticky header upon scrolling.
  - Provides users with functionalities: Edit Profile, Sign Out, Create New Board, and a toggle/select localization.

### Footer

- **Tasks:**
  - Displays a footer with links to the GitHub profiles of the authors, the year of application creation, and the course logo.
  - Appears on all pages.

### Sign In / Sign Up

- **Tasks:**
  - Implements forms for login and registration according to the API backend.
  - Performs validation of form fields.
  - Notifies users of errors in a friendly format.
  - Redirects to the "Main Route" upon successful login.
  - Redirects to the "Main Route" for logged-in users attempting to log in again.

### Main Route

- **Tasks:**
  - Displays a list of boards with the ability to create and delete them.
  - Navigates to the "Board Route" upon clicking on a board.
  - Ensures a convenient interface for users.

### Board Route

- **Tasks:**
  - Creates and deletes columns.
  - Creates and deletes tasks.
  - Provides drag-and-drop functionality for moving columns and tasks.
  - Implements interaction with tasks for comfortable viewing/editing of data.
  - Enables the deletion of tasks and modification of their structure.
  - Implements editing column headers and their deletion.
  - Ensures a user-friendly interface.

This application provides powerful tools for project and task management, offering a user-friendly interface and effective interaction capabilities for users.
