import { useGame } from '@/api/games';
import AnimatedEntrance from '@/components/animation/AnimatedEntrance';
import HeaderWithBackTitleAndRightComponent from '@/components/header/HeaderWithBackButtonAndText';
import StatusBarHoc from '@/hoc/StatusBarHoc';
import { useTheme } from '@/utils/theme';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import GameListCard from '../games-list/component/GameListCard';
import GameOdsCard from './components/GameOds';
import GameSchedule from './components/GameSchedule';
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
                <View style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: '5%' }}>
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

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ marginTop: 30 }} />
                        <AnimatedEntrance >
                            <GameListCard game={game} />
                        </AnimatedEntrance>
                        {game.status !== "final" && <AnimatedEntrance delay={50}> <GameSchedule game={game} />   </AnimatedEntrance>}
                        {game.odds && <AnimatedEntrance delay={100}><GameOdsCard game={game} /></AnimatedEntrance>}
                        {game.status == "inProgress" && <AnimatedEntrance delay={200}><MakeYourPick game={game} /></AnimatedEntrance>}
                    </ScrollView>

                </View>
            </KeyboardAvoidingView>
        </StatusBarHoc>
    );
};

export default GameDetailsScreen;