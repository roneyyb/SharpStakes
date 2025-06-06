import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@/api/user';
import { useTheme } from '@/utils/theme';
import { Profile } from '@/assets/svg';
import StatusBarHoc from '@/hoc/StatusBarHoc';
import StatsDetails from './views/StatsDetails';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import PredictionHistoryList from './views/PredictionHistoryList';

const ProfileScreen = () => {
    const { data: user, isLoading, error } = useUser();

    const { colors } = useTheme();

    if (isLoading) {
        return (
            <View style={[styles.centered, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !user) {
        return (
            <View style={[styles.centered, { backgroundColor: colors.background }]}>
                <Text>Error loading user details.</Text>
            </View>
        );
    }

    return (
        <StatusBarHoc>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={{ alignItems: "center", rowGap: 10 }}>
                    <Profile height='100' width='100' color={colors.text} />
                    <WrappedText text={"@" + user.username} textColor={colors.text} fontFamily={FontsWithWeight.circular_900} fontSize={35} />
                    <WrappedText text={"Balance: " + user.balance} textColor={colors.text} fontFamily={FontsWithWeight.circular_900} fontSize={35} />
                </View>

                <StatsDetails stats={user.stats} />
                <PredictionHistoryList predictions={user.predictions} />
            </View>
        </StatusBarHoc>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "5%",
        rowGap: 30




    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    balance: {
        fontSize: 20,
        marginBottom: 24,
    },
    statsSection: {
        alignItems: 'center',
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default ProfileScreen;