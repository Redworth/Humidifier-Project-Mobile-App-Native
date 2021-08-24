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
import { useColorScheme, StatusBar, Platform, Dimensions } from 'react-native';
import { ActiveDevice } from './src/ActiveDeviceScreen/activeDevice.js';
import AppLoading from 'expo-app-loading';
import { 
  useFonts, 
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  const isLoggedIn = useGlobalIsLoggedIn()

  var [fontsLoaded] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } 

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
  const window = Dimensions.get('window')
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator initialRouteName="Devices" screenOptions={{
        //drawerActiveTintColor: "#fe0000"
        drawerStyle: {
          borderBottomRightRadius: 25,
          borderTopRightRadius: 25,
          width: 250,
          backgroundColor: 'white',
          fontFamily: 'Manrope_500Medium'
        },
        drawerItemStyle: {
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 5,
          height: 35,
        },
        drawerLabelStyle: {
          fontSize: 18,
          height: Platform.OS == "ios" ? 20 : null,
          fontFamily: 'Manrope_500Medium'
        },
        headerStyle: {
          height: Platform.OS == "ios" ? 80 : StatusBar.currentHeight + 40,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Manrope_500Medium'
        },
        drawerActiveTintColor: "#FE0000",
        drawerType: 'front'
      }}>
        <Drawer.Screen name="Devices" component={DevicesScreens} />
        <Drawer.Screen name="Automations" component={AutomationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export function DevicesScreens() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="DevicesView" component={DevicesScreen} />
      <Stack.Screen name="ActiveDevice" component={ActiveDevice} />
    </Stack.Navigator>
  )
}