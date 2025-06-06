import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import { useTheme } from '@/utils/theme';
import React from 'react';
import { View } from 'react-native';

const SingleStateDetail = ({ statValue, statName, color }: { statValue: number, statName: string, color: string }) => {
    const { colors } = useTheme()
    return (
        <View style={{ alignItems: "center", rowGap: 10 }}>
            <WrappedText text={statValue.toString()} textColor={color} fontFamily={FontsWithWeight.circular_700} fontSize={20} />
            <WrappedText text={statName} textColor={colors.text} fontFamily={FontsWithWeight.circular_700} fontSize={20} />

        </View>
    );
};

export default SingleStateDetail;