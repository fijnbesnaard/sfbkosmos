# SFB Kosmos Migration Guide

Follow these steps to get your project up and running on your other Mac.

## 1. Clone the Repository

Since you have `gh` (GitHub CLI) installed, run:

```bash
gh repo clone fijnbesnaard/sfbkosmos
```

## 2. Restore Environment Variables

The `.env.local` file is not on GitHub. You need to create it in the root folder and paste the following configuration:

```bash
# The name of your repo
NEXT_PUBLIC_KEYSTATIC_REPO="fijnbesnaard/sfbkosmos"

# From the GitHub App settings
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG="sfbkosmos"
KEYSTATIC_GITHUB_CLIENT_ID="Iv23litis0Y0rCEgpeKt"
KEYSTATIC_GITHUB_CLIENT_SECRET="633f4293913dcac232dedfc9890ba931f66afd5d"

# Internal Keystatic Secret
KEYSTATIC_SECRET="c5pb3pu2ycn4jc2xauccsgc7d5jdbgyw"
```

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
