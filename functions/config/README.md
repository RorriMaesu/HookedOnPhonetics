# Firebase Service Account Key

This directory should contain your Firebase service account key file named `serviceAccountKey.json`.

## How to Get Your Service Account Key

1. Go to the Firebase Console: https://console.firebase.google.com/project/hookedonphonetics-d58c3/settings/serviceaccounts/adminsdk
2. Click on "Generate new private key"
3. Save the downloaded JSON file as `serviceAccountKey.json` in this directory

## Security Warning

**IMPORTANT**: Never commit your service account key to version control. The `serviceAccountKey.json` file is already added to `.gitignore` to prevent accidental commits.

## Using Environment Variables (Alternative)

Instead of using a service account key file, you can also use environment variables:

1. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of your service account key file:

   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
   ```

2. For GitHub Actions, you can add the service account key as a secret and create the file during the workflow:

   ```yaml
   - name: Create Service Account Key
     run: echo '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}' > ${{ github.workspace }}/functions/config/serviceAccountKey.json
   ```
