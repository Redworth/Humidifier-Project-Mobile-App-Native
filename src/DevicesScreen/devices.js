import React, { useEffect, useCallback } from 'react';
import { ScrollView, Pressable, Image, Dimensions, TouchableOpacity, Icon, View, FlatList } from 'react-native';
import { devicesPageStyles } from '../styles.js';
import { CustomText } from '../customText'
import axios from 'axios';
import { useGlobalUsername } from '../currentUserName.js';

export function DevicesScreen({ navigation }) {

    var [jsonData, setJsonData] = React.useState({})
    var [getComplete, setGetComplete] = React.useState(false)

    const username = useGlobalUsername();

    useEffect(() => {
        async function getDeviceInfo() {
            //const url = "http://10.0.0.158:8000/get-devices-info"
            const url = "http://192.168.1.140:8000/get-devices-info"
            const postData = {
                "username": username.username
            }

            const response = await axios.post(url, postData)
            
            setJsonData(response)
            setGetComplete(true)
        }

        getDeviceInfo()

    }, [])

    if (getComplete === false) {
        return null;
    }
    else {
        return (
            <View>
                <ScrollView contentContainerStyle={{ 
                    display: "flex", 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    height: Dimensions.get('window').height, 
                    backgroundColor: 'white'  
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
                                        onPress={() => navigation.navigate('ActiveDevice')}
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
                                        onPress={() => navigation.navigate('ActiveDevice')}
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
                />
            </View>
        );
    }
}
