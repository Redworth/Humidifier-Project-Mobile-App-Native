import React, { useEffect, useCallback } from 'react'
import { ScrollView, Pressable, Image, Dimensions, TouchableOpacity, View, StatusBar, Appearance , TextInput} from 'react-native';
import { CustomText } from '../customText'
import { activeDeviceStyles } from '../styles.js';
import axios from 'axios';
import { useGlobalUsername } from '../currentUserName';
import Slider from '@react-native-community/slider'
import { styles } from '../styles.js';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

const colorScheme = Appearance.getColorScheme()

async function setWifiForDevice(ssid, psk) {
    const url = "http://10.0.0.5:8000/connect-to-wifi"
    const postData = {
        "SSID": ssid,
        "Password": psk
    }

    await axios.post(url, postData)
}

export function NewDevice() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                height: Platform.OS == "ios" ? 80 : StatusBar.currentHeight + 40,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontFamily: 'Manrope_500Medium'
            },
        }}>
            <Stack.Screen name="Page1" component={NewDevicePage1} options={{
                headerShown: false
            }}></Stack.Screen>
            <Stack.Screen name="Page2" component={NewDevicePage2} options={{
                title: 'Connect to the Hotspot'
            }}></Stack.Screen>
            <Stack.Screen name="Page3" component={NewDevicePage3} options={{
                title: 'Enter your WiFi Details'
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
                    onPress={() => navigation.navigate('Page3')}
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

function NewDevicePage3({ navigation }) {

    var [ssid, changeSSID] = React.useState("")
    var [psk, changePSK] = React.useState("")

    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 1, justifyContent: 'center'}}>
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
                    onPress={async () => {
                        navigation.navigate('Page3')
                        await setWifiForDevice(ssid, psk)
                    }}
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