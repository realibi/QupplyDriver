import React from 'react';
import Orders from '../components/Orders/Orders';
import {StatusBar, Button, ScrollView, View, Text} from 'react-native';
import Colors from './../Colors'
import {Appbar} from 'react-native-paper'
import OrderInfo from '../components/OrderInfo/OrderInfo';
import GlobalStyles from '../GlobalStyles';

const OrderInfoScreen = ({navigation, route}) => {
    return (
        <View style={GlobalStyles.container}>
            <ScrollView style={{paddingTop: 24}}>
                <View style={GlobalStyles.header}>
                    <StatusBar backgroundColor={Colors.primary}/>

                    <Text style={GlobalStyles.text_header}>Подробности</Text>
                </View>

                <View style={GlobalStyles.footer}>
                    <OrderInfo navigation={navigation} order={ route.params.order }/>
                </View>
            </ScrollView>
        </View>
    )
}

export default OrderInfoScreen;
