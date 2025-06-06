import { useQuery } from 'react-query';
import api from '@/utils/axios';

// TypeScript types for user details based on mock-data.json
export interface UserPrediction {
  gameId: string;
  pick: string;
  amount: number;
  result: string;
  payout?: number;
}

export interface UserStats {
  wins: number;
  losses: number;
  pending: number;
}

export interface User {
  id: string;
  username: string;
  balance: number;
  predictions: UserPrediction[];
  stats: UserStats;
}

// Fetch user detailsexport const fetchUser = async (): Promise<User> => {
  const response = await api.get<User>('/user');
  return response.data;
};

// React Query hook
export const useUser = () => useQuery<User>('user', fetchUser);
