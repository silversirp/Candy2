### Example candy factory project using TypeScript, Prisma ORM, and SQLite:

First, let's set up the project directory and initialize a new TypeScript project:

mkdir candy-factory
cd candy-factory
npm init -y
npm install typescript ts-node prisma sqlite3 @prisma/client

Next, let's create a tsconfig.json file to configure TypeScript:

{
"compilerOptions": {
"module": "commonjs",
"esModuleInterop": true,
"target": "es6",
"moduleResolution": "node",
"sourceMap": true,
"outDir": "dist",
"baseUrl": ".",
"paths": {
"*": [
"node_modules/*"
]
}
},
"include": [
"src/**/*"
]
}

Let's also create a prisma/schema.prisma file to define our database schema:

datasource db {
provider = "sqlite"
url      = "file:dev.db"
}

generator client {
provider = "prisma-client-js"
}

model Candy {
id         Int      @id @default(autoincrement())
name       String
flavor     String
color      String
priceCents Int
}

Now we can generate Prisma client by running:

Now we can generate Prisma client by running:

Let's create an index.ts file in the src directory to start writing some code:

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
const candy = await prisma.candy.create({
data: {
name: 'Gummy Bears',
flavor: 'Assorted',
color: 'Rainbow',
priceCents: 299,
},
})
console.log(candy)
}

main()
.catch(e => console.error(e))
.finally(() => prisma.$disconnect())

Finally, we can run our code with:

npx ts-node src/index.ts

This will create a new Candy in the database and print it to the console.

That's it! This is a basic example of a candy factory project using TypeScript, Prisma ORM, and SQLite.


### Basic TS configuration
https://www.youtube.com/watch?v=ahCwqrYpIuM&ab_channel=Fireship

### Troubleshooting
If you receive the error message "The table main.Candy does not exist in the current database" when running the code, it means that the database table has not been created yet.

To create the table, you can use the Prisma Migrate CLI. Here are the steps:

Add a migration by running the following command:

npx prisma migrate dev --name init

This command creates a new migration file in the prisma/migrations directory.

Apply the migration by running the following command:

npx prisma migrate dev

This command applies the migration and creates the database tables.

Once the migration has been applied successfully, you should be able to run the code without any errors.


### How to add Express to tis project

Install the express package:

npm install express @types/express

Create a new file app.ts in the src directory:
Create a new file app.ts in the src directory:

Modify the index.ts file to start the Express server instead of calling the main() function:

import { PrismaClient } from '@prisma/client';
import app from './app';

const prisma = new PrismaClient();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});

Modify the tsconfig.json file to include the new app.ts file:

{
"compilerOptions": {
"module": "commonjs",
"esModuleInterop": true,
"target": "es6",
"moduleResolution": "node",
"sourceMap": true,
"outDir": "dist",
"baseUrl": ".",
"paths": {
"*": [
"node_modules/*"
]
}
},
"include": [
"src/**/*"
],
"exclude": [
"node_modules",
"**/*.test.ts"
]
}

That's it! Now you can run the server with the command:

npx ts-node src/index.ts


And make requests to http://localhost:3000/candies to get all candies, or http://localhost:3000/candies with a POST request to create a new candy.

### Add concurrently
### Add into package.json
"scripts": {
"dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
},

### Add into tsconfig.json
"compilerOptions": {
"strict": true,
}

Run 'npm install -D concurrently nodemon'

### To run application
Run 'npm run dev'