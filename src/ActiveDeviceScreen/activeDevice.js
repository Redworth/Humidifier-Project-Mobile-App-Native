import React, { useEffect, useCallback } from 'react'
import { ScrollView, Pressable, Image, Dimensions, TouchableOpacity, View, FlatList } from 'react-native';
import { CustomText } from '../customText'
import { activeDeviceStyles } from '../styles.js';
import axios from 'axios';
import { useGlobalUsername } from '../currentUserName';
import Slider from '@react-native-community/slider'

export function ActiveDevice({ navigation, route }) {

    var [getComplete, setGetComplete] = React.useState(false)
    var [colorStatus, setColor] = React.useState("")
    var [value, setValue] = React.useState("")
    var [numericValue, setNumValue] = React.useState(0)
    var [valueDisp, setValueDisp] = React.useState("")

    const username = useGlobalUsername();

    function updateValues(numVal, valDisp) {
        setNumValue(numVal)
        setValueDisp(valDisp)
    }

    async function updateDeviceInfo() {
        const url = "http://gitpod-machine.eastus.cloudapp.azure.com:8000/app-request"
        const postData = {
            //"username": username.username,
            "username": "rohit",
            "targetDevice": route.params.deviceName,
            "requestDetails": "NA",
            "targetIntensity": numericValue
        }

        await axios.post(url, postData)
    }
    useEffect(() => {
        async function getDeviceInfo() {
            //const url = "http://10.0.0.158:8000/get-devices-info"
            const url = "http://gitpod-machine.eastus.cloudapp.azure.com:8000/specific-device"
            const postData = {
                "username": username.username,
                //"username": "rohit",
                "targetDevice": route.params.deviceName
            }

            const response = await axios.post(url, postData)

            if (response.data['intensity'].toString() + "%" == value) { }
            else {
                if (response.data['intensity'] >= 1) {
                    setColor("#00E391")
                }
                else {
                    setColor("#FE0000")
                }
                setValue(response.data['intensity'].toString() + "%")
                setNumValue(response.data['intensity'])
                setValueDisp(response.data['intensity'].toString() + "%")
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
                        <CustomText style={{ fontSize: 40, alignSelf: 'center', textAlign: 'center' }}>
                            <CustomText style={{ color: colorStatus }}>{value}</CustomText>
                            <CustomText style={{ color: '#666666' }}> intensity on device.</CustomText></CustomText>
                    </View>
                    <View>
                        <Slider
                            style={{ width: '94.666667%', marginTop: 15, marginBottom: 7, alignSelf: 'center' }}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor="#FE0000"
                            maximumTrackTintColor="#666666"
                            onValueChange={(val) => { updateValues(val, val.toString() + "%")}}
                            step={1}
                            thumbTintColor="#DDDDDD"
                            onSlidingComplete={() => updateDeviceInfo()}
                            value={numericValue}
                        />
                    </View>
                    <CustomText style={{ fontSize: 18, alignSelf: 'center', textAlign: 'center', marginLeft: 10, marginRight: 10 }}>Slide the above slider to adjust the intensity!</CustomText>
                    <CustomText style={{ fontSize: 50, alignSelf: 'center', textAlign: 'center', marginLeft: 10, marginRight: 10 }}>{valueDisp}</CustomText>
                </ScrollView>
            </View>
        )
    }
}