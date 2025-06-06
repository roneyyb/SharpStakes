import React from 'react';
import { Text, View, ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGame } from '@/api/games';
import { useTheme } from '@/utils/theme';
import StatusBarHoc from '@/hoc/StatusBarHoc';
import HeaderWithBackTitleAndRightComponent from '@/components/header/HeaderWithBackButtonAndText';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import GameOdsCard from './components/GameOds';
import GameSchedule from './components/GameSchedule';
import GameListCard from '../games-list/component/GameListCard';
import MakeYourPick from './components/MakeYourPick';

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
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 2 : 0} // Adjust as needed for your header
            >
                <View style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: "5%", rowGap: 0 }}>
                    <ScrollView style={{ flex: 1 }}>
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
                        {game.status !== "final" && <GameSchedule game={game} />}
                        {game.odds && <GameOdsCard game={game} />}
                        {game.status == "inProgress" && <MakeYourPick game={game} />}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </StatusBarHoc>
    );
};

export default GameDetailsScreen;