import { useGame } from '@/api/games';
import AnimatedEntrance from '@/components/animation/AnimatedEntrance';
import HeaderWithBackTitleAndRightComponent from '@/components/header/HeaderWithBackButtonAndText';
import StatusBarHoc from '@/hoc/StatusBarHoc';
import { useTheme } from '@/utils/theme';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import GameListCard from '../games-list/component/GameListCard';
import GameOdsCard from './components/GameOds';
import GameSchedule from './components/GameSchedule';
import MakeYourPick from './components/MakeYourPick';

interface GameDetailsStyles {
    container: ViewStyle;
    loadingContainer: ViewStyle;
    errorContainer: ViewStyle;
    contentContainer: ViewStyle;
    scrollView: ViewStyle;
    headerContainer: ViewStyle;
    headerTitle: TextStyle;
    gameCardContainer: ViewStyle;
}

type RouteParams = { id: string };

const GameDetailsScreen = ({ navigation }: { navigation: any }) => {
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const { data: game, isLoading, error } = useGame(id);
    const { colors } = useTheme();

    const styles = StyleSheet.create<GameDetailsStyles>({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
        },
        errorContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
        },
        contentContainer: {
            flex: 1,
            paddingHorizontal: '5%',
        },
        scrollView: {
            flex: 1,
        },
        headerContainer: {
            marginHorizontal: '1%',
        },
        headerTitle: {
            marginLeft: 10,
        },
        gameCardContainer: {
            marginTop: 30,
        },
    });

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !game) {
        return (
            <View style={styles.errorContainer}>
                <Text>Error loading game details.</Text>
            </View>
        );
    }



    return (
        <StatusBarHoc>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 2 : 0}
            >
                <View style={styles.contentContainer}>
                    <HeaderWithBackTitleAndRightComponent
                        onPressBack={() => navigation.goBack()}
                        titleProps={{
                            text: 'Game Details',
                            fontSize: 24,
                            textColor: colors.text,
                            fontFamily: 'CircularStd-Bold',
                            textStyle: styles.headerTitle,
                        }}
                        containerStyle={styles.headerContainer}
                    />

                    <ScrollView style={styles.scrollView}>
                        <View style={styles.gameCardContainer} />
                        <AnimatedEntrance>
                            <GameListCard game={game} />
                        </AnimatedEntrance>
                        {game.status !== 'final' && (
                            <AnimatedEntrance delay={50}>
                                <GameSchedule game={game} />
                            </AnimatedEntrance>
                        )}
                        {game.odds && (
                            <AnimatedEntrance delay={100}>
                                <GameOdsCard game={game} />
                            </AnimatedEntrance>
                        )}
                        {game.status === 'inProgress' && (
                            <AnimatedEntrance delay={200}>
                                <MakeYourPick game={game} />
                            </AnimatedEntrance>
                        )}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </StatusBarHoc>
    );
};

export default GameDetailsScreen;