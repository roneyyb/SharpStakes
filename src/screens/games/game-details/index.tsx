import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGame } from '@/api/games';
import { useTheme } from '@/utils/theme';
import StatusBarHoc from '@/hoc/StatusBarHoc';
import HeaderWithBackTitleAndRightComponent from '@/components/header/HeaderWithBackButtonAndText';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import GameOdsCard from './components/GameOds';
import GameSchedule from './components/GameSchedule';
import GameListCard from '../games-list/component/GameListCard';

type RouteParams = { id: string };

const GameDetailsScreen = ({ navigation }: { navigation: any }) => {
    const route = useRoute();
    // @ts-ignore
    const { id } = route.params as RouteParams;
    const { data: game, isLoading, error } = useGame(id);
    const { colors } = useTheme()

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !game) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <Text>Error loading game details.</Text>
            </View>
        );
    }



    return (
        <StatusBarHoc>
            <View style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: "5%", rowGap: 0 }}>
                <HeaderWithBackTitleAndRightComponent
                    onPressBack={() => {
                        navigation.goBack();
                    }}
                    titleProps={{
                        text: "Game Details",
                        fontSize: 24,
                        textColor: colors.text,
                        fontFamily: 'CircularStd-Bold',
                        textStyle: { marginLeft: 10 }
                    }}
                    containerStyle={{ marginHorizontal: "1%" }}
                />
                <View style={{ marginTop: 30 }} />
                <GameListCard game={game} />
                <GameSchedule game={game} />
                {game.odds && <GameOdsCard game={game} />}
            </View>
        </StatusBarHoc>
    );
};

export default GameDetailsScreen;