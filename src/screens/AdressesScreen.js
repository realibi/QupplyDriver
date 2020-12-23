import React from 'react';
import {StatusBar} from 'react-native';
import Colors from '../Colors';
import {Appbar} from 'react-native-paper';

const AddressesScreen = ({navigation}) => {
    return (
        <>
            <StatusBar backgroundColor={Colors.primary}/>
            <Appbar.Header>
                <Appbar.Content title="Заказы" color={'#fff'}/>
                <Appbar.Action icon={'dots-vertical'} onPress={() => {navigation.openDrawer();}} />
            </Appbar.Header>
        </>
    )
}

export default AddressesScreen;
