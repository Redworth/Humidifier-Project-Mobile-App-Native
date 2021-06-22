import React from 'react';
import { SignUpScreen } from './src/SignUpScreen/signUp.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './src/LoginScreen/login.js';
import { useGlobalIsLoggedIn } from './src/loggedIn.js';
import { HomeScreen } from './src/HomeScreen/HomeScreen'

const Stack = createStackNavigator();


export default function App() {

  const isLoggedIn = useGlobalIsLoggedIn()
  
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {
          isLoggedIn.isLoggedInVal ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignUpScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}