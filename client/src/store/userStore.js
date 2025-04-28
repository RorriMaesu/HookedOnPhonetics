import { create } from 'zustand';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithCustomToken,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { authAPI } from '../services/api';

const useUserStore = create(set => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check auth state
  error: null,

  // Initialize auth state listener
  init: () => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    // Return unsubscribe function to clean up on unmount
    return unsubscribe;
  },

  // Register a new user
  register: async (email, password, displayName) => {
    set({ isLoading: true, error: null });
    try {
      // Register user through our API
      const response = await authAPI.register({ email, password, displayName });

      // Sign in with the custom token from our API
      if (response.token) {
        await signInWithCustomToken(auth, response.token);
      }

      // Get the current user from Firebase Auth
      const user = auth.currentUser;

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return user;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Login through our API
      const response = await authAPI.login({ email, password });

      // Sign in with the custom token from our API
      if (response.token) {
        await signInWithCustomToken(auth, response.token);
      } else {
        // Fallback to direct Firebase Auth if no token is provided
        await signInWithEmailAndPassword(auth, email, password);
      }

      // Get the current user from Firebase Auth
      const user = auth.currentUser;

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return user;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Logout action
  logout: async () => {
    set({ isLoading: true });
    try {
      // Logout through our API
      await authAPI.logout();

      // Sign out from Firebase Auth
      await signOut(auth);

      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Clear any errors
  clearError: () => set({ error: null }),
}));

export default useUserStore;
