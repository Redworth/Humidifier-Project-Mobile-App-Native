import React from 'react';
import 'react-native-gesture-handler';
import { SignUpScreen } from './src/SignUpScreen/signUp.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './src/LoginScreen/login.js';
import { useGlobalIsLoggedIn } from './src/loggedIn.js';
import { DevicesScreen } from './src/DevicesScreen/devices'
import { AutomationsScreen } from './src/AutomationsScreen/automations'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  const isLoggedIn = useGlobalIsLoggedIn()

  return (
      /*isLoggedIn.isLoggedInVal ? (
      <LoggedInScreens />
      ) : <NotLoggedInScreens />*/
      //<NotLoggedInScreens></NotLoggedInScreens>
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Devices">
        <Drawer.Screen name="Devices" component={DevicesScreen} />
        <Drawer.Screen name="Automations" component={AutomationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export function NotLoggedInScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
          <Stack.Screen name="SignIn" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export function LoggedInScreens() {
  /*return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Devices">
        <Drawer.Screen name="Devices" component={DevicesScreen} />
        <Drawer.Screen name="Automations" component={AutomationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )*/
}

/*
 <Stack.Navigator headerMode="none">
        {
          isLoggedIn.isLoggedInVal ? (
            <Drawer.Navigator initialRouteName="Devices">
              <Drawer.Screen name="Devices" component={DevicesScreen} />
              <Drawer.Screen name="Automations" component={AutomationsScreen} />
            </Drawer.Navigator>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignUpScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
          )
        }
      </Stack.Navigator>
*/