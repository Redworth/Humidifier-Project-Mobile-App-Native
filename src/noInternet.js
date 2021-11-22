import { View, Image } from 'react-native';
import { CustomText } from './customText.js';
import React, { useEffect } from "react";
import { styles } from './styles.js';
import WifiManager from 'react-native-wifi';

export function NetworkStatus() {
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
            </View>
        </View>
    )
}