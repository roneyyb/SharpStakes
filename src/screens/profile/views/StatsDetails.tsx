import { useTheme } from '@/utils/theme';
import React from 'react';
import { View } from 'react-native';
import SingleStateDetail from '../components/SingleStateDetail';

const StatsDetails = ({ stats }: { stats: any }) => {
    const { colors } = useTheme()
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.cardBackground, padding: 20, marginHorizontal: 5, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 4px #ffffff66', elevation: 10 }}
        >
            <SingleStateDetail statValue={stats.wins} color={colors.win} statName="Wins" />
            <SingleStateDetail statValue={stats.losses} color={colors.loss} statName="Losses" />
            <SingleStateDetail statValue={stats.pending} color={colors.pending} statName="Pending" />
        </View>
    );
};

export default StatsDetails;