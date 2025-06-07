import React from 'react';
import { FlatList } from 'react-native';
import GameListCard from '@/screens/games/games-list/component/GameListCard';
import { Game } from '@/api/games';
import AnimatedEntrance from '@/components/animation/AnimatedEntrance';

interface GameFlatListProps {
    games: Game[];
    onPress?: (game: Game) => void;
}

const GameFlatList = ({ games, onPress }: GameFlatListProps) => {
    return (
        <FlatList
            data={games}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => <AnimatedEntrance delay={index * 100}><GameListCard game={item} onPress={onPress ? () => onPress(item) : undefined} /></AnimatedEntrance>}
        />
    );
};

export default GameFlatList