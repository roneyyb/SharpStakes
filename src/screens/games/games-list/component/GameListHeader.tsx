import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import React from 'react';

import { Profile } from '@/assets/svg';
import WrappedText from '@/components/text/WrappedText';
import { useTheme } from '@/utils/theme';
import { useUserDetails } from '@/utils/user';

interface GameListHeaderStyles {
    container: ViewStyle;
    backButtonContainer: ViewStyle;
    titleContainer: ViewStyle;
    balanceButton: ViewStyle;
}

interface GameListHeaderProps {
    onPressProfile: () => void;
    containerStyle?: ViewStyle;
}

const GameListHeader = ({
    onPressProfile,
    containerStyle,
}: GameListHeaderProps) => {
    const { colors } = useTheme();
    const { user } = useUserDetails();

    const styles = StyleSheet.create<GameListHeaderStyles>({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            ...containerStyle,
        },
        backButtonContainer: {
            zIndex: 2,
        },
        titleContainer: {
            marginLeft: 10,
            flex: 1,
        },
        balanceButton: {
            boxShadow: '0 2px 4px #ffffff66',
            elevation: 10,
            backgroundColor: colors.cardBackground,
            paddingVertical: 5,
            borderRadius: 10,
            paddingHorizontal: 20,
        },
    });

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.backButtonContainer}
                onPress={onPressProfile}
                hitSlop={10}
            >
                <Profile />
            </Pressable>
            <View style={styles.titleContainer}>
                <WrappedText
                    text="Games"
                    textColor={colors.text}
                    fontFamily="CircularStd-Bold"
                    fontSize={18}
                />
            </View>
            <Pressable
                onPress={onPressProfile}
                style={styles.balanceButton}>
                <WrappedText
                    text={`Bal: ${user?.balance?.toString() || '0'}`}
                    textColor={colors.text}
                    fontFamily="CircularStd-Bold"
                    fontSize={18}
                />
            </Pressable>
        </View>
    );
}



export default GameListHeader
