// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return { user };
}
import { supabase } from '../lib/supabaseClient';
