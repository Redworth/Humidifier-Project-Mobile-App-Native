import React from 'react';
import { ScrollView, Text, Pressable, Image, Dimensions, TouchableOpacity, Icon, View, FlatList } from 'react-native';
import { devicesPageStyles } from '../styles.js';

export function DevicesScreen({ navigation }) {
    return (
        <View>
            <ScrollView contentContainerStyle={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap' }}>
                <Pressable style={({ pressed }) => [
                    devicesPageStyles.fillButton,
                    {
                        backgroundColor: pressed ? "#EEEEEE" : "#FFFFFF",
                        marginLeft: 10,
                    }]}
                    onPress={() => navigation.navigate('ActiveDevice')}
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
