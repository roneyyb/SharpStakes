import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';

interface TeamInfoStyles {
    container: ViewStyle;
}

interface TeamInfoProps {
    team: {
        abbreviation: string;
        score?: number;
        record: string;
    };
    textColor: string;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ team, textColor }) => {
    const styles = StyleSheet.create<TeamInfoStyles>({
        container: {
            rowGap: 10,
        },
    });

    return (
        <View style={styles.container}>
            <WrappedText
                text={`${team.abbreviation}${team.score ? ` (${team.score})` : ''}`}
                textColor={textColor}
                fontFamily={FontsWithWeight.circular_700}
                fontSize={team.score ? 25 : 35}
            />
            <WrappedText
                text={team.record}
                textColor={textColor}
                fontFamily={FontsWithWeight.circular_450}
                fontSize={20}
            />
        </View>
    );
};

export default TeamInfo;
