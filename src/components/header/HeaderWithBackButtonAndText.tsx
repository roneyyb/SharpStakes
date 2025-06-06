import { View, StyleSheet, Pressable, ViewStyle } from 'react-native'
import React from 'react'
import WrappedText, { WrappedTextProps } from '../text/WrappedText'
import { BackButton } from '@/assets/svg';

interface HeaderWithBackTitleAndRightComponentProps {
    onPressBack: Function
    titleProps: WrappedTextProps
    rightComponent?: React.ReactNode
    containerStyle?: ViewStyle
    backContainerStyle?: ViewStyle
}

const HeaderWithBackTitleAndRightComponent = ({
    onPressBack,
    titleProps,
    rightComponent,
    containerStyle,
    backContainerStyle
}: HeaderWithBackTitleAndRightComponentProps) => {

    return (
        <View style={[styles.containerStyle, containerStyle]}>
            <Pressable
                style={[styles.backButtonContainer, backContainerStyle]}

                onPress={() => {
                    onPressBack()
                }}
                hitSlop={10}
            >
                <BackButton />
            </Pressable>
            <View style={{ marginLeft: 10, flex: 1 }}>
                <WrappedText {...titleProps} />
            </View>
            {rightComponent && rightComponent}
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

export default HeaderWithBackTitleAndRightComponent
