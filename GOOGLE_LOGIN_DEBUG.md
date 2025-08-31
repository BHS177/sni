# Google Login Debugging Guide

## What I've Fixed

1. **Added detailed error logging** - The error handler now logs the specific Firebase error code
2. **Updated environment variables** - Added the missing `VITE_FIREBASE_DATABASE_URL`
3. **Removed authResolver** - Simplified the Google sign-in to use default popup behavior
4. **Enhanced error messages** - Added more specific error codes and messages
5. **Fixed syntax errors** - Cleaned up the auth service file

## How to Debug the Google Login Issue

### Step 1: Check the Browser Console
1. Open your app at `http://localhost:5173/`
2. Open Developer Tools (F12)
3. Go to the Console tab
4. Try to sign in with Google
5. Look for error messages that start with "Firebase Auth Error:" or "Google Sign-in Error:"

### Step 2: Common Google OAuth Issues

#### Issue: `auth/operation-not-allowed`
**Solution:** Enable Google sign-in in Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/project/io-snippo-b2e77)
2. Navigate to **Authentication** > **Sign-in method**
3. Click on **Google** provider
4. Toggle **Enable**
5. Add your project's OAuth 2.0 client ID (or let Firebase create one)
6. Save changes

#### Issue: `auth/unauthorized-domain`
**Solution:** Add localhost to authorized domains:
1. In Firebase Console > Authentication > Settings
2. Go to **Authorized domains** section
3. Add `localhost` if not already present
4. For production, add your actual domain

#### Issue: `auth/popup-blocked`
**Solution:** 
- Disable popup blocker for localhost
- Or use redirect instead of popup (see alternative implementation below)

#### Issue: `auth/invalid-api-key` or `auth/app-deleted`
**Solution:** Check your environment variables are correct:
```bash
# Check if your .env.local file has the correct values
cat .env.local
```

### Step 3: Test Firebase Console Setup

Visit your Firebase Console and verify:

1. **Authentication is enabled:**
   - Go to Authentication > Users
   - Should show an empty table (if no users yet)

2. **Google provider is enabled:**
   - Go to Authentication > Sign-in method
   - Google should show as "Enabled"

3. **Authorized domains include localhost:**
   - Go to Authentication > Settings
   - Authorized domains should include `localhost`

### Step 4: Alternative Google Sign-in Implementation

If popup continues to fail, here's a redirect-based alternative:

```typescript
// In src/services/auth.ts - Alternative method
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';

// Alternative Google sign-in with redirect
static async signInWithGoogleRedirect(): Promise<void> {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    throw new Error(handleAuthError(error as AuthError));
  }
}

// Handle redirect result (call this in your app initialization)
static async handleRedirectResult(): Promise<AuthUser | null> {
  try {
    const result = await getRedirectResult(auth);
    return result?.user ? mapFirebaseUser(result.user) : null;
  } catch (error) {
    throw new Error(handleAuthError(error as AuthError));
  }
}
```

### Step 5: Check Network Issues

1. **Check your internet connection**
2. **Verify Firebase project is active:**
   - Go to Firebase Console
   - Ensure project isn't suspended or deleted

### Step 6: Test with a Simple Example

Try this minimal test in the browser console:

```javascript
// Test Firebase initialization
console.log('Auth:', window.firebase?.auth);

// Test Google provider
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider)
  .then(result => console.log('Success:', result))
  .catch(error => console.log('Error:', error));
```

## Expected Behavior

When Google sign-in works correctly:

1. **Click "Sign in with Google"** button
2. **Popup opens** with Google OAuth consent screen
3. **Select Google account** and grant permissions
4. **Popup closes** and you're redirected to dashboard
5. **Success toast** appears: "Successfully signed in with Google!"

## What to Look For in Console

### Success Case:
```
Firebase Auth Error: (none)
Successfully signed in with Google!
```

### Error Cases:
```
Firebase Auth Error: FirebaseError: Firebase: Error (auth/operation-not-allowed)
An unexpected error occurred: auth/operation-not-allowed. Please try again.
```

```
Firebase Auth Error: FirebaseError: Firebase: Error (auth/popup-blocked)
Pop-up was blocked by your browser. Please allow pop-ups and try again.
```

## Next Steps

1. **Try the Google sign-in** and check what specific error appears in console
2. **Share the exact error message** from the console
3. **Verify Firebase Console settings** using the checklist above
4. **Test with a different browser** if popup issues persist

The enhanced error logging will now show exactly what's going wrong, making it much easier to fix the specific issue!
