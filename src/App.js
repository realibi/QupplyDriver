import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import OrdersScreen from './screens/OrdersScreen';
import RouteScreen from './screens/RouteScreen';
import AddressesScreen from './screens/AdressesScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import OrderInfoScreen from './screens/OrderInfoScreen';
import {DrawerContent} from './screens/DrawerContent'
import InvoiceSignScreen from './screens/InvoiceSignScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import Colors from './Colors';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Geolocation from "react-native-geolocation-service";
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
console.disableYellowBox = ["Unable to symbolicate"];

const App: () => React$Node = () => {
    const timer = require('react-native-timer');
    const Drawer = createDrawerNavigator();
    const theme = {
        ...DefaultTheme,
        roundness: 1,
        colors: {
            ...DefaultTheme.colors,
            primary: Colors.primary,
            accent: '#f1c40f',
        },
    };

  return (
      <PaperProvider theme={theme}>
          <NavigationContainer>
            <Drawer.Navigator
                activeColor="#f0edf6"
                inactiveColor="#3e2465"
                barStyle={{
                    backgroundColor: Colors.primary,
                    height: 60,
                    borderWidth: 5,
                    borderColor: Colors.primary,
                    fontSize: 18
                }}
                initialRouteName="Login"
                drawerContent={props=><DrawerContent { ...props}/>}
            >
              <Drawer.Screen
                  name={'Login'}
                  component={LoginScreen}
              />
                <Drawer.Screen
                    name={'InvoiceSign'}
                    component={InvoiceSignScreen}
                />
              <Drawer.Screen
                  name="Orders"
                  component={OrdersScreen}
              />
              <Drawer.Screen
                  name="Route"
                  component={RouteScreen}
              />
              <Drawer.Screen
                  name="Addresses"
                  component={AddressesScreen}
              />
              <Drawer.Screen
                  name="Settings"
                  component={SettingsScreen}
              />
              <Drawer.Screen
                  name="OrderInfo"
                  component={OrderInfoScreen}
              />
                <Drawer.Screen
                    name="Feedback"
                    component={FeedbackScreen}
                />
            </Drawer.Navigator>
          </NavigationContainer>
      </PaperProvider>
  );
};

export default App;
