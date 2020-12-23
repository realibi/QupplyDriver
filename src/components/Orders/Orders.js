import React, {useState, useEffect} from 'react';
import Order from './Order/Order';
import {Text, ActivityIndicator, View, FlatList, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Title} from 'react-native-paper';
import GlobalStyles from '../../GlobalStyles';
import axios from 'axios';

const Orders = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function f(){
            await loadOrders();
        }
        f();
    }, []);

    const loadOrders = async () =>{
        const userStr = await AsyncStorage.getItem('currentUser');
        if(userStr === null){
            props.navigation.navigate('Login');
        }
        const user = JSON.parse(userStr);

        fetch('http://itemsapi.pythonanywhere.com/orders/?driver=' + user.id)
            .then((response) => response.json())
            .then((json) => {
                setOrders(json);
                console.log("Check json: " + JSON.stringify(json[0]));
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    return (
        <View>
            <View style={{marginTop: 10, marginBottom: 20}}>
                <Pressable
                    onPress={() => loadOrders()}
                    style={GlobalStyles.primaryButton}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            fontWeight: '900'
                        }}
                    >Обновить</Text>
                </Pressable>
            </View>
            <View>
                {isLoading ? <ActivityIndicator/> :
                    orders.length>0 ?
                    (
                        <FlatList
                            data={orders}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => {props.navigation.navigate('OrderInfo', {order: item });}}
                                    android_ripple={{
                                        color: 'lightblue',
                                    }}
                                >
                                    <Order order={item}/>
                                </Pressable>
                            )}
                        />
                    ) :
                        <View>
                            <Title style={{textAlign: 'center', marginTop: '65%'}}>На данный момент заказов нет.</Title>
                            <Title style={{textAlign: 'center', marginTop: 10}}>Попробуйте обновить!</Title>
                        </View>
                }
            </View>
        </View>
    )
}

export default Orders;
