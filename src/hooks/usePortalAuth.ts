import { useState, useCallback, useEffect } from 'react';

export interface PortalUser {
  id: number;
  email: string;
  name: string;
  role: 'clinician' | 'consumer';
}

interface AuthState {
  user: PortalUser | null;
  token: string | null;
  loading: boolean;
}

const STORAGE_KEY = 'portal_session';

function loadStoredSession(): { user: PortalUser; token: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { user: PortalUser; token: string };
  } catch {
    return null;
  }
}

function storeSession(user: PortalUser, token: string) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function usePortalAuth(expectedRole: 'clinician' | 'consumer') {
  const [state, setState] = useState<AuthState>(() => {
    const stored = loadStoredSession();
    if (stored && stored.user.role === expectedRole) {
      return { user: stored.user, token: stored.token, loading: false };
    }
    return { user: null, token: null, loading: false };
  });

  // Verify stored session is still valid on mount
  useEffect(() => {
    const stored = loadStoredSession();
    if (!stored || stored.user.role !== expectedRole) return;

    fetch('/api/portal/auth/me', {
      headers: { Authorization: `Bearer ${stored.token}` },
    })
      .then(r => {
        if (!r.ok) {
          clearSession();
          setState({ user: null, token: null, loading: false });
        }
      })
      .catch(() => {
        clearSession();
        setState({ user: null, token: null, loading: false });
      });
  }, [expectedRole]);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const r = await fetch('/api/portal/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role: expectedRole }),
      });
      const data = (await r.json()) as { token?: string; user?: PortalUser; error?: string };
      if (!r.ok) throw new Error(data.error ?? 'Registration failed');
      storeSession(data.user!, data.token!);
      setState({ user: data.user!, token: data.token!, loading: false });
    },
    [expectedRole],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const r = await fetch('/api/portal/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: expectedRole }),
      });
      const data = (await r.json()) as { token?: string; user?: PortalUser; error?: string };
      if (!r.ok) throw new Error(data.error ?? 'Login failed');
      storeSession(data.user!, data.token!);
      setState({ user: data.user!, token: data.token!, loading: false });
    },
    [expectedRole],
  );

  const logout = useCallback(async () => {
    if (state.token) {
      await fetch('/api/portal/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${state.token}` },
      }).catch(() => {});
    }
    clearSession();
    setState({ user: null, token: null, loading: false });
  }, [state.token]);

  return { ...state, register, login, logout };
}
