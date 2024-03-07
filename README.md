# simple-noc-template 

This is a template for implementing a NOC service built in NodeJS + TS following clean architecture principles, adapter pattern, domain-based pattern among others.

# How to proceed

1. Define and configure your own .env based on .env.example file.
    -  Check the comments about how to setup your services
    -  Create your own .env.test file for the testing setup (In case you want to use different service/db's for testing)
2. Execute the following commands:
    ```npm i```
    ```npx prisma migrate dev```
    ```npm run dev```
3. Running tests:
    ```npm run test```

# Stack

- NodeJS
- TypeScript
- Mongoose
- Prisma
- NodeMailer
- Cron
- env-var
- Jest


