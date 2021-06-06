import React from 'react';
import { SignUpScreen } from './src/SignUpScreen/signUp.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './src/LoginScreen/login.js';
import { AppRegistry } from 'react-native';
import { VerifyScreen } from './src/VerifyScreen/verifyEmail.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}