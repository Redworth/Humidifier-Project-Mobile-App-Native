import React from 'react';
import { ScrollView, Pressable, Image, Dimensions, TouchableOpacity, Icon, View, FlatList } from 'react-native';
import { devicesPageStyles } from '../styles.js';
import { CustomText } from '../customText'
import axios from 'axios';

export function DevicesScreen({ navigation }) {

    var [arrDevices, setArrDevices] = React.useState([])

    var count = 0;
    var [arrKeys, setArrKeys] = React.useState([])

    const [getComplete, setGetComplete] = React.useState(false)

    async function getDeviceInfo() {
        //const url = "http://10.0.0.158:8000/get-devices-info"
        const url = "http://127.0.0.1:8000/get-devices-info"
        const postData = {
            "username": 'rohit'
        }

        const response = await axios.post(url, postData)

        Object.keys(response.data).forEach(
            function (key, index) {
                setArrKeys([
                    ...arrKeys,
                    key
                ])
            }
        )

        for (const i of arrKeys) {
            count += 1;
            if (count % 2 != 0) {
                setArrDevices([
                    ...arrDevices,
                    <Pressable style={({ pressed }) => [
                        devicesPageStyles.fillButton,
                        {
                            backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                            marginLeft: 10,
                        }]}
                        onPress={() => navigation.navigate('ActiveDevice')}
                        key={count}
                    >
                        <CustomText style={{ fontSize: 24 }}>{i}</CustomText>
                        <Image
                            source={require('../../assets/humidifier.png')}
                            style={{ marginTop: 15, width: '57.97101449%', height: '45.45454545%', alignSelf: 'center' }}
                        />
                    </Pressable>
                ]);
            }
            else {
                arrDevices.push(
                    <Pressable style={({ pressed }) => [
                        devicesPageStyles.fillButton,
                        {
                            backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                            marginRight: 10,
                        }]}
                        onPress={() => navigation.navigate('ActiveDevice')}
                        key={count}
                    >
                        <CustomText style={{ fontSize: 24 }}>{i}</CustomText>
                        <Image
                            source={require('../../assets/humidifier.png')}
                            style={{ marginTop: 15, width: '57.97101449%', height: '45.45454545%', alignSelf: 'center' }}
                        />
                    </Pressable>
                );
            }
        }
        setGetComplete(true)
    }

    getDeviceInfo()

    if (getComplete != true) {
        return null;
    }
    else {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <ScrollView contentContainerStyle={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap' }}>
                    {arrDevices}
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
