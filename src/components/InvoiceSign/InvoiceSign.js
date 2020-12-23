import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, Text, ScrollView} from 'react-native';
import Row from 'react-native-easy-grid/Components/Row';
import Grid from 'react-native-easy-grid/Components/Grid';
import Col from 'react-native-easy-grid/Components/Col';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import axios from 'axios';

const InvoiceSign = (props) => {
    const order = props.order;
    const [provider, setProvider] = useState({email: ''});
    const item = JSON.parse(props.order.item)[0];

    useEffect(() => {
        async function f() {
            let serverUrl = 'http://itemsapi.pythonanywhere.com';
            const url = serverUrl+'/users/'+ item.fields.provider +'/';
            console.log('GETTING PROVIDER: ' + url);
            const response = await axios.get(url);
            await setProvider(response.data);
        }
        f();
    }, []);

    return (
        <ScrollView>
            <Grid>
                <Row style={{height: 600}}>
                    <View style={styles.container}>
                        <View>
                            <RNSketchCanvas
                                text={[
                                    { text: provider.email, font: 'fonts/IndieFlower.ttf', fontSize: 30, position: { x: 250, y: 450 }, anchor: { x: 0, y: 0 }, coordinate: 'Absolute', fontColor: 'black' },
                                    { text: order.client_name, font: 'fonts/IndieFlower.ttf', fontSize: 30, position: { x: 330, y: 560 }, anchor: { x: 0, y: 0 }, coordinate: 'Absolute', fontColor: 'black' },
                                    { text: item.fields.name, font: 'fonts/IndieFlower.ttf', fontSize: 30, position: { x: 50, y: 810 }, anchor: { x: 0, y: 0 }, coordinate: 'Absolute', fontColor: 'black' },
                                    { text: item.fields.count.toString() + ' шт.', font: 'fonts/IndieFlower.ttf', fontSize: 30, position: { x: 230, y: 890 }, anchor: { x: 0, y: 0 }, coordinate: 'Absolute', fontColor: 'black' },
                                    { text: item.fields.price.toString() + ' KZT', font: 'fonts/IndieFlower.ttf', fontSize: 30, position: { x: 140, y: 965 }, anchor: { x: 0, y: 0 }, coordinate: 'Absolute', fontColor: 'black' },
                                    { text: (item.fields.price * item.fields.count).toString() + ' KZT', font: 'fonts/IndieFlower.ttf', fontSize: 30, position: { x: 270, y:1035 }, anchor: { x: 0, y: 0 }, coordinate: 'Absolute', fontColor: 'black' },
                                ]}
                                containerStyle={{ backgroundColor: 'transparent', width: 360, height: 600 }}
                                canvasStyle={{ backgroundColor: 'transparent', width: 360, height: 550 }}
                                defaultStrokeWidth={1}
                                undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Отменить</Text></View>}
                                clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Очистить</Text></View>}
                                saveComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Save</Text></View>}
                                strokeComponent={color => (
                                    <View style={[{ backgroundColor: color }]} />
                                )}
                                // saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Подписать</Text></View>}
                                // savePreference={() => {
                                //     return {
                                //         folder: 'QupplyDriver',
                                //         filename: 'invoice' + String(Math.ceil(Math.random() * 100000000)),
                                //         transparent: false,
                                //         imageType: 'png'
                                //     }
                                // }}
                                localSourceImage={{
                                    directory: '',
                                    filename: 'nakladnaya',
                                    mode: 'ScaleToFill',
                                    imageType: 'jpg',
                                    transparent: true
                                }}
                            />
                        </View>
                    </View>
                </Row>
                <Row>
                    <Col style={{padding: 10}}>
                        <Button
                            title={'Сброс'}
                            onPress={()=>{props.navigation.navigate('InvoiceSign', {order: props.order})}}
                        />
                    </Col>
                    <Col style={{padding: 10}}>
                        <Button
                            title={'Подписать'}
                            onPress={()=>{
                                let serverUrl = 'http://itemsapi.pythonanywhere.com';
                                axios.put(serverUrl+'/orders/'+ props.order.id +'/', {status: 'Выполнено'})
                                    .then(r => {console.log(r)})
                                    .finally(()=>{props.navigation.navigate('Orders')});
                            }}
                         />
                    </Col>
                </Row>
            </Grid>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    functionButton: {
        margin: 5, height: 40, width: 80,
        backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
    }
});

export default InvoiceSign;
