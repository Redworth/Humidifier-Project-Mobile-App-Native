import React from 'react';
import { ScrollView, Pressable, Image, TouchableOpacity, View, StyleSheet, Appearance, TextInput } from 'react-native';
import { CustomText } from '../customText'
import axios, { CancelToken } from 'axios';
import { useGlobalUsername } from '../currentUserName';
import { styles } from '../styles.js';
import { createStackNavigator } from '@react-navigation/stack';
import { useNetInfo } from '@react-native-community/netinfo';


const localStyles = StyleSheet.create({
    nextFillButton: {
        ...styles.fillButton,
        backgroundColor: '#00E391'
    }
})

const Stack = createStackNavigator();

const colorScheme = Appearance.getColorScheme()

async function setWifiForDevice(ssid, psk, deviceName, username, hostname) {
    const url = "http://10.0.0.5:8000/connect-to-wifi"
    const postData = {
        "SSID": ssid,
        "Password": psk,
        "Hostname": hostname,
        "Device Name": deviceName,
        "Username": username // "rohit" // 
    }

    await axios.post(url, postData)
}

async function registerNewDevice(deviceName, username, toRegister) {
    const url = "http://gitpod-machine.eastus.cloudapp.azure.com:8000/register-device"
    const postData = {
        "new_device_name": deviceName,
        "username": username, //"rohit",
        "register": toRegister,
    }

    const response = await axios.post(url, postData)
    const checkData = {
        "Result": "Failure"
    }

    if (JSON.stringify(response.data) == JSON.stringify(checkData)) {
        return "Error: your input is invalid or device already exists."
    }
    else {
        return "Ok"
    }
}

function checkIfConnected() {

}

export function NewDevice() {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontFamily: 'Manrope_500Medium'
            },
        }}>
            <Stack.Screen name="Page1" component={NewDevicePage1} options={{
                headerShown: false
            }}></Stack.Screen>
            <Stack.Screen name="Page2" component={NewDevicePage2} options={{
                title: 'Set your device\'s name'
            }}></Stack.Screen>
            <Stack.Screen name="Page3" component={NewDevicePage3} options={{
                title: 'Connect to the Hotspot'
            }}></Stack.Screen>
            <Stack.Screen name="Page4" component={NewDevicePage4} options={{
                title: 'Enter your WiFi Details'
            }}></Stack.Screen>
            <Stack.Screen name="Page5" component={NewDevicePage5} options={{
                title: 'Is your device connected?'
            }}></Stack.Screen>
            <Stack.Screen name="Page6" component={NewDevicePage6} options={{
                headerShown: false
            }}></Stack.Screen>
        </Stack.Navigator>
    )
}
function NewDevicePage1({ navigation }) {

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#FFFFFF" }}>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                    marginLeft: 7,
                    marginTop: 24,
                    alignSelf: 'center',
                    borderRadius: 10,
                    width: 100,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                }]}
                onPress={navigation.goBack}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                        source={require('../../assets/back_icon.png')}
                        style={{ width: 30, height: 30, alignSelf: 'center' }}
                    />
                    <CustomText style={{ fontSize: 20, alignSelf: 'center' }}> Back</CustomText>
                </View>
            </Pressable>
            <CustomText style={{ alignSelf: 'center', fontSize: 50, color: '#FE0000', margin: 5, textAlign: 'left', marginLeft: 30, marginRight: 30 }}>Let's get your humidifier set up.</CustomText>
            <Image
                source={require('../../assets/humidifier.png')}
                style={{ width: 250, height: 250, margin: 5, alignSelf: 'center' }}
            />
            <View style={styles.contentMargin}>
                <TouchableOpacity
                    style={styles.fillButton}
                    onPress={() => navigation.navigate('Page2')}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <CustomText style={[styles.fillButtonText, { alignSelf: 'flex-start', fontSize: 30, width: '90%' }]}>Next</CustomText>
                        <CustomText style={[styles.fillButtonText, { fontSize: 30, justifyContent: 'flex-start', alignSelf: 'center', width: '10%' }]}>{'->'}</CustomText>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function NewDevicePage2({ navigation }) {

    var [deviceName, changeName] = React.useState("")
    var [errorShown, setErrorShown] = React.useState(false);
    var [registerMessage, changeRegisterMessage] = React.useState("")


    const username = useGlobalUsername();

    return (
        <ScrollView contentContainerStyle={[
            styles.container]}>
            <Image source={require('../../assets/humidifier.png')} style={{
                width: 150,
                height: 150,
                marginBottom: 10,
                alignSelf: 'center'
            }} />
            <CustomText style={{ textAlign: 'center', fontSize: 25, marginLeft: 10, marginRight: 10 }}>
                To check if your selected name is available, input your device name here.</CustomText>
            <View style={styles.contentMargin}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={changeName}
                    value={deviceName}
                    placeholder=" Device Name"
                    placeholderTextColor='#000000'
                />
            </View>
            <View style={styles.contentMargin}>
                <TouchableOpacity
                    style={styles.fillButton}
                    onPress={
                        async () => {
                            var res = await registerNewDevice(deviceName, username.username, "NO")
                            if (res != "Ok") {
                                setErrorShown(true)
                                changeRegisterMessage(res)
                            }
                            else {
                                setErrorShown(false)
                                navigation.navigate('Page3', {
                                    deviceName: deviceName
                                })
                            }
                        }
                    }
                >
                    <View style={{ flexDirection: 'row' }}>
                        <CustomText style={[styles.fillButtonText, { alignSelf: 'flex-start', fontSize: 30, width: '90%' }]}>Next</CustomText>
                        <CustomText style={[styles.fillButtonText, { fontSize: 30, justifyContent: 'flex-start', alignSelf: 'center', width: '10%' }]}>{'->'}</CustomText>
                    </View>
                </TouchableOpacity>
            </View>
            {
                errorShown ? (
                    <View style={styles.contentMargin}>
                        <CustomText style={{ alignSelf: 'center', color: "#ff0000" }}>
                            {registerMessage}
                        </CustomText>
                    </View>
                ) : null
            }
        </ScrollView>
    )
}

