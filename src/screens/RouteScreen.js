import React from 'react';
import {StatusBar} from 'react-native';
import Colors from '../Colors';
import {Appbar} from 'react-native-paper';
import Route from '../components/Route/Route';

const RouteScreen = ({navigation}) => {
    return (
        <>
            <StatusBar backgroundColor={Colors.primary}/>
            <Appbar.Header>
                <Appbar.Content title="Маршрут" color={'#fff'}/>
                <Appbar.Action icon={'dots-vertical'} onPress={() => {navigation.openDrawer();}} />
            </Appbar.Header>

            <Route navigation={navigation}/>
        </>
    )
}

export default RouteScreen;
