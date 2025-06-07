import { useQuery, useMutation, useQueryClient } from 'react-query';
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

// Fetch user details
export const fetchUser = async (): Promise<User> => {
    const response = await api.get<User>('/user');

    console.log(response.data, "user")
    return response.data;
};

// Save a new prediction
export interface SavePredictionParams {
    gameId: string;
    pick: string;
    amount: number;
}

export const savePrediction = async (params: SavePredictionParams): Promise<User> => {
    // First, get the current user data
    const currentUser = await fetchUser();

    // Create the new prediction
    const newPrediction = {
        gameId: params.gameId,
        pick: params.pick,
        amount: params.amount,
        result: 'pending',
    };

    if (currentUser.balance < params.amount) {
        throw new Error("Insufficient balance");
    }

    // Update the user with the new prediction
    const response = await api.patch<User>('/user', {
        predictions: [
            ...currentUser.predictions,
            newPrediction,
        ],
        username: currentUser.username,
        balance: currentUser.balance - params.amount, // Deduct the bet amount
        stats: {
            ...currentUser.stats,
            pending: currentUser.stats.pending + 1,
        },
    });

    return response.data;
};

// React Query hook
export const useUser = () => useQuery<User>('user', fetchUser, {
    // Prevent refetching on window focus to avoid race conditions
    refetchOnWindowFocus: false,
    cacheTime: 0
});

// Mutation hook for saving predictions
export const useSavePrediction = () => {
    const queryClient = useQueryClient();

    return useMutation(
        (params: SavePredictionParams) => savePrediction(params),
        {
            onSuccess: () => {
                // Invalidate and refetch user data after successful prediction
                queryClient.invalidateQueries('user');
            },
        }
    );
};
