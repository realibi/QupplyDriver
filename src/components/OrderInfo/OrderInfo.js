import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Button, Pressable} from 'react-native';
import Colors from '../../Colors';
import Row from 'react-native-easy-grid/Components/Row';
import Grid from 'react-native-easy-grid/Components/Grid';
import Col from 'react-native-easy-grid/Components/Col';
import axios from 'axios';
import GlobalStyles from '../../GlobalStyles';

const OrderInfo = (props) => {
    const [item, setItem] = useState({});
    const [itemAddress, setItemAddress] = useState({});
    let serverUrl = 'http://itemsapi.pythonanywhere.com';

    useEffect( () => {
        const apiItemsUrl = serverUrl + '/items/' + JSON.parse(props.order.item)[0].pk;

        axios.get(apiItemsUrl).then((resp) => {
            const selectedItem = resp.data;
            setItem(selectedItem);
            console.log('SELECTED ITEM: ' + JSON.stringify(selectedItem));
        });
    }, item);

    useEffect( () => {
        const apiAddressUrl = serverUrl + '/addresses/' + JSON.parse(props.order.address)[0].pk;
        console.log('address url: ' + apiAddressUrl);
        axios.get(apiAddressUrl).then((resp) => {
            const selectedItemAddress = resp.data;
            setItemAddress(selectedItemAddress);
        });
    }, []);

    return (
        <View style={ styles.orderItem }>
            <Grid>
                <Row>
                    <Col>
                        <View>
                            <Text style={styles.cityText}>{props.order.city}</Text>
                        </View>
                    </Col>
                    <Col>
                        <View>
                            <Text style={
                                    props.order.status === 'Ожидает' ? styles.newStatusText :
                                    props.order.status === 'Выполняется' ? styles.processingStatusText : styles.finishedStatusText
                            }>
                                {props.order.status}
                            </Text>
                        </View>
                    </Col>
                </Row>
                <Row>
                    <View>
                        <Text style={styles.descriptionText}>Адрес: {JSON.parse(props.order.address)[0].fields.name}</Text>
                        <Text style={styles.descriptionText}>Дата: {props.order.order_date}</Text>
                        <Text style={styles.descriptionText}>Кол-во: {props.order.count} шт.</Text>
                    </View>
                </Row>
                <Row>
                    <View style={{
                        marginTop: 20
                    }}>
                        <Text style={styles.cityText}>Информация о товаре:</Text>
                    </View>
                </Row>
                <Row>
                    <View>
                        <Text style={styles.descriptionText}>Название: {item.name}</Text>
                        <Text style={styles.descriptionText}>Категория: {item.item_type}</Text>
                        <Text style={styles.descriptionText}>Адрес загрузки: {itemAddress.name}</Text>
                        <Text style={styles.descriptionText}>Дата получения: {item.receive_date}</Text>
                        <Text style={styles.descriptionText}>Поставщик: {item.provider}</Text>
                        <Text style={styles.descriptionText}>Цена: {item.price} KZT</Text>
                        <Text style={styles.descriptionText}>Количество: {item.count} шт.</Text>
                        <Text style={styles.descriptionText}>Вес: {item.weight} кг</Text>
                    </View>
                </Row>
                <Row>
                    <View style={{
                        borderWidth: 2,
                        borderRadius: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        borderColor: Colors.primary
                    }}>
                        <Image
                            style={{
                                width: 342,
                                height: 400,
                                marginTop: 20,
                                borderRadius: 10
                            }}
                            source={{ uri: serverUrl + item.image }}
                        />
                    </View>
                </Row>

                {props.order.status === 'Ожидает' ?
                    <Row>
                        <View style={{marginTop: 10, marginBottom: 20, width: '100%'}}>
                            <Pressable
                                onPress={() => {
                                    let serverUrl = 'http://itemsapi.pythonanywhere.com';
                                    axios.put(serverUrl+'/orders/'+ props.order.id +'/', {status: 'Выполняется'})
                                        .then(r => {console.log(r)})
                                        .finally(()=>{props.navigation.navigate('OrderInfo', {order: props.order });});
                                }}
                                style={GlobalStyles.primaryButton}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 18,
                                        fontWeight: '900'
                                    }}
                                >Начать выполнение заказа</Text>
                            </Pressable>
                        </View>
                    </Row> :
                    props.order.status === 'Выполняется' ?
                        <Row>
                            <View style={{marginBottom: 20, width: '100%'}}>
                                <Pressable
                                    onPress={() => {
                                        props.navigation.navigate('InvoiceSign', {order: props.order});
                                    }}
                                    style={GlobalStyles.primaryButton}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 18,
                                            fontWeight: '900'
                                        }}
                                    >Завершить заказ</Text>
                                </Pressable>
                            </View>
                        </Row> :
                        <Row>
                            <View style={{marginTop: 10, marginBottom: 20, width: '100%'}}>
                                <Pressable
                                    onPress={() => {props.navigation.navigate('Feedback', {order: props.order});}}
                                    style={GlobalStyles.primaryButton}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 18,
                                            fontWeight: '900'
                                        }}
                                    >Оставить отзыв</Text>
                                </Pressable>
                            </View>
                        </Row>
                }
            </Grid>
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 10,
    },

    cityText: {
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
        color: Colors.text
    },

    newStatusText:{
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
        color: Colors.primary,
        textAlign: 'right'
    },

    finishedStatusText:{
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
        color: Colors.finishedOrder,
        textAlign: 'right'
    },

    processingStatusText:{
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
        color: Colors.processingOrder,
        textAlign: 'right'
    },

    descriptionText: {
        fontSize: 18,
        marginBottom: 5,
        color: Colors.text
    }
});

export default OrderInfo;
