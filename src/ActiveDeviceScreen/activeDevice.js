import React from 'react'
import { ScrollView, Pressable, Image, Dimensions, TouchableOpacity, Icon, View, FlatList } from 'react-native';
import { CustomText } from '../customText'
import { activeDeviceStyles } from '../styles.js';

export function ActiveDevice({ navigation }) {
    return (
        <View style={{ backgroundColor: 'white', width: "100%", height: '100%' }}>
            <Image
                source={require('../../assets/humidifier.png')}
                style={{ marginTop: 24, width: 250, height: 250, alignSelf: 'center' }}
            />
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Pressable style={({ pressed }) => [
                    activeDeviceStyles.fillButton,
                    {
                        backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                        marginLeft: 10,
                        marginRight: 5,
                        justifyContent: 'center',
                    }]}
                    onPress={() => navigation.navigate('ActiveDevice')}
                >
                    <CustomText style={{ fontSize: 50, alignSelf: 'center', color: "#00E391" }}>ON</CustomText>
                </Pressable>
                <Pressable style={({ pressed }) => [
                    activeDeviceStyles.fillButton,
                    {
                        backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                        marginLeft: 5,
                        marginRight: 10,
                        justifyContent: 'center',
                    }]}
                    onPress={() => navigation.navigate('ActiveDevice')}
                >
                    <CustomText style={{ fontSize: 50, alignSelf: 'center' }}>82%</CustomText>
                </Pressable>
            </View>
            <TouchableOpacity style={activeDeviceStyles.offButton}>
                <CustomText style={activeDeviceStyles.offButtonText}>Turn Device Off</CustomText>
            </TouchableOpacity>
        </View>
    )
}