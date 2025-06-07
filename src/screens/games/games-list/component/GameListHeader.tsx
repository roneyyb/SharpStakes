import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import React from 'react';

import { Profile } from '@/assets/svg';
import WrappedText from '@/components/text/WrappedText';
import { useTheme } from '@/utils/theme';
import { useUserDetails } from '@/utils/user';

interface GameListHeaderProps {
    onPressProfile: Function

    containerStyle?: ViewStyle

}

const GameListHeader = ({
    onPressProfile,

}: GameListHeaderProps) => {

    const { colors } = useTheme();
    const { user } = useUserDetails()

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
                <WrappedText text={"Games"} textColor={colors.text} fontFamily="CircularStd-Bold" fontSize={18} />
            </View>
            <Pressable onPress={() => {
                onPressProfile()
            }} style={{ boxShadow: '0 2px 4px #ffffff66', elevation: 10, backgroundColor: colors.cardBackground, paddingVertical: 5, borderRadius: 10, paddingHorizontal: 20 }}>
                <WrappedText text={'Bal: ' + (user?.balance?.toString() || "0")} textColor={colors.text} fontFamily="CircularStd-Bold" fontSize={18} textStyle={{}} />
            </Pressable>
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
