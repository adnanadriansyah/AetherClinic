import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabase';
import * as service from '../lib/supabaseService';

const SupabaseContext = createContext();

export function SupabaseProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connected = isSupabaseConnected();
    setConnected(connected);

    if (connected) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id);
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
      });

      return () => subscription?.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    setProfile(data);
  };

  const signUp = useCallback(async (email, password, profileData) => {
    const data = await service.signUp(email, password, profileData);
    return data;
  }, []);

  const signIn = useCallback(async (email, password) => {
    const data = await service.signIn(email, password);
    return data;
  }, []);

  const signOut = useCallback(async () => {
    await service.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  const value = {
    user,
    profile,
    loading,
    connected,
    supabase,
    signUp,
    signIn,
    signOut,
    ...service,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const ctx = useContext(SupabaseContext);
  if (!ctx) throw new Error('useSupabase must be used within SupabaseProvider');
  return ctx;
};
