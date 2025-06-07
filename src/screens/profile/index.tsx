import { BackButton, Profile } from '@/assets/svg';
import AnimatedEntrance from '@/components/animation/AnimatedEntrance';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import StatusBarHoc from '@/hoc/StatusBarHoc';
import { useTheme } from '@/utils/theme';
import { useUserDetails } from '@/utils/user';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import PredictionHistoryList from './views/PredictionHistoryList';
import StatsDetails from './views/StatsDetails';

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
                    <AnimatedEntrance delay={100}>
                        <View style={{ alignItems: "center", rowGap: 10 }}>
                            <Profile height='120' width='120' color={colors.text} />
                            <WrappedText text={"@" + user?.username} textColor={colors.text} fontFamily={FontsWithWeight.circular_700} fontSize={35} />
                            <WrappedText text={"Balance: " + user?.balance} textColor={colors.text} fontFamily={FontsWithWeight.circular_medium} fontSize={25} />
                        </View>
                    </AnimatedEntrance>
                    <AnimatedEntrance delay={200}>      <StatsDetails stats={user?.stats} /></AnimatedEntrance>

                    <AnimatedEntrance delay={300}><PredictionHistoryList predictions={user?.predictions} /></AnimatedEntrance>
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