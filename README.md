# Modern Web Development Website

## Overview
Welcome to the Modern Web Development Website! This project was created to build a website using modern web development techniques and host it on GitHub Pages. The aim is to leverage the latest web technologies to create a dynamic and responsive site.

## Features
- **Responsive Design:** Optimized for various screen sizes and devices.
- **Modern JavaScript:** Utilizing ES6+ features for clean and efficient code.
- **CSS Flexbox/Grid:** Layouts that are flexible and easy to maintain.
- **SASS:** Enhanced styling with modular CSS and variables.
- **Webpack/Babel:** Efficient bundling and transpiling of code.
- **GitHub Pages:** Seamless deployment and hosting.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js and npm installed
- Basic understanding of HTML, CSS, and JavaScript
- A GitHub account for hosting

## Installation
To install and run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/bradleyrgriffin/bradleyrgriffin.github.io.git
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the project:
    ```sh
    npm run dev
    ```

## Usage
To use this project, follow these steps:

1. Customize the content in the `src` directory.
2. Run `npm run deploy` to compile and deploy the project.
3. Deploy the site to GitHub Pages using the `gh-pages` branch. (Automatically occurs after merging to main) - where we run the predeploy step. (See .github/workflows/deploy.yml)

## Formatting
We use prettier to format here:
```sh
npm run format
```

## Linting
We use ESLint to format:
```sh
npm run lint
```

## Running Tests
To run tests, use the following command:

```sh
npm run test:coverage
```

### Cypress
CI-based:
```sh
npm run cypress:run
```

UX-based:
```sh
npm run cypress:open
```
