# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/950f3272-b910-4d64-9cac-2db1a8b0bf1b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/950f3272-b910-4d64-9cac-2db1a8b0bf1b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Express.js (Backend)
- PostgreSQL (Database with Prisma ORM)

## Authentication System

This project includes a complete authentication system with:

- User registration and login
- Role-based access control (user/admin)
- JWT token authentication
- Protected routes
- Admin dashboard for user management

### Default Accounts

- Admin: admin@example.com / admin123
- User: user@example.com / user123

## Backend Setup

To run the backend server:

```sh
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Set up the database (make sure PostgreSQL is running)
npx prisma migrate dev

# Seed the database
npm run seed

# Start the backend server
npm run dev
```

## Frontend Setup

To run the frontend:

```sh
# From the root directory
npm install

# Start the development server
npm run dev
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/950f3272-b910-4d64-9cac-2db1a8b0bf1b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)