# MEIK LABS

MEIK LABS is a modern web application built with a blend of cutting-edge technologies. It provides innovative solutions using AI, digital twins, chatbots, and more.

## Tech Stack

- **React & TypeScript:** Built using React with TypeScript for robust and type-safe UI development ([src/App.tsx](src/App.tsx)).
- **Vite:** A fast and lean frontend build tool.
- **Tailwind CSS:** For rapid UI styling and custom design ([tailwind.config.js](tailwind.config.js)).
- **Firebase Hosting:** Deployed on Firebase to serve static assets ([firebase.json](firebase.json)).
- **Lucide React:** For icons throughout the UI.
- **ESLint & Prettier:** Code linting and formatting ([eslint.config.js](eslint.config.js), [prettier.config.js](package.json)).

## Project Structure

The project is organized as follows:
- **src/**: Contains all source code including pages (e.g., [src/pages/Home.tsx](src/pages/Home.tsx), [src/pages/AboutUs.tsx](src/pages/AboutUs.tsx)), components, and utilities.
- **content/**: JSON files for blog posts, services, and testimonials.
- **public/**: Static files including the manifest and robots.txt.
- **.env**: Environment-specific configuration ([.env](.env)).

## Functions and Features

- **Dynamic Routing:** Uses React Router to manage page navigation ([src/App.tsx](src/App.tsx)).
- **Responsive UI:** Built with Tailwind CSS to ensure responsiveness across devices.
- **Content Driven Pages:** Blog and project entries are dynamically generated from JSON files located under **src/content**.
- **Firebase Integration:** Deployed on Firebase Hosting for high performance and scalability.
- **Interactive Elements:** Includes buttons, cards, and interactive components sourced from custom UI libraries ([src/components/ui](src/components/ui)).

## Deployment

### Firebase Hosting

This project uses Firebase Hosting. The deployment configuration is defined in [firebase.json](firebase.json) and uses rewrites to serve the SPA’s index.html.

### GitHub Deployment Workflow

For continuous deployment:
- The deployments are triggered from the **meiklabs** branch.
- Two GitHub workflows handle deployments:
  - **On Merge:** [firebase-hosting-merge.yml](.github/workflows/firebase-hosting-merge.yml) deploys when changes are merged into the **meiklabs** branch.
  - **Pull Request Preview:** [firebase-hosting-pull-request.yml](.github/workflows/firebase-hosting-pull-request.yml) deploys preview builds on PRs.

### Steps to Deploy

1. **Install Dependencies:**

   npm install

 2.  **Run Locally:**

 npm run dev

 3.  **Build for Production:**

 npm run build

 4. **Deploy to Firebase Hosting:**

On merging to the meiklabs branch, the GitHub Action defined in firebase-hosting-merge.yml will automatically build and deploy your application to Firebase Hosting.

5. **Configure Environment Variables:**

Ensure you have your environment variables set in the .env file, for example:
VITE_WEB3FORMS_KEY="your web3forms key"

Additional Information
For more details on local testing and app architecture, refer to the src directory.
The project uses modern JavaScript features with a strong emphasis on performance and code quality.