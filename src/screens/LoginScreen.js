import React, {useEffect, useState} from 'react';
import {Platform, Image, StyleSheet, Text, TextInput, View, Pressable, StatusBar} from 'react-native';
import axios from 'axios';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const LoginScreen = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [truckNumber, setTruckNumber] = useState('');
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        async function func(){
            console.log('Login useEffect()');
            const userStr = await AsyncStorage.getItem('currentUser');
            const user = JSON.parse(userStr);

            if (user !== null) {
                console.log("CURRENT USER FULLNAME: " + user.fullName);
                setCurrentUser(user);

                await requestLocationPermission();

                navigation.navigate('Orders');
            }
        }
        func();
    }, []);

    const requestLocationPermission = async () =>{
        console.log('requestLocationPermission()');
        let response = null;

        if(Platform.OS === 'ios'){
            response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else{
            response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if(response === 'granted'){
            console.log('Geolocation permission granted!');
            await locateCurrentPosition();
        }else{
            console.log('Geolocation permission is not granted!');
        }
    }

    const locateCurrentPosition = async () =>{
            await Geolocation.getCurrentPosition((position) => {
                const timer = require('react-native-timer');
                const minutes = 1;

                timer.setTimeout(
                    'sendLocationTimer',
                    async () => {
                        const userStr = await AsyncStorage.getItem('currentUser');
                        const user = JSON.parse(userStr);
                        console.log('timer activity started');
                        const url = 'http://itemsapi.pythonanywhere.com/drivers/' + user.id + '/';
                        await axios.put(
                            url,
                            {
                                'latitude': position.coords.latitude,
                                'longitude': position.coords.longitude
                            }
                        );
                        console.log('address to send: http://itemsapi.pythonanywhere.com/drivers/' + user.id + '/');
                        console.log('Current location sent to server!');
                        console.log('Sent location: ' + position.coords.latitude + ' ' + position.coords.longitude);
                        await requestLocationPermission();
                    },
                    minutes * 60 * 1000);
            },
            (error) => {
                // See error code charts below.
                console.log('Error on geolocation: ');
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    const login = async () => {
        const response = await axios.get('http://itemsapi.pythonanywhere.com/drivers/');
        const drivers = response.data;
        let driver;
        for(let i = 0; i < drivers.length; i++){
            console.log('DRIVER FOUND IN DATABASE: ' + JSON.stringify(drivers[i]));
            if(drivers[i].phone === phoneNumber && drivers[i].car_number === truckNumber){
                driver = {
                    id: drivers[i].id,
                    phone: drivers[i].phone,
                    carNumber: drivers[i].car_number,
                    fullName: drivers[i].fullname
                };
                break;
            }
        }

        if(driver !== null){
            setCurrentUser(driver);
            console.log("INFO ABOUT LOGGED USER: " + JSON.stringify(driver));
            await AsyncStorage.setItem('currentUser', JSON.stringify(driver));
            await requestLocationPermission();
            navigation.navigate('Orders');
        }

        setMessage('Пользователь не найден.');
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.primary}/>
            <View style={styles.header}>
                <View style={{textAlign: 'center', justifyContent: 'center', paddingTop: 140, paddingLeft: 20}}>
                    <Image
                        source={require('../static/img/logo-white.png')}
                        style={{
                            width: '90%',
                            resizeMode: 'contain'
                        }}
                    />
                </View>
                <Text style={styles.text_header}>Авторизация</Text>
            </View>
            <View style={styles.footer}>
                <View style={{marginBottom: 20}}>
                    <Text style={styles.text_footer}>Номер телефона</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name={'phone'}
                            color={Colors.primary}
                            size={23}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => setPhoneNumber(text)}
                        />
                    </View>
                </View>

                <Text style={styles.text_footer}>Гос. номер ТС</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name={'truck'}
                        color={Colors.primary}
                        size={23}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setTruckNumber(text)}
                    />
                </View>
                <View>
                    <Pressable
                        onPress={() => login()}
                        style={styles.signIn}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: '900'
                            }}
                        >Войти</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    header: {
        flex: 3,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 30
    },
    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a'
    },
    button: {
        alignItems: 'center'
    },
    signIn: {
        width: '100%',
        height: 50,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: Colors.primary
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default LoginScreen;
