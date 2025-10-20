# cisc474-project-starter

A repo that you can fork to make new projects

# Setup

- Clone this repo
- NVM and the right version of Node
  - Install Node.
  - Make sure you have at least version 22.12.\*, not lower. Run `node -v` to check your version.
  - Windows: You can have multiple versions of Node using NVM: <https://github.com/coreybutler/nvm-windows>
  - Mac: You can get NVM to manage multiple versions: https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script
  - Either way, use `nvm list` and `nvm use` to switch between Node versions, and make sure you get onto a version 22.12.\* or higher.
- Install dependencies
  - `cd` into your cloned project directory
  - Run `npm install` to install the project dependencies
- Run your site
  - `npm run dev`
- Docker:
  - Install Docker Desktop from <https://www.docker.com/products/docker-desktop>

# Deployment

- Frontend:
  - Vercel: https://vercel.com/
  - Directions:
    - Create a Vercel account using your Github
    - Import your forked repository
    - Make sure you are happy with the Project Name
    - In the "Root Directory" field, use `apps/web` (do NOT use `apps/docs`)
    - Click "Deploy"
    - You can now access your deployed site at the provided URL
- Database:
  - SupaBase Free Tier: https://supabase.com/
  - Directions:
    - Start a new project on the Free Tier
    - Login using your Github
    - Create a new organization:
      - Name: Your choice, e.g., `CISC474 F25 Projects` (you can change this later)
      - Type: `Educational`
      - Price: `Free - $0/month`
    - Create a new project:
      - Organization: Choose your previously selected organization
      - Project name: Name according to assignment, e.g., `acbart lms`
      - Database Password: Click the "Generate Password" text, then make sure you securely record the password (e.g., with your browser's automatic password saving features) because you will need it in the next step.
      - Region: `East US (North Virginia)`
    - You can now get your connection details for this database. Click the "Connect" button at the top of the window, and get the Transaction Pooler string (not the Direct connection). Note that the text `[YOUR-PASSWORD]` will be in the connection string, and you have to replace it with your Supabase password (make sure the brackets are removed too). You will need the connection string for the next step.
- Backend:
  - Render: https://render.com/
  - Directions:
    - Sign in to Render using your Github and create an account
    - Create a new workspace, name it something appropriate for this project
    - Fill out the survey information about how you will use it, as you see fit
    - Choose to make a new Web Service
    - Connect to Github as your Git Provider
    - Select the repository you want to deploy
    - Choose "Virginia (US East)" for your Region (not critical)
    - For your Root Directory, use `./`
    - For Instance Type, choose "Free $0/month"
    - In the Environment Variables, add the following:
      - `DATABASE_URL`: The pooled connection string using port 6543 - see example below
      - `DIRECT_URL`: The direct pooled connection string using port 5432 - See example below
    - Click the Deploy button
- Set up your local `.env` file:
  - Take a look at the details in the Connection string, and replace the information below in a new `.env` file at the same level as this `README.md` file.

```
DATABASE_URL="postgres://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgres://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"
```

Then, you can make the first push of your initial database setup: `npx prisma db push`

Then you can populate the database with an initial row by using: `npx prisma db seed`

- Run studio: `npx prisma studio`
- Validate prisma: `npx prisma validate`

---

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `apps/docs`: a [Next.js](https://nextjs.org/) app
- `apps/api`: a [Nestjs](https://nodejs.org/) app
- `apps/web`: another [Next.js](https://nextjs.org/) app
- `apps/database`: the Prisma database ORM configuration
- `packages/ui`: a stub React component library shared by both `web` and `docs` applications
- `packages/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `packages/jest-config`: `jest` configurations for testing
- `packages/api`: shared utilities for the `api` app, particularly the DTOs

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Changes on October 5, 2025

I've gone through and made some changes to the frontend, mostly to move us away from Next.js to Tanstack Start/Router. The new frontend is in `apps/web-start`, and the old one is still in `apps/web`. The scripts in `apps/web` and `apps/docs` have been disabled so that they don't run when you do `npm run dev` from the top-level. You might want to delete them, just so you don't get confused, but I figured some folks might still have some code they want to quickly reference in them.

This repository is my version of the tasks we've finished in this class so far. It has a bunch of tables for users, courses, assignments, and submissions. The backend has been modified to allow CORS from the frontend, and the frontend has been modified to use React Query to fetch data from the backend. The frontend is very bare-bones right now, but it does show a list of courses fetched from the backend. If you'd like to see what I've changed from the original repo, you can look at the commits and files changed in this [pull request](https://github.com/UD-CISC474-F25/individual-project-starter/pull/21/files).

### Getting the new frontend working

1. First, pull my changes from upstream. You can try to do this from the GitHub UI, but I recommend adding my original repo as an upstream and then merging that upstream remote into your branch. It'll look something like this:

```console
git remote add upstream https://github.com/UD-CISC474-F25/individual-project-starter.git
git fetch upstream
git checkout main
get merge upstream/main
```

2. I modified a few files, and you can look over this PR to see what they are. You might get conflicts if you are doing more complicated things. Eventually, you should end up with a new `apps/web-start` folder, and you should also see that the `apps/web/package.json` and `apps/docs/package.json` files have been modified (to disable them from running when you use `npm run dev`).
3. You'll need to `cd apps/web-start` and run `npm install` to actually install the dependencies; you might be able to make it work from the top-level, but it didn't for me.
   1. You might also need to `cd packages/api` and run `npm install` to get the shared DTOs working.
4. Now when you run `npm run dev` the first time, Vite will create a necessary file (`apps/web-start/src/routeTree.gen.ts`).
5. Install Tanstack/React Query Devtools extension. You can get links to the extension for your browser here: https://tanstack.com/query/latest/docs/framework/react/devtools (note that you do not need to follow the rest of those instructions)
6. You might need to modify your `.env` file in `apps/web-start` to have the following content:

```
VITE_BACKEND_URL="http://localhost:3000"
```

7. Now you will need to port over your frontend, or at least as much of it as you want. For more information about TanStack Start's routing, see: <https://tanstack.com/start/latest/docs/framework/react/routing>
8. You can use the `backendFetcher` function in `./integrations/fetcher.ts` to fetch data from the backend. It uses the `VITE_BACKEND_URL` environment variable to determine where to send requests. For more information about Tanstack/React Query, see: <https://tanstack.com/query/latest/docs/framework/react/guides/queries>

### Deploying

Once you are ready to deploy, you can use Cloudflare Workers for the frontend. The backend can still be deployed on Render.

1. Go to Cloudflare Workers: https://workers.cloudflare.com/
2. Sign up for a new account with Github.
3. Click "Get Started" next to "Import a Repository"
4. Select Github
   4.1. Authorize the application
   4.2. Install it on your personal account
   4.3. Choose "Only select repositories" and find the 474 repo we are using this semester.
   4.4. Install
5. For a second time, click "Get Started" next to "Import a Repository"
6. Choose the 474 repo from the list
7. Choose an appropriate name for your Repository.
8. Change the deploy command to the following: `npx wrangler deploy -c apps/web-start/dist/server/wrangler.json`
9. Click the Okay button at the bottom.
10. The site should deploy; you can use the box with a diagonal arrow to preview the site ("Preview the worker"). You can find this button with no label in the top-right corner.
11. You will also need to add a new VITE_BACKEND_URL environment variable to your **Build** Variables and Secrets (not just the runtime Variables and Secrets), or whatever you choose to use for giving the backend url to the frontend.

I had an error with my Render deploy, but this was fixed after I emptied the cache and redeployed. Make sure you update your backend's secrets to include the new origin URL for your frontend.

You are free to shut down your Vercel frontend. We won't need it anymore.

## Changes on October 19, 2025

Set up an account on Auth0. I recommend using your Github account to sign up.

Register your application. You will be making an API first (since we will do authentication through your Render backend).

- For the Name, you can use something like "F25 CISC474 Username Individual".
- For the Identifier, I recommend using the URL of your deployed Render application (e.g., `https://<whatever>.onrender.com/`)

Go to the Permissions tab, and also add a new permission (scope). For now, you can just make it something like `read:courses`. This will become important if you want to add finer-grained authorization to your application, but we'll keep things simple for now.

### Backend

Save, and now head back to VS Code. We need to create an authentication module, controller, and service in the `apps/api` package. CD into that folder and run the following commands:

```
nest g module auth
nest g controller auth
nest g service auth
```

You'll also need to install some new modules:

```
npm install @nestjs/jwt @nestjs/passport passport passport-auth0 passport-jwt jwks-rsa
npm install -D @types/passport-auth0 @types/passport-jwt @types/passport-jwt
```

Then copy over the `jwt.strategy.ts` file and the `current-user.decorator.ts` from the `apps/api/src/auth/` folder.

You'll need to add some new environment variables to your `apps/api/.env` file and your top-level `./.env` (and on Render itself, when you deploy) for `AUTH0_ISSUER_URL` and `AUTH0_AUDIENCE`. You can find their values in the example code they provide for the QuickStart. I recommend you look at the Node.JS tab and then get them from the `audience` and `issuerBaseURL` fields. Make sure that both of them have the trailing slash. These URLS _must_ match the ones that get sent by the frontend, so precision matters.

You'll need to modify your `auth.module.ts` file to have the appropriate import, providers, and exports.

Attach guards to all the Courses endpoints, for now. This let's you verify that you've set things up correctly. If you have, then you won't be able to access any of the API routes due to authorization errors. Keep in mind that the verb you use affects whether you are accessing a given route (e.g., the `courses/create/` route is expecting POST, not GET, so you cannot easily access it from your regular browser navigation).

You'll also be able to now attach the `@CurrentUser() user: JwtUser` parameter to endpoints, so that you can access the current user information.

One critical other route to add is `users/me` over in `users.controller.ts`. This let's you let a user get their current information.

### Frontend

Now we need to set up the client application for the frontend SPA. Back on the Auth0 dashboard, go to Applications and create a new Application of the type "Single Page Application".

In the following menu, go to Settings. Then go down to "Application URIs". For the Allowed Callback URLs, you will need to provide at least your frontend's localhost and Cloudflare backend, something like:

http://localhost:3001/home,https://cisc474-f25-acbart.acbart.workers.dev/home

Notice we are using the frontend, not the backend, since that is where the redirects are being handled.

You can use the same values for the Allowed Logout URLs.

For the Allowed Web Origins, you will need to provide just the localhost and CW frontend domains. Make sure you include the port for localhost, and no trailing slashes:

http://localhost:3001,https://cisc474-f25-acbart.acbart.workers.dev

Save, and let's go back to VS Code. This time we'll be in the frontend (apps/web-start). I followed the Quickstart instructions for React, but I'll give you the summarized version here. We'll need to install the auth0 sdk for React.

```
npm install @auth0/auth0-react
```

We're going to need to inject an `Auth0Provider` into the context of our application's root. So open up `router.tsx` and wrap the provider around the existing `TanStackQuery.Provider`. Note that this means you need environment variables for your frontend. You can get the values from the Settings menu.

I've made some modifications to my `backendFetcher` to turn it into `api.ts`, and it now handles all the authentication stuff for us (including getting the token). If you take advantage of my changes, you'll now see errors when you try to navigate to `localhost:3001/courses/` (because we're not authenticated yet). It might take a while, because the `useQuery` function will helpfully try a few times before it gives up.

Next you'll need to add a new LoginButton component. I added this in a new `apps/web-start/components/` directory. Then, I incorporate that button into my `apps/web-start/routes/index.tsx` page. I also created a LogoutButton at the same time.

I also needed to create a `apps/web-start/routes/home.tsx` page, which will be able to take advantage of the information I get from the login process. Normally, you would then use that information to populate the database record in the backend properly. But you will see that I am going to instead just leave that information client-side. You could create a form that let's a user update their information, which can then be pulled with the `users/me` endpoint.

The flow will be that the user clicks the login button, that takes them to Auth0 for login, that redirects to `home` on the frontend, and then they can access routes that have guarded backends.
