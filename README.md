# Your Library

A small online library where you can **add a book, borrow a book and return a book**.
Browse all books, share your own, and keep track of what you have borrowed and read.

## Live Site

🔗 **https://your-library-for-client-theta.vercel.app/*

Server API: 

## Features

- **Home page** with a Swiper.js slider, the 6 newest books, and extra sections (How Borrowing Works, Top Categories)
- **Authentication** with email and password or Google login, built with BetterAuth and MongoDB
- **Password validation**: at least 6 characters, one uppercase and one lowercase letter
- **Private routes**: Add Book, My Books, My Borrows and Book Details need login, and a reload keeps you logged in
- **Add books** with cover image upload (imgbb), category, description and total copies
- **Edit and delete** your own books, with a confirmation modal before deleting
- **Borrow system** with live available-copy tracking (`$inc`) and a "Not Available" state when copies run out
- **No double borrow**: the same book cannot be borrowed twice at the same time
- **Books I've Read**: returned books are saved to your reading history
- **JWT-protected API** for all private actions
- **Dark and light theme**, smooth animations, and a fully responsive design
- Toast messages for every success and error, loading spinners, custom 404 page, and a unique page title on every route

## Tech Stack

| Area | Technology |
|---|---|
| Frontend | Next.js (App Router), TypeScript, shadcn/ui, Tailwind CSS |
| Authentication | BetterAuth, MongoDB Adapter, JWT |
| Backend | Express.js, TypeScript, MongoDB |
| Extras | Swiper.js, Framer Motion, Sonner, imgbb |
| Hosting | Netlify (client), Render (server) |


## Server Repository

https://github.com/mdnaimzomaddar/Your-Library-For-Server

## Project Live Link

https://your-library-for-client-theta.vercel.app/