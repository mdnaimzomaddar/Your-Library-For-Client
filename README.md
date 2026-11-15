# Your Library

A small online library where you can **add a book, borrow a book and return a book**.
Browse all books, share your own, and keep track of what you have borrowed and read.

## Live Site

🔗 **https://তোমার-সাইট.netlify.app**

Server API: https://তোমার-server.onrender.com

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

## Run Locally

```bash
git clone https://github.com/mdnaimzomaddar/তোমার-client-repo-নাম.git
cd তোমার-client-repo-নাম
npm install
npm run dev
```

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Server Repository

https://github.com/mdnaimzomaddar/Your-Library-For-Server

## Project Live Link

https://yourlibrarys.netlify.app/