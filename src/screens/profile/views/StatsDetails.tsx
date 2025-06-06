import { useTheme } from '@/utils/theme';
import React from 'react';
import { View } from 'react-native';
import SingleStateDetail from '../components/SingleStateDetail';

const StatsDetails = ({ stats }: { stats: any }) => {
    const { colors } = useTheme()
    return (
        <View style={{ backgroundColor: colors.cardBackground, padding: 20, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <SingleStateDetail statValue={stats.wins} color={colors.win} statName="Wins" />
            <SingleStateDetail statValue={stats.losses} color={colors.loss} statName="Losses" />
            <SingleStateDetail statValue={stats.pending} color={colors.pending} statName="Pending" />
        </View>
    );
};

export default StatsDetails;