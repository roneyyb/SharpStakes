// src/api/games.ts
import { useQuery } from 'react-query';
import api from '@/utils/axios';

// TypeScript types for game list and game data
export interface Team {
  name: string;
  abbreviation: string;
  record: string;
  score?: number;
}

export interface Odds {
  spread: string;
  favorite: string;
}

export interface Game {
  id: string;
  status: 'scheduled' | 'inProgress' | 'final';
  startTime?: string;
  period?: string;
  clock?: string;
  homeTeam: Team;
  awayTeam: Team;
  odds: Odds;
  winner?: string;
}

// Fetch all games
export const fetchGames = async (): Promise<Game[]> => {
    const response = await api.get<Game[]>('/games');
    return response.data;
};

// Fetch a single game by ID
export const fetchGameById = async (id: string): Promise<Game> => {
    const response = await api.get<Game>(`/games/${id}`);
    return response.data;
};

// React Query hooks
export const useGames = () => useQuery<Game[]>('games', fetchGames);
export const useGame = (id: string) => useQuery<Game>(['game', id], () => fetchGameById(id));

// Export types for use elsewhere
export type { Game };
