"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Player = { name: string; alliance: string } | null;

type PlayerContextValue = {
  player: Player;
  login: (name: string, alliance: string) => void;
  logout: () => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

const STORAGE_KEY = "k1330-player";

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<Player>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { name?: string; alliance?: string };
        if (parsed && typeof parsed.name === "string" && parsed.name.trim()) {
          setPlayer({
            name: parsed.name.slice(0, 80),
            alliance: typeof parsed.alliance === "string" ? parsed.alliance : "",
          });
        }
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const login = useCallback((name: string, alliance: string) => {
    const clean: Player = {
      name: name.trim().slice(0, 80),
      alliance: alliance.trim().slice(0, 80),
    };
    setPlayer(clean);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const logout = useCallback(() => {
    setPlayer(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<PlayerContextValue>(
    () => ({ player, login, logout }),
    [player, login, logout],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer must be used inside a PlayerProvider");
  }
  return ctx;
}
