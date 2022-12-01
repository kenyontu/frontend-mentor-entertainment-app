# Frontend Mentor - Entertainment web app solution

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

- Solution URL:
- Live Site URL:

### Setup

Install dependencies:

```
npm install
```

Create a `.env` file in the root of the poject directory and add the following variables:

```
DATABASE_URL="<PostgreSQL connection URL>"
NEXTAUTH_URL="<website url>"
NEXTAUTH_SECRET="<Secret value for next-auth>"
```

Sync the database with the Prisma schema:

```
npm run prisma:push
```

Seed the database with the seed data:

```
npm run prisma:seed
```

Start the app in dev mode:

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
- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [PostgreSQL](https://www.postgresql.org/) - Relational database
