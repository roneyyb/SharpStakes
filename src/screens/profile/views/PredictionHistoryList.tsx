import React from 'react';
import { FlatList, View } from 'react-native';
import PredictedGameDetailCard from '../components/PredictedGameDetailCard';
import WrappedText from '@/components/text/WrappedText';
import { useTheme } from '@/utils/theme';
import { FontsWithWeight } from '@/components/text/WrappedText';
import AnimatedEntrance from '@/components/animation/AnimatedEntrance';

const PredictionHistoryList = ({ predictions }: { predictions: any }) => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <WrappedText
                text='Prediction History'
                textStyle={{ textTransform: "uppercase" }}
                textColor={colors.text}
                fontFamily={FontsWithWeight.circular_700}
                fontSize={25}
            />
            <View style={{ marginTop: 10 }} />
            {predictions.map((item: any, index: number) => <AnimatedEntrance delay={index * 100} key={item.id}><PredictedGameDetailCard prediction={item} /></AnimatedEntrance>)}
        </View>
    );
};

export default PredictionHistoryList;