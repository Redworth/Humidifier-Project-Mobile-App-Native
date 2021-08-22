import React from 'react'
import { ScrollView, Text, Pressable, Image, Dimensions, TouchableOpacity, Icon, View, FlatList } from 'react-native';

export function ActiveDevice({ navigation }) {
    return (
        <View>
            <Image
                source={require('../../assets/humidifier.png')}
                style={{ marginTop: 24, width: 250, height: 250, alignSelf: 'center' }}
            />
        </View>
    )
}