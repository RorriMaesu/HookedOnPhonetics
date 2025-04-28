# Firebase Setup for Hooked On Phonetics

This document provides instructions for setting up Firebase for the Hooked On Phonetics project programmatically, without using the Firebase Console UI.

## Prerequisites

1. **Node.js and npm**: Make sure you have Node.js and npm installed.
2. **Firebase CLI**: Install the Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```
3. **Google Cloud SDK**: Install the Google Cloud SDK from [https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)
4. **Firebase Account**: You need a Firebase account and access to the project `hookedonphonetics-d58c3`.

## Setup Scripts

The project includes several scripts to automate the Firebase setup process:

1. **setup-firebase.js**: Sets up Firebase configuration and creates a service account key.
2. **init-firestore.js**: Initializes Firestore with sample data.
3. **setup-functions.js**: Deploys Firebase Functions, Firestore Rules, and Storage Rules.
4. **setup-hosting.js**: Builds and deploys the client application to Firebase Hosting.
5. **setup-github-pages.js**: Builds the client application for GitHub Pages deployment.
6. **setup-all.js**: Runs all the above scripts in sequence.

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Step-by-Step Setup

### 1. Login to Firebase and Google Cloud

```bash
# Login to Firebase
firebase login

# Login to Google Cloud
gcloud auth login
```

### 2. Run the Setup Scripts

You can run the scripts individually or use the master script to run them all:

```bash
# Run all setup scripts
node scripts/setup-all.js

# Or run them individually
node scripts/setup-firebase.js
node scripts/init-firestore.js
node scripts/setup-functions.js
node scripts/setup-hosting.js
```

### 3. Verify the Setup

After running the scripts, verify that everything is set up correctly:

```bash
# Check Firebase project
firebase projects:list

# Check Firestore data
firebase firestore:indexes

# Check Firebase Functions
firebase functions:list

# Check Firebase Hosting
firebase hosting:sites:list
```

## Firebase Configuration

The Firebase configuration is stored in the following files:

- **Client**: `client/.env`
- **Functions**: `functions/config/serviceAccountKey.json`
- **Firebase Rules**: `firestore.rules` and `storage.rules`
- **Firebase Config**: `firebase.json` and `.firebaserc`

## Firebase Emulators

You can start the Firebase emulators for local development:

```bash
firebase emulators:start
```

This will start the following emulators:

- Authentication: [http://localhost:9099](http://localhost:9099)
- Functions: [http://localhost:5001](http://localhost:5001)
- Firestore: [http://localhost:8080](http://localhost:8080)
- Hosting: [http://localhost:5000](http://localhost:5000)
- Emulator UI: [http://localhost:4000](http://localhost:4000)

## Deployment

To deploy to Firebase, you can use the following commands:

```bash
# Deploy everything
firebase deploy

# Deploy only specific services
firebase deploy --only functions
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
firebase deploy --only hosting
```

## Troubleshooting

### Service Account Key

If you encounter issues with the service account key, you can create it manually:

1. Go to [Firebase Console > Project Settings > Service Accounts](https://console.firebase.google.com/project/hookedonphonetics-d58c3/settings/serviceaccounts/adminsdk)
2. Click "Generate new private key"
3. Save the downloaded JSON file as `functions/config/serviceAccountKey.json`

### Firebase Login

If you have issues with Firebase login, try:

```bash
firebase logout
firebase login --reauth
```

### Google Cloud SDK

If you have issues with the Google Cloud SDK, make sure it's properly installed and configured:

```bash
gcloud components update
gcloud auth login
gcloud config set project hookedonphonetics-d58c3
```

### Firebase Permissions

Make sure you have the necessary permissions for the Firebase project:

1. Owner or Editor role on the Firebase project
2. Firebase Admin SDK Service Agent role
3. Cloud Functions Developer role

## Security Considerations

- **Service Account Key**: Never commit the service account key to version control.
- **Environment Variables**: Keep sensitive information in environment variables.
- **Firestore Rules**: Update the Firestore rules for production to restrict access.
- **Storage Rules**: Update the Storage rules for production to restrict access.

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Google Cloud SDK Documentation](https://cloud.google.com/sdk/docs)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase Functions](https://firebase.google.com/docs/functions)
