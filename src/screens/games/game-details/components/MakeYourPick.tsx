import React from 'react';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Game } from '@/api/games';
import { useTheme } from '@/utils/theme';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import CircularCheckBox from '@/components/checkbox/CircularCheckBox';
import Input from '@/components/input/Input';
import ButtonPressableWithText from '@/components/button/ButtonPressableWithText';
import { getItems, saveItemKey, StorageKeys } from '@/utils/storage';
import { useSavePrediction } from '@/api/user';
import { Alert } from 'react-native';

interface MakeYourPickProps {
    game: Game;
    onPress?: () => void;
}

const MakeYourPick = ({ game, onPress }: MakeYourPickProps) => {
    const { colors } = useTheme();

    const predictionDetails = getItems<{ gameId: string; amount: string; pick: string }>(
        StorageKeys.userPredictionDetails
    ).find((item) => item.gameId === game.id);

    const preAmount = predictionDetails?.amount || '';
    const prePick = predictionDetails?.pick || '';
    const [selectedPick, setSelectedPick] = React.useState<string>(prePick);
    const [amount, setAmount] = React.useState<string>(preAmount);
    console.log(preAmount, prePick, amount, selectedPick)
    const [loading, setLoading] = React.useState(false);
    const savePredictionMutation = useSavePrediction();
    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.cardBackground,
            padding: 16,
            marginHorizontal: 5,
            borderRadius: 8,
            marginBottom: 16,
            elevation: 10,
            shadowColor: '#ffffff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
        },
        teamContainer: {
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        teamSection: {
            columnGap: 10,
            flexDirection: 'row',
            alignItems: 'center',
        },
        teamName: {
            fontSize: 20,
        },
        amountContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        inputContainer: {
            flex: 1,
            marginLeft: 25,
        },
        input: {
            width: '100%',
            paddingVertical: 16,
            borderRadius: 12,
            paddingHorizontal: 15,
            backgroundColor: '#0000001A',
            shadowColor: '#ffffff',
            shadowOpacity: 0.6,
            shadowRadius: 10,
            elevation: 10,
            color: '#FFFFFF',
            fontSize: 16,
        },
        loadingContainer: {
            width: '100%',
            height: 50,
            borderRadius: 10,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonContainer: {
            width: '100%',
            height: 50,
            borderRadius: 10,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
        },
        spacing: {
            marginTop: 15,
        },
    });

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.container}
        >
            <WrappedText
                text='MAKE YOUR PICK'
                textColor={colors.text}
                fontFamily={FontsWithWeight.circular_900}
                fontSize={18}
                textStyle={{ textAlign: 'center' }}
            />
            <View style={styles.teamContainer}>

                <WrappedText
                    text='SELECT TEAM :'
                    textColor={colors.text}
                    fontFamily={FontsWithWeight.circular_700}
                    fontSize={12}
                    textStyle={{}}

                />
                <View style={{ columnGap: 10, flexDirection: "row", alignItems: "center" }}>
                    <CircularCheckBox
                        onPress={() => { setSelectedPick(selectedPick === game.homeTeam.abbreviation ? '' : game.homeTeam.abbreviation) }}
                        checked={selectedPick === game.homeTeam.abbreviation}
                        size={selectedPick === game.homeTeam.abbreviation ? 40 : 30}
                    />
                    <WrappedText
                        text={game.homeTeam.abbreviation}
                        textColor={colors.text}
                        fontFamily={FontsWithWeight.circular_700}
                        fontSize={20}

                    />

                </View>

                <View style={{ columnGap: 10, flexDirection: "row", alignItems: "center" }}>
                    <CircularCheckBox
                        onPress={() => { setSelectedPick(selectedPick === game.awayTeam.abbreviation ? '' : game.awayTeam.abbreviation) }}
                        checked={selectedPick === game.awayTeam.abbreviation}
                        size={selectedPick === game.awayTeam.abbreviation ? 40 : 30}
                    />
                    <WrappedText
                        text={game.awayTeam.abbreviation}
                        textColor={colors.text}
                        fontFamily={FontsWithWeight.circular_700}
                        fontSize={20}

                    />

                </View>
            </View>
            <View style={styles.spacing} />
            <View style={styles.amountContainer}>
                <WrappedText
                    text='ENTER AMOUNT :'
                    textColor={colors.text}
                    fontFamily={FontsWithWeight.circular_700}
                    fontSize={12}
                    textStyle={{}}

                />
                <View style={styles.inputContainer}>
                    <Input
                        value={amount}
                        Style={styles.input}
                        keyboardType="number-pad"
                        onChangeText={(text) => { setAmount(text) }}
                        placeholder="Enter amount"
                        placeholderTextColor={colors.text + "33"}
                        maxLength={10}
                    />
                </View>
            </View>
            <View style={{ marginTop: 20 }} />
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color={colors.text} />
                </View>
            )}
            {!loading && (+amount !== +preAmount || selectedPick !== prePick) && <ButtonPressableWithText
                textProps={{
                    text: "PLACE PREDICITON",
                    textColor: colors.text,
                    fontFamily: FontsWithWeight.circular_700,
                    fontSize: 16,

                }}
                onPress={async () => {
                    //if (+amount === +preAmount && selectedPick === prePick) return
                    try {
                        setLoading(true);

                        // Save prediction to the server
                        await savePredictionMutation.mutateAsync({
                            gameId: game.id,
                            pick: selectedPick,
                            amount: Number(amount),
                        });

                        // Also save locally for offline access
                        await saveItemKey(StorageKeys.userPredictionDetails, [
                            {
                                gameId: game.id,
                                pick: selectedPick,
                                amount: amount,
                            },
                        ]);

                        Alert.alert('Success', 'Your prediction has been placed successfully!');
                    } catch (error) {
                        console.error('Error saving prediction:', error);
                        Alert.alert('Error', error.message);
                    } finally {
                        setLoading(false);
                    }
                }}
                containerStyle={styles.buttonContainer}
            />}
        </TouchableOpacity>
    );
};




export default MakeYourPick;