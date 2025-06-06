import React from 'react';
import { FlatList } from 'react-native';
import GameListCard from '@/screens/games/component/GameListCard';
import { Game } from '@/api/games';

interface GameFlatListProps {
    games: Game[];
    onPress?: (game: Game) => void;
}

const GameFlatList = ({ games, onPress }: GameFlatListProps) => {
    return (
        <FlatList
            data={games}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <GameListCard game={item} onPress={onPress ? () => onPress(item) : undefined} />}
        />
    );
};

export default GameFlatList