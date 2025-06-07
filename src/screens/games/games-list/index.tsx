import StatusBarHoc from '@/hoc/StatusBarHoc';
import React from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { useGames } from '@/api/games';


import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '@/navigation/StackNavigator';
import GameFlatList from './views/GameFlatList';
import GameFilter from './component/GameFilter';
import GameListHeader from './component/GameListHeader';
import { RefreshControl } from 'react-native-gesture-handler';
import { useTheme } from '@/utils/theme';

const GamesListScreen = () => {
    const { data: games, isLoading, error, refetch } = useGames();
    const navigation = useNavigation();
    const [filter, setFilter] = React.useState<'scheduled' | 'inProgress' | 'final'>('scheduled');
    const { colors } = useTheme();

    const handleGamePress = (game: any) => {
        navigation.navigate(ScreenNames.GameDetails, { id: game.id });
    };


    return (
        <StatusBarHoc>

            <View style={{ flex: 1, paddingHorizontal: "5%" }}>
                <GameListHeader onPressProfile={() => { navigation.navigate(ScreenNames.Profile); }} />

                {isLoading && <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="large" /></View>}
                {error && <Text>Error loading games.</Text>}
                <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl colors={[colors.text]} refreshing={isLoading} onRefresh={() => { refetch() }} />}>

                    {!isLoading && !error && (<>

                        <GameFilter onFilterChange={setFilter} />
                        <GameFlatList games={games?.filter((game) => game.status === filter) || []} onPress={handleGamePress} />
                    </>
                    )}
                </ScrollView>
            </View>

        </StatusBarHoc>
    );
};

export default GamesListScreen;