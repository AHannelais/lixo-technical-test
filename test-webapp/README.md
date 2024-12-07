# App Template

## Commands

Here are some commands you might find useful:

- `npm start`: Starts the development server.
- `npm test`: Runs unit tests.
- `npm run build`: Builds the application for production.

## ENVIRONMENT

This project uses environment variables for configuration. These are stored in `.env` files. 

this template can use local, `dev`, `staging` and `prod` environments

To set up your environment variables:

1. Locate the `.env.example` file in the project root directory. This file contains all the environment variables used by the application, with example values.

2. Create a new file in the same directory. This will hold the environment variables for your environment.

3. Copy the contents of `.env.example` into `.env.your-env`.

4. Replace the example values in `.env.your-env` with your actual values.


## Installed Packages

- @headlessui/react
- @rainbow-me/rainbowkit
- @tanstack/react-query
- react-router-dom
- viem
- wagmi
- tailwindcss
- vite
- react-tooltip
- react-fontawesome

## Dev Setup Config

- ESlint linter config
- Prettier formatter config
- VITE_PORT env variable
- "@/" alias to "src"

## TESTS

This template uses Mocha as the test runner and Chai as the assertion library for writing unit tests. 

The test files are located in the `./test` directory and have the `.test.ts` extension. 

To run the tests, use the following command:

```bash
npm test
```


## CI

### DEPLOYMENT

template deploy script is located at `.github/workflows/deploy.yml`

##### Warnings :
- `APP_TEMPLATE` variable is needs to be edited according to your app name
- Check with backend team that S3 bucket is set
- Set your Github Actions secrets in the repository settings


### RELEASES

template release script is located at `.github/workflows/release.yml`
##### Note :
- Set your Github Actions secrets in the repository settings