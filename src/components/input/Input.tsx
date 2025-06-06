import React from 'react'
import { StyleProp, TextInput, TextStyle } from 'react-native'

export interface InputProps {
    value: string;
    Style: StyleProp<TextStyle>;
    onChangeText: (text: string) => void;
    placeholder: string;
    placeholderTextColor: string;
    maxLength: number;
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
}

export default function Input({
    value,
    Style,
    onChangeText,
    placeholder,
    placeholderTextColor,
    maxLength,
    keyboardType
}: InputProps) {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            style={Style}
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            maxLength={maxLength}
        />
    );
}
