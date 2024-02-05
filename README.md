# Frontend Mentor - Entertainment web app solution

**Notice**: Migration to Next.js 14 in progress, the website is currently broken as I am removing `Prisma` in favor of `Kysely`.

This is a solution to the [Entertainment web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X). Frontend Mentor challenges help you improve your coding skills by building realistic project.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Setup](#setup)
- [My process](#my-process)
  - [Built with](#built-with)

## Overview

### The challenge

Users should be able to:

- [x] View the optimal layout for the app depending on their device's screen size
- [x] See hover states for all interactive elements on the page
- [x] Navigate between Home, Movies, TV Series, and Bookmarked Shows pages
- [x] Add/Remove bookmarks from all movies and TV series
- [x] Search for relevant shows on all pages
- [x] **Bonus**: Build this project as a full-stack application
- [x] **Bonus**: If you're building a full-stack app, we provide authentication screen (sign-up/login) designs if you'd like to create an auth flow

### Screenshots

| Mobile layout                                                                                     | Desktop layout                                                                                      |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| <a href="./screenshots/mobile-signin.png"><img src="./screenshots/mobile-signin-thumb.png" /></a> | <a href="./screenshots/desktop-signin.png"><img src="./screenshots/desktop-signin-thumb.png" /></a> |
| <a href="./screenshots/mobile-main.png"><img src="./screenshots/mobile-main-thumb.png" /></a>     | <a href="./screenshots/desktop-main.png"><img  src="./screenshots/desktop-main-thumb.png" /></a>    |

### Links

- Live Site URL: https://frontend-mentor-entertainment-app-neon.vercel.app

### Setup

Install dependencies:

```
npm install
```

Create a `.env` file in the root of the poject directory and add the following variables:

```
NEXTAUTH_URL="<Website url>"
NEXTAUTH_SECRET="<Secret value for next-auth>"
PGHOST=<postgres host>
PGUSER=<postgres user>
PGDATABASE=<postgres database>
PGPASSWORD=<postgres password>
PSPORT=<postgres port>
```

Example `.env` file:

```
NEXTAUTH_URL="localhost:3000"
NEXTAUTH_SECRET="apDXOcvgjU6RB9ZVA0dhGxnEEg6iotMwHSBl2kfWgBk="
PGHOST=localhost
PGUSER=user
PGDATABASE=entertainment_app
PGPASSWORD=mypassword
PGPORT=5432
```

#### Apply database migrations

**Note**: I've also provided SQL scripts if the migration does not work

Create a new postgres database and make sure you have an user with the necessary roles.

Open the `db/migrate.ts` file and enter the database, user and password in the object passed to the `Pool` contructor

Then in a terminal, run:

```
npx tsx db/migrate.ts
```

### Runing in dev mode

In a terminal, run:

```
npm run dev
```

## My process

### Built with

- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Sass](https://sass-lang.com/) - CSS preprocessor
- [React](https://reactjs.org/) - JS library
- [Typescript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Next.js 14](https://nextjs.org/) - React framework
- [Kysely](https://kysely.dev/) - SQL query builder
- [PostgreSQL](https://www.postgresql.org/) - Relational database
