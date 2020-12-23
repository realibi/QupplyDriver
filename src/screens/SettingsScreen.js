import React, {useEffect, useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import Colors from '../Colors';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({navigation}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

    }, []);

    return (
        <View>

        </View>
    )
}

export default SettingsScreen;
