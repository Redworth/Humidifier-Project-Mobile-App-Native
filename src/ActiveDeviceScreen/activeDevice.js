import React, { useEffect } from 'react'
import { ScrollView, Pressable, Image, Dimensions, TouchableOpacity, View, FlatList } from 'react-native';
import { CustomText } from '../customText'
import { activeDeviceStyles } from '../styles.js';
import axios from 'axios';
import { useGlobalUsername } from '../currentUserName';

export function ActiveDevice({ navigation, route }) {

    var [getComplete, setGetComplete] = React.useState(false)
    var [colorStatus, setColor] = React.useState("")
    var [offOnButtonColor, setOffOnButtonColor] = React.useState("")
    var [onOff, setOnOff] = React.useState("")
    var [value, setValue] = React.useState("")
    var [offOnButtonText, setOffOnButton] = React.useState("")

    const username = useGlobalUsername();

    useEffect(() => {
        async function getDeviceInfo() {
            //const url = "http://10.0.0.158:8000/get-devices-info"
            const url = "http://192.168.1.140:8000/specific-device"
            const postData = {
                //"username": username.username,
                "username": "rohit",
                "targetDevice": route.params.deviceName
            }

            const response = await axios.post(url, postData)

            if (response.data['intensity'].toString() + "%" == value) {}
            else {
                if (response.data['intensity'] >= 1) {
                    setColor("#00E391")
                    setOnOff("ON")
                    setOffOnButton("Turn Device Off")
                    setOffOnButtonColor("#FE0000")
                }
                else {
                    setColor("#FE0000")
                    setOnOff("OFF")
                    setOffOnButton("Turn Device On")
                    setOffOnButtonColor("#00E391")
                }
                setValue(response.data['intensity'].toString() + "%")
            }
            setGetComplete(true)
        }
        getDeviceInfo();
        const pollData = setInterval(getDeviceInfo, 1000);

        return () => clearInterval(pollData);
    }, [value])

    if (!getComplete) {
        return null;
    }
    else {
        return (
            <View>
                <View style={{ width: '100%', backgroundColor: '#FFFFFF', flexDirection: 'row', display: 'flex' }}>
                    <Pressable style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                            marginLeft: 7,
                            marginTop: 24,
                            alignSelf: 'center',
                            borderRadius: 10,
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }]}
                        onPress={navigation.goBack}>
                        <Image
                            source={require('../../assets/back_icon.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </Pressable>
                    <View style={{ width: Dimensions.get('window').width - 94, backgroundColor: "#FFFFFF", display: 'flex' }}>
                        <CustomText style={{ fontSize: 30, textAlign: 'center', alignSelf: 'center', marginTop: 24 }}>{route.params.deviceName}</CustomText>
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        height: '100%',
                        backgroundColor: 'white'
                    }}>
                    <Image
                        source={require('../../assets/humidifier.png')}
                        style={{ width: 250, height: 250, alignSelf: 'center' }}
                    />
                        <View style={[
                            activeDeviceStyles.infoView,
                            {
                                backgroundColor: "#FFFFFF",
                                justifyContent: 'center',
                            }]}
                        >
                            <CustomText style={{ fontSize: 50, alignSelf: 'center', color: colorStatus }}>{value} spread</CustomText>
                        </View>
                    <TouchableOpacity style={[
                        activeDeviceStyles.offButton, 
                        { 
                            backgroundColor: offOnButtonColor
                        }]}>
                        <CustomText style={activeDeviceStyles.offButtonText}>{offOnButtonText}</CustomText>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}