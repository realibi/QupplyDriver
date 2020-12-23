import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput } from 'react-native';
import Row from 'react-native-easy-grid/Components/Row';
import Grid from 'react-native-easy-grid/Components/Grid';
import Col from 'react-native-easy-grid/Components/Col';

import ImagePicker from 'react-native-image-picker'

const Feedback = (props) => {
    const [response, setResponse] = React.useState(null);
    const [message, setMessage] = React.useState('');

    return (
        <View style={{ padding: 10 }}>
            <Text style={{fontSize: 20}}>Сообщение:</Text>
            <TextInput
                autoFocus={true}
                onChangeText={text => setMessage(text)}
                value={message}
                style={{
                    borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 20,
                    marginBottom: 10,
                    borderRadius: 5
                }}
            />

            {response && (
                <View style={styles.image}>
                    <Image
                        style={{width: 380, height: 360}}
                        source={{uri: response.uri}}
                    />
                </View>
            )}

            <View style={styles.buttonView}>
                <Button
                    title="Выбрать изображение"
                    onPress={() =>
                        ImagePicker.launchImageLibrary(
                            {
                                mediaType: 'photo',
                                includeBase64: false,
                                maxHeight: 400,
                                maxWidth: 400,
                            },
                            (response) => {
                                setResponse(response);
                            },
                        )
                    }
                />
            </View>

            <View style={styles.buttonView}>
                <Button
                    title="Отправить отзыв"
                    style={{marginTop: 20}}
                    onPress={() =>{
                        setResponse(null);
                        setMessage('');
                        props.navigation.goBack();
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    buttonView: {
        marginTop: 20
    },
    image: {
        marginBottom: 10,
        alignItems: 'center',
    },
    response: {
        marginVertical: 16,
        marginHorizontal: 8,
    },
});

export default Feedback;
