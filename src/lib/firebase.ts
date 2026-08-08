import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { SavedPlanRecord, PlanWeek } from './types';

// Default project configuration with fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyParuvaKaala2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "paruvakaala-agri.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "paruvakaala-agri",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "paruvakaala-agri.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475610",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102938475610:web:abc123def456"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Local storage key for offline fallback
const LOCAL_STORAGE_KEY = 'paruvakaala_saved_plans_v1';

/**
 * Sign in anonymously for seamless farmer onboarding
 */
export async function ensureAnonymousAuth(): Promise<User | null> {
  try {
    if (auth.currentUser) return auth.currentUser;
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (err) {
    console.warn('Firebase Auth falling back to guest mode:', err);
    return null;
  }
}

/**
 * Saves a generated 16-week cultivation timeline to Firestore & Local Storage
 */
export async function saveCultivationPlan(
  cropId: string,
  locationName: string,
  lat: number,
  lon: number,
  plan: PlanWeek[]
): Promise<SavedPlanRecord> {
  const user = auth.currentUser;
  const userId = user ? user.uid : 'guest-farmer-' + Math.random().toString(36).substring(2, 9);
  
  const record: SavedPlanRecord = {
    id: 'plan-' + Date.now(),
    userId,
    cropId,
    locationName,
    lat,
    lon,
    createdAt: new Date().toISOString(),
    plan
  };

  // 1. Always save to Local Storage for instant offline PWA access
  try {
    const existingStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    const existing: SavedPlanRecord[] = existingStr ? JSON.parse(existingStr) : [];
    existing.unshift(record);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing.slice(0, 20)));
  } catch (e) {
    console.warn('LocalStorage save warning:', e);
  }

  // 2. Save to Firestore if online
  try {
    const docRef = await addDoc(collection(db, 'cultivation_plans'), record);
    record.id = docRef.id;
  } catch (e) {
    console.warn('Firestore save notice (operating offline):', e);
  }

  return record;
}

/**
 * Fetches saved plans for current user or local storage
 */
export async function fetchSavedPlans(): Promise<SavedPlanRecord[]> {
  const localStr = localStorage.getItem(LOCAL_STORAGE_KEY);
  let localPlans: SavedPlanRecord[] = localStr ? JSON.parse(localStr) : [];

  const user = auth.currentUser;
  if (user) {
    try {
      const q = query(
        collection(db, 'cultivation_plans'),
        where('userId', '==', user.uid)
      );
      const snapshot = await getDocs(q);
      const remotePlans: SavedPlanRecord[] = [];
      snapshot.forEach(docSnap => {
        remotePlans.push({ id: docSnap.id, ...docSnap.data() } as SavedPlanRecord);
      });
      if (remotePlans.length > 0) {
        return remotePlans.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    } catch (e) {
      console.warn('Firestore fetch notice (using cached local plans):', e);
    }
  }

  return localPlans;
}
