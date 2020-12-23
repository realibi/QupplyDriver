import React, {useState, useEffect} from 'react';
import { View, Text, Button, ScrollView, Platform } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Row from 'react-native-easy-grid/Components/Row';
import Grid from 'react-native-easy-grid/Components/Grid';
import Col from 'react-native-easy-grid/Components/Col';
import axios from 'axios';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import Colors from '../../Colors'
const GOOGLE_MAPS_APIKEY = 'AIzaSyCcHCB9lx35nurrIOy2KvphPIvmsflB4mE';
import AStorage from '../../AStorage';

const LocationMarker = (props) => {
    return(
        <Marker
            title={props.marker.name}
            description={
                props.myLocation ?
                    'Мое местоположение':
                    'Адрес доставки'
            }
            coordinate={{
                latitude: parseFloat(props.marker.latitude),
                longitude: parseFloat(props.marker.longitude)
            }}
            image={
                props.myLocation ?
                require('../../static/img/truck-64.png'):
                require('../../static/img/marker-64.png')
            }
        />
    );
}

const LocationItem = (props) => {
    return(
        <View style={{marginTop: 5, padding: 5}}>
            <Grid>
                <Row>
                    <Col>
                        <Text>{props.location.name}</Text>
                    </Col>
                    <Col style={{textAlign: 'right'}}>
                        <Button
                            title={'Показать'}
                            onPress={() => {

                            }}
                        />
                    </Col>
                </Row>
            </Grid>
        </View>
    );
}

const Route = (props) => {
    const [addresses, setAddresses] = useState([]);
    const [currentMarker, setCurrentMarker] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [initialPosition, setInitialPosition] = useState({
        latitude: 49.0,
        longitude: 67.00,
        latitudeDelta: 1.0,
        longitudeDelta: 40.0,
    });

    useEffect(()=>{
        let aStorage = new AStorage();
        const currentUser = aStorage.getDataObject('currentUser');
        if(currentUser !== null){
            loadData();
            requestLocationPermission();
        }else{
            props.navigation.navigate('Login');
        }
    }, []);

    const requestLocationPermission = async () =>{
        let response = null;

        if(Platform.OS === 'ios'){
            response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else{
            response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        console.log('location: ' + response);
        if(response === 'granted'){
            locateCurrentPosition();
        }
    }

    const locateCurrentPosition = () =>{
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);

                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 10,
                    longitudeDelta: 5,
                }

                setUserLocation(region);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    const loadData = async () => {
        let tempAddresses = [];
        const response = await axios.get('http://itemsapi.pythonanywhere.com/orders/')
        const orders = response.data;
        for(let i = 0; i < orders.length; i++) {
            const resp = await axios.get('http://itemsapi.pythonanywhere.com/addresses/' + JSON.parse(orders[i].address)[0].pk)
            tempAddresses.push({
                key: resp.data.id,
                name: resp.data.name,
                latitude: resp.data.latitude,
                longitude: resp.data.longitude
            })
        }
        setAddresses(tempAddresses);
    }

    return (
        <View>
            <View style={{padding: 0}}>
                <Button
                    title={'Обновить'}
                    onPress={() => {
                        loadData();
                    }}
                    color={'#004e97'}
                />

                <Button
                    title={'Мое положение'}
                    onPress={() => {
                        locateCurrentPosition();
                    }}
                    color={'#006dcb'}
                />
            </View>
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={userLocation ? userLocation : initialPosition}
                    region={userLocation ? userLocation : initialPosition}
                    style={{height: 350}}
                >
                    {
                        (currentMarker && userLocation) &&
                        <MapViewDirections
                            origin={userLocation}
                            destination={currentMarker}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="red"
                        />
                    }
                    {userLocation && <LocationMarker marker={userLocation} myLocation={true}/>}
                    {currentMarker && <LocationMarker marker={currentMarker}/>}
                </MapView>
            </View>
            <ScrollView style={{marginTop: 10}}>
                {addresses.map(item => (
                    <View style={{marginTop: 5, padding: 5}}>
                        <Grid>
                            <Row>
                                <Col>
                                    <Text>{item.name}</Text>
                                </Col>
                                <Col style={{textAlign: 'right'}}>
                                    <Button
                                        title={'Показать'}
                                        onPress={() => {
                                            setCurrentMarker(item);
                                        }}
                                        color={'#3498db'}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Route;
