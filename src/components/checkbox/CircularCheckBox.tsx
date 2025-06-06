import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '@/utils/theme';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText'

interface CircularCheckBoxProps {
    onPress?: () => void;
    checked?: boolean;
    size?: number
}

const CircularCheckBox = ({ onPress, checked, size = 40 }: CircularCheckBoxProps) => {
    const { colors } = useTheme();
    return (
        <Pressable onPress={() => { onPress() }} style={{ width: size, aspectRatio: 1, borderRadius: size, padding: size * 0.2, backgroundColor: colors.background, elevation: 10 }}>
            {checked && <View style={{ width: "100%", aspectRatio: 1, borderRadius: size, backgroundColor: "#0000001A", boxShadow: '0 1px 10px #ffffff99', elevation: 10 }} />}
        </Pressable>
    );
};

export default CircularCheckBox;