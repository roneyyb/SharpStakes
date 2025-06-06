import React from 'react';
import { FlatList, View } from 'react-native';
import PredictedGameDetailCard from '../components/PredictedGameDetailCard';
import WrappedText from '@/components/text/WrappedText';
import { useTheme } from '@/utils/theme';
import { FontsWithWeight } from '@/components/text/WrappedText';

const PredictionHistoryList = ({ predictions }: { predictions: any }) => {
    const { colors } = useTheme();
    return (
        <View style={{}}>
            <WrappedText text='Prediction History' textStyle={{ textTransform: "uppercase" }} textColor={colors.text} fontFamily={FontsWithWeight.circular_900} fontSize={25} />
            <FlatList
                data={predictions}
                renderItem={({ item }) => <PredictedGameDetailCard prediction={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default PredictionHistoryList;