// src/api/score.ts
import { Game } from './games';
import api from '@/utils/axios';  // Import the configured axios instance

export async function updateGameScores(gameId: string): Promise<Game | null> {
    try {
        const response = await api.get<Game>(`/games/${gameId}`);
        return response.data;
    } catch (error) {
        console.error(`Error updating scores for game ${gameId}:`, error);
        return null;
    }
}