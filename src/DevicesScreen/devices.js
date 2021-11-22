import React, { useEffect, useCallback } from 'react';
import { ScrollView, Pressable, Image, Dimensions, TouchableOpacity, Icon, View, FlatList } from 'react-native';
import { devicesPageStyles } from '../styles.js';
import { CustomText } from '../customText'
import axios from 'axios';
import { useGlobalUsername } from '../currentUserName.js';
import { useNetInfo } from '@react-native-community/netinfo';
import { NetworkStatus } from '../noInternet.js';


export function DevicesScreen({ navigation }) {

    var [jsonData, setJsonData] = React.useState({})
    var [getComplete, setGetComplete] = React.useState(false)

    const username = useGlobalUsername();
    const netInfo = useNetInfo();

    useEffect(() => {
        async function getDeviceInfo() {
            //const url = "http://10.0.0.158:8000/get-devices-info"
            const url = "http://gitpod-machine.eastus.cloudapp.azure.com:8000/get-devices-info"
            const postData = {
                //"username": username.username
                "username": "rohit"
            }

            const response = await axios.post(url, postData)
            
            setJsonData(response)
            setGetComplete(true)
        }

        const unsubscribe = navigation.addListener('focus', () => {
            getDeviceInfo()
        })
        
        return unsubscribe;

    }, [navigation])

    if (!getComplete) {
        return null;
    }
    else if (netInfo.isInternetReachable == false){
        return (
            <NetworkStatus />
        )
    }
    else {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView contentContainerStyle={{ 
                    display: "flex", 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    backgroundColor: 'white',
                    flexGrow: 1
                }}>
                    {
                        Object.keys(jsonData.data).map((key, index) => {
                            if (index % 2 == 0) {
                                return (
                                    <Pressable style={({ pressed }) => [
                                        devicesPageStyles.fillButton,
                                        {
                                            backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                                            marginLeft: 10,
                                        }]}
                                        onPress={() => navigation.navigate('ActiveDevice', { deviceName: key })}
                                        key={index}
                                    >
                                        <CustomText style={{ fontSize: 24 }}>{key}</CustomText>
                                        <Image
                                            source={require('../../assets/humidifier.png')}
                                            style={{ marginTop: 15, width: '57.97101449%', height: '45.45454545%', alignSelf: 'center' }}
                                        />
                                    </Pressable>
                                );
                            }
                            else {
                                return (
                                    <Pressable style={({ pressed }) => [
                                        devicesPageStyles.fillButton,
                                        {
                                            backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                                            marginRight: 10,
                                        }]}
                                        onPress={() => navigation.navigate('ActiveDevice', { deviceName: key })}
                                        key={index}
                                    >
                                        <CustomText style={{ fontSize: 24 }}>{key}</CustomText>
                                        <Image
                                            source={require('../../assets/humidifier.png')}
                                            style={{ marginTop: 15, width: '57.97101449%', height: '45.45454545%', alignSelf: 'center' }}
                                        />
                                    </Pressable>
                                );
                            }                
                        })
                    }
                </ScrollView>
                <Pressable
                    style={({ pressed }) => ({
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 150,
                        height: 50,
                        elevation: 4,
                        shadowRadius: 4,
                        shadowOffset: {
                            width: 0,
                            height: 4
                        },
                        shadowOpacity: 0.5,
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: '#fe0000',
                        borderRadius: 100,
                        display: 'flex',
                        flexDirection: 'row',
                        resizeMode: 'contain',
                        backgroundColor: pressed ? "#fecccc" : "#FE0000"
                    })}
                    children={({ pressed }) => (
                        <CustomText style={{ fontSize: 18, color: pressed ? "#FE0000" : '#FFFFFF' }}>+ Add a Device</CustomText>
                    )}
                    onPress={() => navigation.navigate('NewDevice')}
                />
            </View>
        );
    }
}
