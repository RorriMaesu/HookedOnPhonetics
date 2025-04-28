import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user profile with display name
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      set({
        user: userCredential.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return userCredential.user;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      set({
        user: userCredential.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return userCredential.user;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Logout action
  logout: async () => {
    set({ isLoading: true });
    try {
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
