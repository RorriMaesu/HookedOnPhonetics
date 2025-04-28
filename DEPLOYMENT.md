# Deployment Guide for Hooked On Phonetics

This guide explains how to deploy the Hooked On Phonetics application to both Firebase Hosting and GitHub Pages.

## Prerequisites

1. **Node.js and npm**: Make sure you have Node.js and npm installed.
2. **Firebase CLI**: Install the Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```
3. **Firebase Account**: You need a Firebase account and access to a Firebase project.
4. **GitHub Account**: You need a GitHub account to deploy to GitHub Pages.

## Deployment Options

### Option 1: Firebase Hosting (Recommended for Production)

Firebase Hosting provides a complete hosting solution with HTTPS, CDN, and integration with Firebase services.

#### Manual Deployment

1. **Login to Firebase**:
   ```bash
   firebase login
   ```

2. **Build and Deploy**:
   ```bash
   node scripts/setup-hosting.js
   ```

3. **Access Your Site**:
   Your site will be available at `https://[YOUR-PROJECT-ID].web.app`

#### Automated Deployment with GitHub Actions

1. **Set up GitHub Secrets**:
   - `FIREBASE_TOKEN`: Generate with `firebase login:ci`
   - `FIREBASE_SERVICE_ACCOUNT`: Your Firebase service account key JSON
   - `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, etc.: Your Firebase configuration values

2. **Push to Main Branch**:
   The GitHub Actions workflow will automatically deploy to Firebase Hosting when you push to the main branch.

### Option 2: GitHub Pages (Great for Open Source Projects)

GitHub Pages is free and easy to set up, making it ideal for open source projects.

#### Manual Deployment

1. **Build for GitHub Pages**:
   ```bash
   node scripts/setup-github-pages.js
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   git subtree push --prefix client/dist origin gh-pages
   ```

3. **Access Your Site**:
   Your site will be available at `https://[YOUR-USERNAME].github.io/HookedOnPhonetics`

#### Automated Deployment with GitHub Actions

1. **Set up GitHub Secrets**:
   - `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, etc.: Your Firebase configuration values

2. **Push to Main Branch**:
   The GitHub Actions workflow will automatically deploy to GitHub Pages when you push to the main branch.

## Dual Deployment

You can deploy to both Firebase Hosting and GitHub Pages to get the best of both worlds:

1. **Firebase Hosting**: For production use with full Firebase integration
2. **GitHub Pages**: For sharing your project with the open source community

Both deployments will use the same Firebase backend, so users can access the same data regardless of which URL they use.

## Environment Variables

The application uses environment variables to determine the deployment target:

- `DEPLOY_TARGET=github`: Build for GitHub Pages with base path `/HookedOnPhonetics/`
- Default (no environment variable): Build for Firebase Hosting with base path `/`

## Troubleshooting

### Firebase Hosting Issues

1. **Authentication Errors**:
   ```bash
   firebase logout
   firebase login
   ```

2. **Deployment Errors**:
   ```bash
   firebase deploy --debug
   ```

### GitHub Pages Issues

1. **404 Errors**:
   Make sure you have a `.nojekyll` file in the root of your GitHub Pages branch.

2. **Routing Issues**:
   GitHub Pages doesn't support client-side routing by default. The application includes a workaround in `main.jsx` to handle this.

## Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [React Router with GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages)
