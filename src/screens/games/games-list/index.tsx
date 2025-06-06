import StatusBarHoc from '@/components/StatusBarHoc';
import React from 'react';
import { Text, View } from 'react-native';

const GamesListScreen = () => {
    return (
        <StatusBarHoc>
            <View>
                <Text>Games List Screen</Text>
            </View>
        </StatusBarHoc>
    );
};

export default GamesListScreen;