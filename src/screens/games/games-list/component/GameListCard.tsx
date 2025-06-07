import { Game } from '@/api/games';
import ButtonPressableWithText from '@/components/button/ButtonPressableWithText';
import DotBlinking from '@/components/dot/DotBlinking';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import { useGameScorePolling } from '@/hook/useGameScorePolling';
import { useTheme } from '@/utils/theme';
import moment from 'moment';
import React, { useCallback } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps,
} from 'react-native';
import TeamInfo from './TeamInfo';


interface GameListCardProps extends TouchableOpacityProps {
    game: Game;
    onPress?: () => void;
    showButton?: boolean;
    showFullName?: boolean;
}

interface GameListCardStyles {
    card: ViewStyle;
    liveScoreContainer: ViewStyle;
    liveScoreContent: ViewStyle;
    teamsContainer: ViewStyle;
    teamsContent: ViewStyle;
    button: ViewStyle;
    gameStatusText: TextStyle;
    vsText: TextStyle;
}

const GameListCard: React.FC<GameListCardProps> = ({ 
    game: initialGame, 
    onPress, 
    showButton, 
    showFullName: _showFullName,
    style,
    ...rest 
}) => {
    const { colors } = useTheme();
    const { game } = useGameScorePolling(initialGame);

    const styles = StyleSheet.create<GameListCardStyles>({
        card: {
            backgroundColor: colors.cardBackground,
            padding: 20,
            marginHorizontal: 5,
            borderRadius: 8,
            marginBottom: 16,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 10,
        },
        liveScoreContainer: {
            paddingBottom: 10,
        },
        liveScoreContent: {
            flexDirection: 'row',
            columnGap: 10,
            alignItems: 'center',
        },
        teamsContainer: {
            marginVertical: 10,
        },
        teamsContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        vsText: {
            color: colors.text,
            fontFamily: FontsWithWeight.circular_450,
            fontSize: 20,
        },
        gameStatusText: {
            textTransform: 'uppercase',
            marginBottom: 10,
            color: colors.accent,
            fontFamily: FontsWithWeight.circular_700,
        },
        button: {
            width: '100%',
            marginTop: 20,
            height: 50,
            borderRadius: 10,
            borderColor: colors.accent,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    const renderGameStatus = useCallback(() => {
        if (game.status === 'inProgress') {
            return null;
        }
        const statusText = game.status === 'scheduled'
            ? `Game scheduled at ${moment(game.startTime).format('ddd, MMM D, YYYY [at] h:mm A')}`
            : game.status === 'final'
                ? `${game.winner} won the game`
                : '';

        return (
            <WrappedText
                text={statusText}
                textStyle={styles.gameStatusText}
                fontSize={game.status === 'scheduled' ? 10 : 12}
            />
        );
    }, [game.status, game.startTime, game.winner, styles.gameStatusText]);

    const renderButton = useCallback(() => {
        if ((game.status !== 'inProgress' && game.status !== 'scheduled') || !showButton || !onPress) {
            return null;
        }

        const buttonText = game.status === 'inProgress' ? 'MAKE PREDICTION' : 'CHECK DETAILS';
        
        return (
            <ButtonPressableWithText
                textProps={{
                    text: buttonText,
                    textColor: colors.text,
                    fontFamily: FontsWithWeight.circular_700,
                    fontSize: 16,
                }}
                onPress={onPress}
                containerStyle={styles.button}
            />
        );
    }, [game.status, showButton, onPress, colors.text, styles.button]);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.card, style]}
            {...rest}
        >
            {game.status === 'inProgress' && (
                <View style={styles.liveScoreContainer}>
                    <View style={styles.liveScoreContent}>
                        <DotBlinking color={colors.accent} />
                        <WrappedText
                            text="Live Score"
                            fontSize={12}
                            textColor={colors.text}
                        />
                    </View>
                </View>
            )}

            {renderGameStatus()}

            <View style={styles.teamsContainer}>
                <View style={styles.teamsContent}>
                    <TeamInfo
                        team={{
                            abbreviation: game.homeTeam.abbreviation,
                            score: game.homeTeam.score,
                            record: game.homeTeam.record,
                        }}
                        textColor={colors.text}
                    />
                    <WrappedText
                        text="VS"
                        textStyle={styles.vsText}
                    />
                    <TeamInfo
                        team={{
                            abbreviation: game.awayTeam.abbreviation,
                            score: game.awayTeam.score,
                            record: game.awayTeam.record,
                        }}
                        textColor={colors.text}
                    />
                </View>
            </View>

            {renderButton()}
        </TouchableOpacity>
    );
};


export default React.memo(GameListCard);

