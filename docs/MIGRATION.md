# SFB Kosmos Migration Guide

Follow these steps to get your project up and running on your other Mac.

## 1. Clone the Repository

Since you have `gh` (GitHub CLI) installed, run:

```bash
gh repo clone fijnbesnaard/sfbkosmos
```

## 2. Restore Environment Variables

The `.env.local` file is not on GitHub (it's git-ignored). Create it in the root folder with this structure — pull the actual values from your password manager, never from this file:

```bash
# The name of your repo
NEXT_PUBLIC_KEYSTATIC_REPO="fijnbesnaard/sfbkosmos"

# From the GitHub App settings (Settings > Developer settings > GitHub Apps > sfbkosmos)
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG="sfbkosmos"
KEYSTATIC_GITHUB_CLIENT_ID="<app client id>"
KEYSTATIC_GITHUB_CLIENT_SECRET="<app client secret>"

# Internal Keystatic Secret — generate with: openssl rand -hex 16
KEYSTATIC_SECRET="<random hex string>"
```

> [!WARNING]
> Never paste real secret values into this file or any other file tracked by git — this repo is public.

## 3. Install Dependencies

Navigate into the project folder and install the packages:

```bash
cd sfbkosmos
npm install
```

## 4. Run the Project

Start the development server:

```bash
npm run dev
```

## 5. Verify Setup

- Open [http://localhost:3000](http://localhost:3000) to see the site.
- Visit [http://localhost:3000/keystatic](http://localhost:3000/keystatic) to verify the admin interface.

> [!TIP]
> All your images (`public/content-images`) and local fonts are tracked in Git, so they will be available immediately after cloning!
