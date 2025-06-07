import { Text, View, ActivityIndicator, StyleSheet, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { useUser } from '@/api/user';
import { useTheme } from '@/utils/theme';
import { BackButton, Profile } from '@/assets/svg';
import StatusBarHoc from '@/hoc/StatusBarHoc';
import StatsDetails from './views/StatsDetails';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import PredictionHistoryList from './views/PredictionHistoryList';
import { useUserDetails } from '@/utils/user';
import Animated from 'react-native-reanimated';
import AnimatedEntrance from '@/components/animation/AnimatedEntrance';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
    const { user } = useUserDetails();

    const { colors } = useTheme();


    return (
        <StatusBarHoc>

            <Pressable style={{ marginLeft: "5%", marginBottom: 10 }} onPress={() => { navigation.goBack() }}>
                <BackButton />
            </Pressable>
            <ScrollView style={{ flex: 1, paddingBottom: 40 }}>
                <View style={[styles.container, { backgroundColor: colors.background }]}>
                    <View style={{ alignItems: "center", rowGap: 10 }}>
                        <Profile height='100' width='100' color={colors.text} />
                        <WrappedText text={"@" + user?.username} textColor={colors.text} fontFamily={FontsWithWeight.circular_900} fontSize={35} />
                        <WrappedText text={"Balance: " + user?.balance} textColor={colors.text} fontFamily={FontsWithWeight.circular_900} fontSize={35} />
                    </View>
                    <AnimatedEntrance>      <StatsDetails stats={user?.stats} /></AnimatedEntrance>

                    <AnimatedEntrance delay={100}><PredictionHistoryList predictions={user?.predictions} /></AnimatedEntrance>
                </View>
            </ScrollView>
        </StatusBarHoc >
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