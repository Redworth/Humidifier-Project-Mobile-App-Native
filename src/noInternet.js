import { View, Image } from 'react-native';
import { CustomText } from './customText.js';
import React from "react";
import { styles } from './styles.js';
import { useNetInfo } from '@react-native-community/netinfo';

export function NetworkStatus() {
    const netInfo = useNetInfo();

    return (
        <View style={styles.container}>
            <View style={styles.contentMargin}>
                <Image source={require('../assets/warning_icon.png')} style={{ 
                    width: 150, 
                    height: 150, 
                    marginBottom: 10, 
                    alignSelf: 'center' 
                }} />
                <CustomText style={{ textAlign: 'center', fontSize: 25, marginLeft: 10, marginRight: 10 }}>
                    You aren't connected to the internet! Please connect to the internet and try again.
                </CustomText>
                <CustomText style={{ textAlign: 'center', fontSize: 25, marginLeft: 10, marginRight: 10 }}>
                    {netInfo.type}
                </CustomText>
            </View>
        </View>
    )
}