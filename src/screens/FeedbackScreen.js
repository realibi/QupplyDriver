import React from 'react';
import {StatusBar, Button, ScrollView} from 'react-native';
import Colors from './../Colors'
import {Appbar} from 'react-native-paper'
import Feedback from '../components/Feedback/Feedback';

const FeedbackScreen = ({navigation, route}) => {
    return (
        <ScrollView>
            <StatusBar backgroundColor={Colors.primary}/>
            <Appbar.Header>
                <Appbar.Content title="Отзыв о заказе" color={'#fff'}/>
                <Appbar.Action icon={'dots-vertical'} onPress={() => {navigation.openDrawer();}} />
            </Appbar.Header>

            <Feedback navigation={navigation} order={ route.params.order }/>
        </ScrollView>
    )
}

export default FeedbackScreen;
