import React from 'react';
import { FlatList } from 'react-native';
import GameListCard from '@/screens/games/component/GameListCard';
import { Game } from '@/api/games';

const GameFlatList = ({ games }: { games: Game[] }) => {
    return (
        <FlatList
            data={games}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <GameListCard game={item} />}
        />
    );
};

export default GameFlatList