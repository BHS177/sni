export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  duration: number;
  fileSize: number;
  format: string;
  uploadDate: Date;
  status: 'uploaded' | 'processing' | 'ready' | 'error';
  tags?: string[];
}

export interface Caption {
  id: string;
  videoId: string;
  text: string;
  startTime: number;
  endTime: number;
  style: CaptionStyle;
}

export interface CaptionStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  backgroundColor?: string;
  position: 'top' | 'center' | 'bottom';
  alignment: 'left' | 'center' | 'right';
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export interface Project {
  id: string;
  name: string;
  videos: Video[];
  captions: Caption[];
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'processing' | 'completed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription: 'free' | 'pro' | 'enterprise';
  projects: Project[];
}

export interface UploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  thumbnail?: string;
}

export interface AIGenerationRequest {
  prompt: string;
  style?: 'documentary' | 'commercial' | 'social' | 'educational';
  duration?: number;
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3';
}

export interface AIGenerationResult {
  id: string;
  request: AIGenerationRequest;
  status: 'pending' | 'generating' | 'completed' | 'error';
  progress: number;
  resultUrl?: string;
  error?: string;
  createdAt: Date;
}

export interface Theme {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  accent: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  providerId: string;
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  clearError: () => void;
}
