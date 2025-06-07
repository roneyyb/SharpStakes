
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import { useTheme } from '@/utils/theme';
import React, { useRef, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, Dimensions } from 'react-native';

interface GameFilterProps {
    onFilterChange: (filter: 'scheduled' | 'inProgress' | 'final') => void;
}

const FILTERS = [
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'In Progress', value: 'inProgress' },
    { label: 'Completed', value: 'final' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_WIDTH = SCREEN_WIDTH / FILTERS.length - 32 / FILTERS.length; // padding adjustment

const GameFilter = ({ onFilterChange }: GameFilterProps) => {
    const [selected, setSelected] = useState<'scheduled' | 'inProgress' | 'final'>('scheduled');
    const translateX = useRef(new Animated.Value(0)).current;

    const handlePress = (value: 'scheduled' | 'inProgress' | 'final', index: number) => {
        setSelected(value);
        onFilterChange(value);
        Animated.spring(translateX, {
            toValue: index * TAB_WIDTH,
            useNativeDriver: true,
        }).start();
    };

    const { colors } = useTheme()
    return (
        <View style={[styles.container, { backgroundColor: colors.filterBackground }]}>
            <View style={[styles.tabRow]}>
                {FILTERS.map((filter, idx) => (
                    <Pressable
                        key={filter.value}
                        style={[styles.tab]}
                        onPress={() => handlePress(filter.value as any, idx)}
                    >
                        <WrappedText
                            text={filter.label}
                            textColor={colors.text}
                            fontFamily={selected === filter.value ? FontsWithWeight.circular_700 : FontsWithWeight.circular_450}
                            fontSize={16}
                            textStyle={[styles.tabText, selected === filter.value ? { color: colors.filterActiveText } : {}]}
                        />
                    </Pressable>
                ))}
                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            backgroundColor: colors.cardBackground,
                            width: TAB_WIDTH,
                            transform: [{ translateX }],
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        borderRadius: 8,
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
        color: '#666',
        fontWeight: '500',
    },
    selectedText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    indicator: {
        position: 'absolute',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        top: 0,
        left: 0,
        zIndex: 0,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});

export default GameFilter;