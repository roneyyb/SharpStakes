import React from 'react'
import { Pressable, ViewStyle } from 'react-native'
import WrappedText, { WrappedTextProps } from '../text/WrappedText'


interface ButtonPressableWithTextWrapper {
    onPress: Function
    containerStyle: ViewStyle

    textProps: WrappedTextProps
    colors?: any

}


const ButtonPressableWithText = ({ onPress, containerStyle, textProps, colors }: ButtonPressableWithTextWrapper) => {

    return (
        <Pressable
            style={[containerStyle]}
            onPress={() => {
                onPress()
            }}>

            <WrappedText {...textProps} />

        </Pressable>
    )
}

export default ButtonPressableWithText