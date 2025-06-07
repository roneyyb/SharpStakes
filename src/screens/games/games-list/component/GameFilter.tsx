
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import { useTheme } from '@/utils/theme';
import React, { useRef, useState } from 'react';
import { View, Pressable, Animated, StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';

type GameFilterType = 'scheduled' | 'inProgress' | 'final';

interface GameFilterStyles {
    container: ViewStyle;
    tabRow: ViewStyle;
    tab: ViewStyle;
    tabText: TextStyle;
    selectedText: TextStyle;
    indicator: ViewStyle;
}

const FILTERS = [
    { label: 'Scheduled', value: 'scheduled' as const },
    { label: 'In Progress', value: 'inProgress' as const },
    { label: 'Completed', value: 'final' as const },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_WIDTH = SCREEN_WIDTH / FILTERS.length - 32 / FILTERS.length; // padding adjustment

interface GameFilterProps {
    onFilterChange: (filter: GameFilterType) => void;
}

const GameFilter = ({ onFilterChange }: GameFilterProps) => {
    const [selected, setSelected] = useState<GameFilterType>('scheduled');
    const translateX = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();

    const handlePress = (value: GameFilterType, index: number) => {
        setSelected(value);
        onFilterChange(value);
        Animated.spring(translateX, {
            toValue: index * TAB_WIDTH,
            useNativeDriver: true,
        }).start();
    };

    const styles = StyleSheet.create<GameFilterStyles>({
        container: {
            marginVertical: 16,
            borderRadius: 8,
            backgroundColor: colors.filterBackground,
        },
        tabRow: {
            flexDirection: 'row',
            position: 'relative',
            borderRadius: 8,
            overflow: 'hidden',
        },
        tab: {
            flex: 1,
            paddingVertical: 12,
            alignItems: 'center',
            zIndex: 1,
        },
        tabText: {
            fontSize: 16,
            color: colors.text,
            fontWeight: '500',
        },
        selectedText: {
            color: colors.filterActiveText,
            fontWeight: 'bold',
        },
        indicator: {
            position: 'absolute',
            height: '100%',
            backgroundColor: colors.cardBackground,
            borderRadius: 8,
            top: 0,
            left: 0,
            zIndex: 0,
            elevation: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.tabRow}>
                {FILTERS.map((filter, idx) => {
                    const isSelected = selected === filter.value;
                    return (
                        <Pressable
                            key={filter.value}
                            style={styles.tab}
                            onPress={() => handlePress(filter.value, idx)}>
                            <WrappedText
                                text={filter.label}
                                textColor={colors.text}
                                fontFamily={
                                    isSelected
                                        ? FontsWithWeight.circular_700
                                        : FontsWithWeight.circular_450
                                }
                                fontSize={16}
                                textStyle={[
                                    styles.tabText,
                                    isSelected && styles.selectedText,
                                ]}
                            />
                        </Pressable>
                    );
                })}
                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            width: TAB_WIDTH,
                            transform: [{ translateX }],
                        },
                    ]}
                />
            </View>
        </View>
    );
};

export default GameFilter;

