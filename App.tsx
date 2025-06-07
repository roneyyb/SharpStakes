/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import StackNavigator from '@/navigation/StackNavigator';
import { ThemeProviderSS } from './src/utils/theme';
import { QueryClientProvider } from 'react-query';
import queryClient from '@/utils/queryClient';
import { UserProvider } from '@/utils/user';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '@/utils/warnings'; // Import the warnings utility
import '@/utils/axios';

function App(): React.JSX.Element {

    return (
        <ThemeProviderSS>
            <GestureHandlerRootView>
                <QueryClientProvider client={queryClient}>
                    <UserProvider>
                        <StackNavigator />
                    </UserProvider>
                </QueryClientProvider>
            </GestureHandlerRootView>
        </ThemeProviderSS>

    );
}


export default App;
