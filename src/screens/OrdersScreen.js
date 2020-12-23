import React from 'react';
import Orders from '../components/Orders/Orders';
import {StatusBar, Button, View, Text, Pressable} from 'react-native';
import Colors from './../Colors'
import { Appbar } from 'react-native-paper';
import GlobalStyles from '../GlobalStyles';
import axios from 'axios';

const OrdersScreen = ({navigation}) => {
    return (
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.header}>
                <StatusBar backgroundColor={Colors.primary}/>
                {/*<Appbar.Header>*/}
                {/*    <Appbar.Content title="Заказы" color={'#fff'}/>*/}
                {/*    <Appbar.Action icon={'dots-vertical'} onPress={() => {navigation.openDrawer();}} />*/}
                {/*</Appbar.Header>*/}
                <Text style={GlobalStyles.text_header}>Заказы</Text>
            </View>
            <View style={GlobalStyles.footer}>
                <Orders navigation={navigation}/>
            </View>
        </View>
    )
}

export default OrdersScreen;
