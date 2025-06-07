import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const DotBlinking = ({ color }: { color: string }) => {
    const opacity = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        const blink = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.2,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        );
        blink.start();
        return () => blink.stop();
    }, [opacity]);
    return (
        <Animated.View
            style={{
                height: 10,
                width: 10,
                borderRadius: 5, // Half of width/height for perfect circle
                backgroundColor: color,
                opacity,
            }}
        />
    );
};

export default DotBlinking;