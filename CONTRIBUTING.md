# Contributing to Ride Booking App

Thank you for your interest in contributing to the **Ride Booking App**! We welcome contributions from the community to enhance this ride-sharing platform. This document outlines the guidelines for contributing to the project. Please take a moment to review them to ensure a smooth and collaborative process.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setting Up the Development Environment](#setting-up-the-development-environment)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Submitting Code Changes](#submitting-code-changes)
- [Development Guidelines](#development-guidelines)
  - [Code Style](#code-style)
  - [Commit Messages](#commit-messages)
  - [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Community](#community)
- [License](#license)

## Code of Conduct

All contributors are expected to adhere to the project's [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the standards for behavior and interaction within the community.

## Getting Started

### Prerequisites

To contribute to the **Ride Booking App**, ensure you have the following installed:

- **Node.js**: Version 20.17.0 or higher
- **Git**: For cloning and managing the repository
- **npm**: For package management (included with Node.js)
- A running instance of the [Ride Booking Backend API](https://ride-booking-backend-himadree.vercel.app/) for local development
- A code editor like Visual Studio Code (recommended)

### Setting Up the Development Environment

1. **Fork the Repository**:
   - Navigate to the [Ride Booking App repository](https://github.com/himadree-chaudhury/ride-booking-app) and click the "Fork" button to create a copy under your GitHub account.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/ride-booking-app.git
   cd ride-booking-app
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Configure Environment Variables**:
   - Create a `.env` file in the project root based on the provided `.env.example`.
   - Add the required environment variables:
     ```env
     VITE_API_BASE_URL=https://ride-booking-backend-himadree.vercel.app
     VITE_GRAPHHOPPER_MAP_KEY=your_graphhopper_api_key_here
     ```

5. **Run the Application**:
   - Start the development server:
     ```bash
     npm run dev
     ```
   - The app will be available at `http://localhost:3000` (or another port if specified).

6. **Verify Setup**:
   - Ensure the app connects to the backend API and renders the landing page correctly.
   - Test with the provided credentials (see [README.md](README.md) for details).

## How to Contribute

We welcome contributions in the form of bug reports, feature suggestions, and code changes. Below are the steps to contribute effectively.

### Reporting Bugs

If you find a bug, please report it by creating an issue in the repository:

1. Go to the [Issues tab](https://github.com/himadree-chaudhury/ride-booking-app/issues) in the repository.
2. Click "New Issue" and select the "Bug Report" template (if available).
3. Provide a clear title, detailed description, steps to reproduce, expected behavior, and any relevant screenshots or logs.
4. Label the issue as `bug` and submit it.

### Suggesting Features

To propose a new feature or enhancement:

1. Go to the [Issues tab](https://github.com/himadree-chaudhury/ride-booking-app/issues) and click "New Issue."
2. Select the "Feature Request" template (if available).
3. Describe the feature, its use case, and how it benefits the project. Include any mockups or examples if possible.
4. Label the issue as `enhancement` and submit it.

### Submitting Code Changes

To contribute code (e.g., bug fixes, new features, or improvements):

1. **Create a Branch**:
   - Create a new branch for your changes:
     ```bash
     git checkout -b feature/your-feature-name
     ```
   - Use descriptive branch names (e.g., `fix/login-bug`, `feature/add-payment-gateway`).

2. **Make Changes**:
   - Implement your changes in the appropriate files under the `src/` directory.
   - Follow the [Development Guidelines](#development-guidelines) for code style and structure.

3. **Test Your Changes**:
   - Run the app locally to verify your changes:
     ```bash
     npm run dev
     ```
   - Ensure no new errors are introduced and existing functionality is unaffected.

4. **Lint and Format**:
   - Run the linter to check for code quality:
     ```bash
     npm run lint
     ```
   - Fix any issues:
     ```bash
     npm run lint:fix
     ```

5. **Commit Changes**:
   - Write clear, descriptive commit messages (see [Commit Messages](#commit-messages)).
   - Example:
     ```bash
     git commit -m "feat: add payment gateway integration to ride request"
     ```

6. **Push Changes**:
   - Push your branch to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```

7. **Open a Pull Request**:
   - Navigate to the original repository and open a pull request (PR) from your branch.
   - Follow the [Pull Request Process](#pull-request-process) below.

## Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all code contributions. Define interfaces and types in the `src/types/` directory.
- **ESLint and Prettier**: Follow the configured ESLint and Prettier rules. Run `npm run lint:fix` to auto-format code.
- **Tailwind CSS**: Use utility-first classes for styling. Avoid inline CSS unless absolutely necessary.
- **Component Structure**: Follow the existing structure in `src/components/` (e.g., `ui/`, `layout/`, `modules/`).
- **Naming Conventions**:
  - Components: PascalCase (e.g., `RideRequestForm.tsx`)
  - Files: kebab-case (e.g., `ride-request-form.tsx`)
  - Variables and functions: camelCase (e.g., `fetchRideDetails`)

### Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format for clear and consistent commit messages:

- **Format**: `<type>(<scope>): <description>`
- **Types**: `feat` (new feature), `fix` (bug fix), `docs` (documentation), `style` (formatting), `refactor`, `test`, `chore`
- **Examples**:
  - `feat(rider): add SOS contact management`
  - `fix(auth): resolve login token refresh issue`
  - `docs(readme): update setup instructions`

### Testing

- **Unit Tests**: Add unit tests for new components or logic using a testing framework like Jest (if set up in the project).
- **Manual Testing**: Test your changes in a browser on multiple screen sizes (mobile, tablet, desktop) to ensure responsiveness.
- **API Testing**: Verify API integration using the provided Postman collection (`Ride Booking API.postman_collection.json`).
- **Accessibility**: Ensure new UI components are accessible (e.g., proper ARIA attributes, keyboard navigation).

## Pull Request Process

1. **Create a Pull Request**:
   - Open a PR from your branch to the `main` branch of the original repository.
   - Use the PR template (if available) and provide:
     - A clear title (e.g., `Add Payment Gateway Integration`).
     - A description of the changes, linking to the relevant issue (e.g., `Fixes #123`).
     - Screenshots or GIFs for UI changes.
     - Details of testing performed.

2. **Code Review**:
   - Maintainers will review your PR for code quality, functionality, and adherence to guidelines.
   - Address any feedback by pushing additional commits to the same branch.

3. **Approval and Merge**:
   - Once approved, maintainers will merge the PR into the `main` branch.
   - Your changes will be included in the next release.

4. **Sync Your Fork**:
   - After your PR is merged, sync your fork with the upstream repository:
     ```bash
     git remote add upstream https://github.com/himadree-chaudhury/ride-booking-app.git
     git fetch upstream
     git checkout main
     git merge upstream/main
     git push origin main
     ```

## Community

Join the community to discuss the project, ask questions, or share ideas:

- **GitHub Issues**: For bug reports and feature requests.
- **GitHub Discussions**: For general questions or ideas (if enabled).
- **Contact**: Reach out via the [Contact page](https://ride-booking-frontend-cabsy.vercel.app/contact) for project-related inquiries.

## License

By contributing to the Ride Booking App, you agree that your contributions will be licensed under the [MIT License](LICENSE.md).

---

Thank you for contributing to the **Ride Booking App**! Your efforts help make this ride-sharing platform better for everyone.
