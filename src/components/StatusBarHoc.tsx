import React from 'react';
import { StatusBar, StatusBarStyle, Platform, View, ViewProps } from 'react-native';
import { useTheme } from '@/utils/theme';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface StatusBarHocProps extends ViewProps {
    children: React.ReactNode;
}

const StatusBarHoc: React.FC<StatusBarHocProps> = ({ children, ...rest }) => {
    const { theme, colors } = useTheme();
    const barStyle: StatusBarStyle = theme === 'dark' ? 'light-content' : 'dark-content';
    const backgroundColor = colors.background;

    const paddingTop = useSafeAreaInsets().top;

    return (
        <View style={{ flex: 1, backgroundColor, paddingTop }} {...rest}>
            <StatusBar
                barStyle={barStyle}
                backgroundColor={backgroundColor}
                translucent={Platform.OS === 'android'}
            />
            {children}
        </View>
    );
};

export default StatusBarHoc;
