'use client';

import { initializeApp, getApps, FirebaseApp } from "firebase/app";

interface FirebaseConfig {
  apiKey: string;
  projectId: string;
  authDomain: string;
  databaseURL?: string;
  storageBucket: string;
  appId: string;
  measurementId?: string;
  messagingSenderId: string;
}
/**
 * CRITICAL BUILD GUARD RAIL: Safely get Firebase configuration
 * Prevents build crashes when environment variables are missing
 */
function getFirebaseConfig(): FirebaseConfig | null {
  console.log(process.env.NEXT_PUBLIC_FIREBASE_KEY);
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_KEY;
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

  // CRITICAL: Check for required API key before proceeding
  if (!apiKey || apiKey === '' || apiKey === 'undefined') {
    if (typeof window === 'undefined') {
      // Server-side: Log but don't crash
      console.warn('FIREBASE BUILD GUARD: API key missing during build. Firebase will not initialize.');
    } else {
      // Client-side: More detailed error
      console.error('FIREBASE INIT ERROR: NEXT_PUBLIC_FIREBASE_KEY is missing or invalid.');
    }
    return null;
  }

  if (!projectId || projectId === '' || projectId === 'undefined') {
    if (typeof window === 'undefined') {
      console.warn('FIREBASE BUILD GUARD: Project ID missing during build. Firebase will not initialize.');
    } else {
      console.error('FIREBASE INIT ERROR: NEXT_PUBLIC_PROJECT_ID is missing or invalid.');
    }
    return null;
  }

  return {
    apiKey,
    projectId,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || `${projectId}.appspot.com`,
    appId: process.env.NEXT_PUBLIC_APP_ID || '',
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || ''
  };
}

let firebaseApp: FirebaseApp | null = null;

/**
 * CRITICAL BUILD GUARD RAIL: Safely initialize Firebase
 * Only initializes on client-side and when config is valid
 * Returns null during build/server-side to prevent crashes
 */
export function getFirebaseApp(): FirebaseApp | null {
  // CRITICAL: Never initialize Firebase during server-side rendering or build
  if (typeof window === 'undefined') {
    return null;
  }

  // Return existing app if already initialized
  const existingApps = getApps();
  if (existingApps.length > 0) {
    firebaseApp = existingApps[0];
    return firebaseApp;
  }

  // Get config with guard rails
  const config = getFirebaseConfig();
  if (!config) {
    console.error('FIREBASE INIT SKIPPED: Invalid configuration. Check your environment variables.');
    return null;
  }

  try {
    firebaseApp = initializeApp(config);
    return firebaseApp;
  } catch (error) {
    console.error('FIREBASE INIT ERROR:', error);
    return null;
  }
}
