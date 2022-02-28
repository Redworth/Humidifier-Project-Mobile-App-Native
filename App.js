import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { SignUpScreen } from './src/SignUpScreen/signUp.js'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  getFocusedRouteNameFromRoute
} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import { LoginScreen } from './src/LoginScreen/login.js';
import { accessGlobalIsLoggedIn, useGlobalIsLoggedIn } from './src/loggedIn.js';
import { DevicesScreen } from './src/DevicesScreen/devices'
import { AutomationsScreen } from './src/AutomationsScreen/automations'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useColorScheme, StatusBar, Platform, Dimensions } from 'react-native';
import { ActiveDevice } from './src/ActiveDeviceScreen/activeDevice.js';
import { NetworkStatus } from './src/noInternet.js';
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
import { NewDevice } from './src/AddNewDeviceScreen/addNewDevice.js';
import { useNetInfo } from '@react-native-community/netinfo';
import { TouchableOpacity } from 'react-native';
import { CustomText } from './src/customText.js';
import { logoutUser } from './src/api.js';
import { View } from 'react-native'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  const isLoggedIn = useGlobalIsLoggedIn()
  const netInfo = useNetInfo();

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
    isLoggedIn.isLoggedInVal ? (
      <LoggedInScreens />
    ) : <NotLoggedInScreens />
    //<LoggedInScreens />
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

function getVisible(route) {
  const routeTest = getFocusedRouteNameFromRoute(route) == 'NewDevice'

  return !routeTest
}

export function LoggedInScreens() {
  const scheme = useColorScheme();
  const window = Dimensions.get('window')

  return (
    <NavigationContainer>
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
        drawerType: 'front',
      }} drawerContent={props => {
        return (
          <DrawerContentScrollView {...props} contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
            marginBottom: 10
          }}>
            <View>
              <DrawerItemList {...props} />
            </View>
            <DrawerItem label="Logout" onPress={async () => {
              await logoutUser()
              accessGlobalIsLoggedIn().setFalse();
            }} style={{
              height: 50,
              justifyContent: 'center',

            }} labelStyle={{
              fontFamily: 'Manrope_500Medium',
              fontSize: 18,
              color: "#FFFFFF",
            }} inactiveBackgroundColor="#FE0000" />
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name="Devices" component={DevicesScreens} options={({ route }) => ({
          headerShown: getVisible(route),
        })} />
        <Drawer.Screen name="Automations" component={AutomationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export function DevicesScreens() {
  return (
    <Stack.Navigator headerMode="none" screenOptions={{

    }}>
      <Stack.Screen name="DevicesView" component={DevicesScreen} />
      <Stack.Screen name="ActiveDevice" component={ActiveDevice} />
      <Stack.Screen name="NewDevice" component={NewDevice} options={{
        cardStyleInterpolator: Platform.OS == "ios" ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forRevealFromBottomAndroid,

      }} />
    </Stack.Navigator>
  )
}