function NewDevicePage3({ navigation, route }) {
    var deviceName = route.params.deviceName

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#FFFFFF', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/wifi_icon.png')} style={{ width: 150, height: 150, marginBottom: 10 }} />
            <CustomText style={{ textAlign: 'center', fontSize: 25, marginLeft: 10, marginRight: 10 }}>
                On your device, connect to your device's hotspot. The password is
                <CustomText style={{ color: '#FE0000' }}>"RedworthHumSpot"</CustomText>
                (no quotes).{'\n\n'}
                The name should look like: <CustomText style={{ color: '#FE0000' }}>Redworth-HUM-Spot</CustomText> {'\n\n'}
                Once connected, hit "Next".</CustomText>
            <View style={styles.contentMargin}>
                <TouchableOpacity
                    style={styles.fillButton}
                    onPress={() => navigation.navigate('Page4', {
                        deviceName: deviceName
                    }) /* navigation.navigate('Page4')*/}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <CustomText style={[styles.fillButtonText, { alignSelf: 'flex-start', fontSize: 30, width: '90%' }]}>Next</CustomText>
                        <CustomText style={[styles.fillButtonText, { fontSize: 30, justifyContent: 'flex-start', alignSelf: 'center', width: '10%' }]}>{'->'}</CustomText>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

function NewDevicePage4({ navigation, route }) {

    var [ssid, changeSSID] = React.useState("")
    var [psk, changePSK] = React.useState("")
    var [errorShown, setErrorShown] = React.useState(false);
    var [sendMessage, changeSendMessage] = React.useState("")


    var deviceName = route.params.deviceName

    const netInfo = useNetInfo();

    const username = useGlobalUsername();

    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 1, justifyContent: 'center' }}>
            <Image source={require('../../assets/wifi_icon.png')} style={{ width: 150, height: 150, marginBottom: 10, alignSelf: 'center' }} />
            <CustomText style={{ textAlign: 'center', fontSize: 25, marginLeft: 10, marginRight: 10 }}>
                Enter your SSID and Password to connect your device to your home WiFi network.
            </CustomText>
            <View style={styles.contentMargin}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={changeSSID}
                    value={ssid}
                    placeholder=" SSID"
                    placeholderTextColor='#000000'
                />
            </View>
            <View style={styles.contentMargin}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={changePSK}
                    value={psk}
                    placeholder=" Password"
                    secureTextEntry={true}
                    placeholderTextColor='#000000'
                />
            </View>
            <View style={styles.contentMargin}>
                <TouchableOpacity
                    style={styles.fillButton}
                    onPress={() => {
                        if (netInfo.type == "wifi") {
                            const url = "http://10.0.0.5:8000"

                            const source = CancelToken.source();
                            const timeout = setTimeout(() => {
                                source.cancel();
                            }, 2000);
                            const randString = Math.random().toString(36).substring(2,10);

                            axios.get(url, { cancelToken: source.token }).then((result) => {
                                clearTimeout(timeout)
                                if (result.data == "Success") {
                                    setWifiForDevice(ssid, psk, deviceName, username.username, randString)
                                    navigation.navigate('Page5', {
                                        deviceName: deviceName
                                    })
                                }
                                else {
                                    setErrorShown(true)
                                    changeSendMessage("Are you sure you're on the right wifi network1?")
                                }
                            }).catch((err) => {
                                clearTimeout(timeout)
                                setErrorShown(true)
                                console.log("here")
                                changeSendMessage("Are you sure you're on the right wifi network2?")
                            })
                        }
                        else {
                            setErrorShown(true)
                            changeSendMessage("Are you sure you're on the right wifi network3?")
                        }
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <CustomText style={[styles.fillButtonText, { alignSelf: 'flex-start', fontSize: 30, width: '90%' }]}>Next</CustomText>
                        <CustomText style={[styles.fillButtonText, { fontSize: 30, justifyContent: 'flex-start', alignSelf: 'center', width: '10%' }]}>{'->'}</CustomText>
                    </View>
                </TouchableOpacity>
            </View>
            {
                errorShown ? (
                    <View style={styles.contentMargin}>
                        <CustomText style={{ textAlign: 'center', color: "#ff0000" }}>
                            {sendMessage}
                        </CustomText>
                    </View>
                ) : null
            }
        </View >
    )
}

