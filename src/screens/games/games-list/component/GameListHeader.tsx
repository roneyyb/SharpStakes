import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import React from 'react';

import { Profile } from '@/assets/svg';
import WrappedText from '@/components/text/WrappedText';
import { useTheme } from '@/utils/theme';

interface GameListHeaderProps {
    onPressProfile: Function

    containerStyle?: ViewStyle

}

const GameListHeader = ({
    onPressProfile,

}: GameListHeaderProps) => {

    const { colors } = useTheme();

    return (
        <View style={[styles.containerStyle]}>
            <Pressable
                style={[styles.backButtonContainer]}

                onPress={() => {
                    onPressProfile()
                }}
                hitSlop={10}
            >
                <Profile />
            </Pressable>
            <View style={{ marginLeft: 10, flex: 1 }}>
                <WrappedText text="Games" textColor={colors.text} fontFamily="CircularStd-Bold" fontSize={24} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backButtonContainer: {
        zIndex: 2,
    },
})

export default GameListHeader
