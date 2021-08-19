import React from 'react';
import { ScrollView, Text, Pressable, Image, Dimensions, TouchableOpacity, Icon } from 'react-native';
import { devicesPageStyles } from '../styles.js';

export function DevicesScreen() {
    const window = Dimensions.get('window')
    return (
        <ScrollView horizontal={true}>
            <Pressable style={({ pressed }) => [
                devicesPageStyles.fillButton,
                {
                    backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                    marginLeft: 10
                }]}
                onPress={() => console.log('test')}
            >
                <Text style={{ fontSize: 24 }}>Rohit's Humidifier</Text>
                <Image
                    source={require('../../assets/humidifier.png')}
                    style={{ marginTop: 15, width: '57.97101449%', height: '45.45454545%', alignSelf: 'center' }}
                />
            </Pressable>
            <Pressable style={({ pressed }) => [
                devicesPageStyles.fillButton,
                {
                    backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                    marginRight: 10
                }]}
                onPress={() => console.log('test')}
            >
                <Text style={{ fontSize: 24 }}>HUM1</Text>
                <Image
                    source={require('../../assets/humidifier.png')}
                    style={{ margin: 15, width: '57.97101449%', height: '45.45454545%', alignSelf: 'center' }}
                />
            </Pressable>
            <TouchableOpacity
                style={{
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
                    height: 70,
                    backgroundColor: '#fe0000',
                    borderRadius: 100,
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Text>+</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