function NewDevicePage5({ navigation, route }) {
    var [errorShown, setErrorShown] = React.useState(false);
    var [errMessage, changeErrMessage] = React.useState("")

    var deviceName = route.params.deviceName
    const netInfo = useNetInfo();
    const username = useGlobalUsername();


    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#FFFFFF', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CustomText style={{ textAlign: 'center', fontSize: 35, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                Did your device connect?
            </CustomText>
            <CustomText style={{ textAlign: 'center', fontSize: 25, margin: 10 }}>
                If your device successfully connected, the hotspot should be gone, and the LED should show
                <CustomText style={{ color: '#00E391' }}> green</CustomText>. Tap "Next" to move on!
            </CustomText>
            <CustomText style={{ textAlign: 'center', fontSize: 25, margin: 10 }}>
                If not, the LED should show
                <CustomText style={{ color: '#FE0000' }}> red</CustomText>. Try again by hitting the "Retry" button below.
            </CustomText>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={styles.contentMargin}>
                    <TouchableOpacity
                        style={styles.fillButton}
                        onPress={() => navigation.navigate('Page3')}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <CustomText style={[styles.fillButtonText, { alignSelf: 'flex-start', fontSize: 30 }]}>Retry</CustomText>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentMargin}>
                    <TouchableOpacity
                        style={localStyles.nextFillButton}
                        onPress={() => {
                                if (netInfo.isInternetReachable) {
                                    registerNewDevice(deviceName, username.username, "YES")
                                    navigation.navigate('Page6') /* navigation.navigate('Page6')*/
                                }
                                else {
                                    setErrorShown(true)
                                    changeErrMessage("Please connect to the internet to register your device with the cloud.")
                                }
                            }
                        }
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <CustomText style={[styles.fillButtonText, { alignSelf: 'flex-start', fontSize: 30 }]}>Next</CustomText>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {
                errorShown ? (
                    <View style={styles.contentMargin}>
                        <CustomText style={{ textAlign: 'center', color: "#ff0000" }}>
                            {errMessage}
                        </CustomText>
                    </View>
                ) : null
            }
        </ScrollView >
    )
}

function NewDevicePage6({ navigation }) {

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#FFFFFF" }}>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                    marginLeft: 7,
                    marginTop: 24,
                    alignSelf: 'center',
                    borderRadius: 10,
                    width: 100,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                }]}
                onPress={navigation.goBack}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                        source={require('../../assets/back_icon.png')}
                        style={{ width: 30, height: 30, alignSelf: 'center' }}
                    />
                    <CustomText style={{ fontSize: 20, alignSelf: 'center' }}> Back</CustomText>
                </View>
            </Pressable>
            <CustomText style={{
                alignSelf: 'center',
                fontSize: 50,
                color: '#FE0000',
                margin: 5,
                textAlign: 'left',
                marginLeft: 30,
                marginRight: 30
            }}>Your device is all ready to go!</CustomText>
            <Image
                source={require('../../assets/humidifier.png')}
                style={{ width: 250, height: 250, margin: 5, alignSelf: 'center' }}
            />
            <View style={styles.contentMargin}>
                <TouchableOpacity
                    style={styles.fillButton}
                    onPress={() => navigation.getParent().goBack()}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <CustomText style={[styles.fillButtonText, { alignSelf: 'flex-start', fontSize: 30, width: '90%' }]}>Finish</CustomText>
                        <CustomText style={[styles.fillButtonText, { fontSize: 30, justifyContent: 'flex-start', alignSelf: 'center', width: '10%' }]}>{'->'}</CustomText>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}