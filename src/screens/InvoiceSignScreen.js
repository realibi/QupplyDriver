import React from 'react';
import {StatusBar, View} from 'react-native';
import Colors from '../Colors';
import {Appbar} from 'react-native-paper';
import InvoiceSign from '../components/InvoiceSign/InvoiceSign';

const InvoiceSignScreen = ({navigation, route}) => {
    return (
        <>
            <StatusBar backgroundColor={Colors.primary}/>
            <Appbar.Header>
                <Appbar.Content title="Подпись накладной" color={'#fff'}/>
                <Appbar.Action icon={'dots-vertical'} onPress={() => {navigation.openDrawer();}} />
            </Appbar.Header>
            <InvoiceSign navigation={navigation} order={route.params.order}/>
        </>
    )
}

export default InvoiceSignScreen;
