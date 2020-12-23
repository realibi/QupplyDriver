import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../Colors';
import { Col, Row, Grid } from "react-native-easy-grid";

const Order = (props) => {
    const order = props.order;
    const item = JSON.parse(props.order.item)[0].fields;
    return (
        <View style={styles.orderItem}>
            <Grid>
                <Row>
                    <Col>
                        <View>
                            <Text style={styles.cityText}>{order.city}</Text>
                        </View>
                    </Col>
                    <Col>
                        <View>
                            <Text style={
                                order.status === 'Ожидает' ? styles.newStatusText :
                                    order.status === 'Выполняется' ? styles.processingStatusText : styles.finishedStatusText
                            }>
                                {order.status}
                            </Text>
                        </View>
                    </Col>
                </Row>
                <Row>
                    <View>
                        <Text style={styles.descriptionText}>Название: {item.name}</Text>
                    </View>
                </Row>
                <Row>
                    <View>
                        <Text style={styles.descriptionText}>Общий вес: {order.count * item.weight} кг</Text>
                    </View>
                </Row>
                <Row>
                    <View>
                        <Text style={styles.descriptionText}>Кол-во: {order.count}</Text>
                    </View>
                </Row>
            </Grid>
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
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

export default Order;
