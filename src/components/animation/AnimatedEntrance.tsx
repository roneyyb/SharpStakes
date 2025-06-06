import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';

interface AnimatedEntranceProps {
    children: React.ReactNode;
    delay?: number; // milliseconds
    duration?: number; // milliseconds
    style?: StyleProp<ViewStyle>;
}

const AnimatedEntrance: React.FC<AnimatedEntranceProps> = ({
    children,
    delay = 0,
    duration = 400,
    style,
}) => {
    const translateY = useRef(new Animated.Value(40)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration,
                delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [delay, duration, opacity, translateY]);

    return (
        <Animated.View
            style={[
                { transform: [{ translateY }], opacity },
                style,
            ]}
        >
            {children}
        </Animated.View>
    );
};

export default AnimatedEntrance;
