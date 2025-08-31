import { createContext } from 'react';
import type { Theme } from '../types';

export const AuthContext = createContext<Theme['mode']>('light');