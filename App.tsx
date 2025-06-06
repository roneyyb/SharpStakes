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
            <QueryClientProvider client={queryClient}>
                <StackNavigator />
            </QueryClientProvider>
        </ThemeProviderSS>

    );
}


export default App;
