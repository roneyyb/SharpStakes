// src/hooks/useGameScorePolling.ts
import { useState, useEffect, useCallback } from 'react';
import { Game } from '@/api/games';
import { updateGameScores } from '@/api/score';

export function useGameScorePolling(initialGame: Game) {
    const [game, setGame] = useState<Game>(initialGame);
    const [isPolling, setIsPolling] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchGameScore = useCallback(async () => {
        try {
            setIsLoading(true);
            const updatedGame = await updateGameScores(game.id);
            if (updatedGame) {
                setGame(updatedGame);
                // Stop polling if game is no longer in progress
                if (updatedGame.status !== 'inProgress') {
                    setIsPolling(false);
                }
            }
        } catch (error) {
            console.error('Error updating game score:', error);
        } finally {
            setIsLoading(false);
        }
    }, [game.id]);

    useEffect(() => {
        // Only poll for in-progress games
        if (game.status !== 'inProgress') {
            setIsPolling(false);
            return;
        }

        setIsPolling(true);
        let intervalId: NodeJS.Timeout;

        if (isPolling) {
            // Initial fetch
            fetchGameScore();

            // Set up polling every 10 seconds
            intervalId = setInterval(fetchGameScore, 10000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [game.status, fetchGameScore, isPolling]);

    return { game, isLoading };
}