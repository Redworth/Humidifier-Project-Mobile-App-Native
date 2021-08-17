import React from 'react';
import 'react-native-gesture-handler';
import { SignUpScreen } from './src/SignUpScreen/signUp.js'
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './src/LoginScreen/login.js';
import { useGlobalIsLoggedIn } from './src/loggedIn.js';
import { DevicesScreen } from './src/DevicesScreen/devices'
import { AutomationsScreen } from './src/AutomationsScreen/automations'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useColorScheme, StatusBar, Platform } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  const isLoggedIn = useGlobalIsLoggedIn()

  return (
      /*isLoggedIn.isLoggedInVal ? (
      <LoggedInScreens />
      ) : <NotLoggedInScreens />*/
      <LoggedInScreens />
  );
}

export function NotLoggedInScreens() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator headerMode="none">
          <Stack.Screen name="SignIn" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export function LoggedInScreens() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator initialRouteName="Devices" screenOptions={{
            //drawerActiveTintColor: "#fe0000"
            drawerStyle: {
              borderBottomRightRadius: 25,
              borderTopRightRadius: 25,
              width: 250
            },
            drawerItemStyle: {
              display: 'flex',
              justifyContent: 'center',
              borderRadius: 5,
              height: 35,
            },
            drawerLabelStyle: {
              fontSize: 18,
            },
            headerStyle: {
              height: StatusBar.currentHeight + 40,
            },
            headerTitleAlign: 'center',
            drawerActiveTintColor: "#FE0000"
          }}>
        <Drawer.Screen name="Devices" component={DevicesScreen} />
        <Drawer.Screen name="Automations" component={AutomationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}