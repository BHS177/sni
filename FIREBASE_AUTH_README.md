# Firebase Authentication Setup

This project implements Firebase Authentication with email/password and Google sign-in using modern ES2023 syntax and clean code practices.

## Features

- ✅ Email/Password Authentication
- ✅ Google OAuth Sign-in
- ✅ Password Reset
- ✅ Protected Routes
- ✅ User Profile Management
- ✅ Modern TypeScript with ES2023
- ✅ React Hook Form with Zod validation
- ✅ Hot Toast notifications
- ✅ Clean Architecture

## Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
   - Enable "Google" provider and configure OAuth consent
4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Find "Your apps" section and click on the web app icon
   - Copy the configuration object

### 2. Environment Variables

Create a `.env.local` file in the project root and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 3. Install Dependencies

```bash
yarn install
```

### 4. Run the Development Server

```bash
yarn dev
```

## File Structure

```
src/
├── config/
│   └── firebase.ts          # Firebase configuration
├── services/
│   └── auth.ts              # Authentication service layer
├── contexts/
│   └── AuthContext.ts       # Authentication context definition
├── providers/
│   └── AuthProvider.tsx     # Authentication provider component
├── hooks/
│   └── useAuth.ts           # Authentication hook
├── components/
│   ├── ProtectedRoute.tsx   # Route protection component
│   └── ui/
│       └── GoogleIcon.tsx   # Google sign-in icon
├── pages/
│   ├── LoginPage.tsx        # Login page with Firebase auth
│   ├── RegisterPage.tsx     # Registration page
│   └── ForgotPasswordPage.tsx
├── schemas/
│   └── auth.ts              # Zod validation schemas
└── types/
    └── index.ts             # TypeScript type definitions
```

## Authentication Architecture

### Separation of Concerns

The authentication system follows a clean architecture with proper separation:

#### 1. Context (`src/contexts/AuthContext.ts`)
- Pure context definition using React's createContext
- Contains only the context type definition
- No business logic or state management

#### 2. Provider (`src/providers/AuthProvider.tsx`)
- Contains all authentication state management
- Handles auth operations (sign in, sign up, sign out)
- Manages loading states and error handling
- Wraps the application with authentication context

#### 3. Hook (`src/hooks/useAuth.ts`)
- Simple custom hook for consuming auth context
- Provides type-safe access to authentication state
- Throws error if used outside of AuthProvider

#### 4. Service (`src/services/auth.ts`)
- Pure business logic layer for Firebase operations
- Static methods for all authentication functions
- Error handling and Firebase integration
- No React dependencies - can be used anywhere

This architecture ensures:
- **Single Responsibility**: Each file has one clear purpose
- **Testability**: Easy to unit test each component separately
- **Reusability**: Service layer can be used outside React components
- **Type Safety**: Full TypeScript support throughout
- **Maintainability**: Clear separation makes code easy to modify

### 1. Sign Up
- Users can register with email/password or Google OAuth
- Profile name is automatically set from form data or Google profile
- Email verification is handled by Firebase

### 2. Sign In
- Email/password authentication
- Google OAuth with popup flow
- "Remember me" functionality with session persistence
- Automatic redirect to dashboard on success

### 3. Password Reset
- Email-based password reset flow
- User-friendly success messages

### 4. Protected Routes
- Routes are automatically protected based on authentication state
- Unauthenticated users are redirected to login
- Authenticated users accessing auth pages are redirected to dashboard

## Key Features

### Modern TypeScript Implementation
- Uses latest ES2023 features
- Strict type checking with proper Firebase types
- Clean separation of concerns

### Error Handling
- Comprehensive Firebase error mapping
- User-friendly error messages
- Toast notifications for all auth actions

### State Management
- React Context for authentication state
- Persistent auth state across page reloads
- Loading states for better UX

### Security Best Practices
- Environment variables for sensitive config
- Proper Firebase security rules (configure in Firebase Console)
- Session management with configurable persistence

## Authentication Service

The `AuthService` class provides a clean API:

```typescript
// Sign in with email/password
await AuthService.signIn({ email, password, rememberMe });

// Sign up with email/password
await AuthService.signUp({ firstName, lastName, email, password });

// Google OAuth sign-in
await AuthService.signInWithGoogle();

// Password reset
await AuthService.resetPassword(email);

// Sign out
await AuthService.signOut();

// Listen to auth state changes
const unsubscribe = AuthService.onAuthStateChanged((user) => {
  // Handle user state change
});
```

## Custom Hooks

### useAuth Hook
```typescript
const { 
  user,           // Current user object
  loading,        // Loading state
  error,          // Error message
  signIn,         // Sign in function
  signUp,         // Sign up function
  signInWithGoogle, // Google sign in
  signOut,        // Sign out function
  resetPassword,  // Password reset
  updateProfile,  // Update user profile
  clearError      // Clear error state
} = useAuth();
```

## Validation Schemas

All forms use Zod schemas for validation:

- Strong password requirements (8+ chars, uppercase, lowercase, number, special char)
- Email validation
- Confirm password matching
- Terms agreement validation

## UI Components

### GoogleIcon
Custom SVG icon component for Google sign-in button with proper branding colors.

### ProtectedRoute
Higher-order component that handles route protection:
- `requireAuth={true}` - Requires authentication (default)
- `requireAuth={false}` - Redirects authenticated users away

## Styling

- Tailwind CSS for styling
- Dark mode support
- Responsive design
- Framer Motion animations
- Consistent design system

## Production Deployment

1. Set up Firebase Hosting or your preferred hosting service
2. Configure environment variables on your hosting platform
3. Set up Firebase security rules
4. Configure OAuth redirect URLs in Firebase Console
5. Build and deploy:

```bash
yarn build
```

## Security Considerations

1. **Firebase Security Rules**: Configure proper Firestore/Storage rules
2. **Environment Variables**: Never commit `.env.local` to version control
3. **OAuth Configuration**: Set up proper authorized domains in Firebase
4. **HTTPS**: Always use HTTPS in production
5. **CSP Headers**: Consider Content Security Policy headers

## Testing

The authentication system can be tested with:
- Valid email/password combinations
- Google OAuth flow
- Password reset functionality
- Route protection behavior

## Troubleshooting

### Common Issues:

1. **Firebase not configured**: Check environment variables
2. **Google OAuth not working**: Verify OAuth client configuration
3. **Popup blocked**: Ensure popup blocker is disabled for testing
4. **CORS issues**: Check authorized domains in Firebase Console

### Debug Mode:

Enable debug logging by setting:
```javascript
firebase.setLogLevel('debug');
```

## Authentication Flow

## Next Steps

Consider implementing:
- Email verification flow
- Phone number authentication
- Multi-factor authentication
- Custom claims for role-based access
- User profile management UI
- Account deletion functionality
