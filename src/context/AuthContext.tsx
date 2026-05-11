import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  isAdmin: boolean;
  loginAsGuest: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  loginAsGuest: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Load guest session from localStorage if exists
  useEffect(() => {
    const guestUser = localStorage.getItem('campus_guest_user');
    if (guestUser) {
      const data = JSON.parse(guestUser);
      setUser({ uid: 'guest', email: 'guest@vault.edu' } as any);
      setProfile(data);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // If we already have a guest user, don't let firebase state override it unless we intentionally logout
      if (localStorage.getItem('campus_guest_user')) {
        setLoading(false);
        return;
      }

      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginAsGuest = () => {
    const mockProfile = {
      uid: 'guest',
      name: 'Guest Researcher',
      email: 'guest@vault.edu',
      department: 'GENERAL',
      semester: 'N/A',
      role: 'student',
      isGuest: true
    };
    localStorage.setItem('campus_guest_user', JSON.stringify(mockProfile));
    setUser({ uid: 'guest', email: 'guest@vault.edu' } as any);
    setProfile(mockProfile);
  };

  const logout = async () => {
    localStorage.removeItem('campus_guest_user');
    await auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
    loginAsGuest,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
