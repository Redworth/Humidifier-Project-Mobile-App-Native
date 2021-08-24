import React from 'react';
import { View, TextInput, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { CustomText } from '../customText'

export function AutomationsScreen() {

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
            <Image
                source={require('../../assets/Redworth6(Current)(Transparent).png')}
                style={{ width: 200, height: 200, alignSelf: 'center', }} />
            <CustomText style={{ alignSelf: 'center', fontSize: 50, color: '#FE0000' }}>Coming Soon!</CustomText>
            <CustomText style={{ alignSelf: 'center', fontSize: 18, textAlign: 'center', margin: 10 }}>Automations are an easy way to automate your smart device tasks. Check back to see when our new feature is ready!</CustomText>
        </View>
    );
}
