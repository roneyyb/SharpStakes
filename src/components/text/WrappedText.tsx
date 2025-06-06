import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

export enum fontFamilyTypes {
    BarlowCondensed700 = 'BarlowCondensed-Bold',
    CircularBookItalic = 'CircularStd-BookItalic',
    // Similarly define others
}

export const FontsWithWeight = {

    circular_900: 'CircularStd-Black',

    circular_700: 'CircularStd-Bold',
    circular_450: 'CircularStd-Book',
    circular_medium: 'CircularStd-Medium',

}

export interface WrappedTextProps {
    text: string
    fontSize?: number,
    numberOfLines?: number,
    ellipsizeMode?: "head" | "middle" | "tail" | "clip" | undefined,
    fontFamily?: string
    textStyle?: StyleProp<TextStyle>
    textColor?: string
    lineHeight?: number
    fontStyle?: 'normal' | 'italic' | undefined
}

export default function WrappedText({
    text,
    fontSize,
    fontFamily,
    textStyle,
    textColor,
    lineHeight,
    fontStyle,
    numberOfLines,
    ellipsizeMode
}: WrappedTextProps) {
    return (
        <Text
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
            style={[
                {
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    color: textColor,
                    lineHeight,
                    fontStyle: fontStyle,

                },
                textStyle,
            ]}
        >
            {text}
        </Text>
    )
}
