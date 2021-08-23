import React from 'react';
import { ScrollView, Text, Pressable, Image, Dimensions, TouchableOpacity, Icon, View, FlatList } from 'react-native';
import { devicesPageStyles } from '../styles.js';

export function DevicesScreen({ navigation }) {
    var count = 0;
    var arrDevices = []

    for (var i = 0; i < 10; i++) {
        count += 1;

        if (count % 2 != 0) {
            arrDevices.push(
                <Pressable style={({ pressed }) => [
                    devicesPageStyles.fillButton,
                    {
                        backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                        marginLeft: 10,
                    }]}
                    onPress={() => navigation.navigate('ActiveDevice')}
                    key={count}
                >
                    <Text style={{ fontSize: 24 }}>Rohit's Humidifier</Text>
                    <Image
                        source={require('../../assets/humidifier.png')}
                        style={{ marginTop: 15, width: '57.97101449%', height: '45.45454545%', alignSelf: 'center' }}
                    />
                </Pressable>
            );
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
                    <Text style={{ fontSize: 24 }}>Rohit's Humidifier</Text>
                    <Image
                        source={require('../../assets/humidifier.png')}
                        style={{ marginTop: 15, width: '57.97101449%', height: '45.45454545%', alignSelf: 'center' }}
                    />
                </Pressable>
            );
        }
    }
    return (
        <View>
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
                    <Text style={{ fontSize: 18, color: pressed ? "#FE0000" : '#FFFFFF' }}>+ Add a Device</Text>
                )}
            />
        </View>
    );
}
