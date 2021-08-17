import React from 'react';
import { ScrollView, Text, Pressable, Image, Dimensions } from 'react-native';
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
                    style={{ marginTop: 15, width: '57.97101449%', height: '45.45454545%', alignSelf: 'center'}} 
                />
                <Image
                    source={require('../../assets/access_icon.png')}
                    style={{ margin: 15, padding: 10, width: 20, height: 20, alignSelf: 'flex-end'}} 
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
                    style={{ margin: 15, width: '57.97101449%', height: '45.45454545%', alignSelf: 'center'}} 
                />
            </Pressable>
        </ScrollView>
    );
}
