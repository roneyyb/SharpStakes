import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Game } from '@/api/games';
import { useTheme } from '@/utils/theme';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import CircularCheckBox from '@/components/checkbox/CircularCheckBox';
import Input from '@/components/input/Input';
import ButtonPressableWithText from '@/components/button/ButtonPressableWithText';
import { addItem, deleteItem, getItems, removeItemKey, saveItemKey, StorageKeys } from '@/utils/storage';

interface MakeYourPickProps {
    game: Game;
    onPress?: () => void;
}

const MakeYourPick = ({ game, onPress }: MakeYourPickProps) => {
    const { colors } = useTheme();

    const predictionDetails = getItems(StorageKeys.userPredictionDetails).find((item: any) => item.gameId === game.id);

    const preAmount = predictionDetails?.amount || "";
    const prePick = predictionDetails?.pick || ""
    const [selectedPick, setSelectedPick] = React.useState<string>(prePick);
    const [amount, setAmount] = React.useState<string>(preAmount);
    console.log(preAmount, prePick, amount, selectedPick)
    const [loading, setLoading] = React.useState(false);
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{ backgroundColor: colors.cardBackground, padding: 16, marginHorizontal: 5, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 4px #ffffff66', elevation: 10 }}
        >
            <WrappedText
                text='MAKE YOUR PICK'
                textColor={colors.text}
                fontFamily={FontsWithWeight.circular_900}
                fontSize={18}
                textStyle={{ textAlign: "center" }}

            />
            <View style={{ marginTop: 30, flexDirection: "row", alignItems: "center", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>

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
            <View style={{ marginTop: 15 }} />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <WrappedText
                    text='ENTER AMOUNT :'
                    textColor={colors.text}
                    fontFamily={FontsWithWeight.circular_700}
                    fontSize={12}
                    textStyle={{}}

                />
                <View style={{ flex: 1, marginLeft: 25 }}>
                    <Input
                        value={amount}
                        Style={{

                            width: "100%",
                            paddingVertical: 16,
                            borderRadius: 12,
                            paddingHorizontal: 15,
                            backgroundColor: '#0000001A',
                            boxShadow: '0 1px 10px #ffffff99',
                            elevation: 10,
                            color: "#FFFFFF",
                            fontSize: 16,

                        }}
                        keyboardType="number-pad"
                        onChangeText={(text) => { setAmount(text) }}
                        placeholder="Enter amount"
                        placeholderTextColor={colors.text + "33"}
                        maxLength={10}
                    />
                </View>
            </View>
            <View style={{ marginTop: 20 }} />
            {loading && <View style={{
                width: "100%",
                height: 50, borderRadius: 10, backgroundColor: colors.accent, alignItems: "center", justifyContent: "center"
            }}>
                <ActivityIndicator color={colors.text} /></View>}
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

                        await saveItemKey(StorageKeys.userPredictionDetails, [{ gameId: game.id, pick: selectedPick, amount: amount }]);
                        setTimeout(() => { setLoading(false) }, 500)

                    } catch (error) {
                        console.log("error", error)
                        setTimeout(() => { setLoading(false) }, 500)
                    }
                }}
                containerStyle={{
                    width: "100%",
                    height: 50, borderRadius: 10, backgroundColor: colors.accent, alignItems: "center", justifyContent: "center"
                }}
            />}
        </TouchableOpacity>
    );
};




export default MakeYourPick;