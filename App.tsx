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
import '@/utils/axios';
import { UserProvider } from '@/utils/user';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '@/utils/warnings'; // Import the warnings utility

function App(): React.JSX.Element {


    /*
     * To keep the template simple and small we're adding padding to prevent view
     * from rendering under the System UI.
     * For bigger apps the recommendation is to use `react-native-safe-area-context`:
     * https://github.com/AppAndFlow/react-native-safe-area-context
     *
     * You can read more about it here:
     * https://github.com/react-native-community/discussions-and-proposals/discussions/827
     */


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
