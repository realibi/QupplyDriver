import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AStorage from '../AStorage';

export const DrawerContent = (props) =>{
    return(
        <View style={{ flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.logoSection}>
                        <Image source={require('../static/img/logo.jpg')} />
                    </View>
                </View>

                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({color, size}) => (
                            <Icon name={'clipboard-text-outline'} color={color} size={size} />
                        )}
                        label={"Заказы"}
                        onPress={()=>{props.navigation.navigate('Orders')}}/>
                    <DrawerItem
                        icon={({color, size}) => (
                            <Icon name={'map-outline'} color={color} size={size} />
                        )}
                        label={"Маршрут"}
                        onPress={()=>{props.navigation.navigate('Route')}}/>
                    <DrawerItem
                        icon={({color, size}) => (
                            <Icon name={'map-marker-radius-outline'} color={color} size={size} />
                        )}
                        label={"Адресные объекты"}
                        onPress={()=>{props.navigation.navigate('Addresses')}}/>
                    <DrawerItem
                        icon={({color, size}) => (
                            <Icon name={'cog-outline'} color={color} size={size} />
                        )}
                        label={"Настройки"}
                        onPress={()=>{props.navigation.navigate('Settings')}}/>
                </Drawer.Section>
                <Drawer.Section>
                    <TouchableRipple>
                        <View style={styles.preference}>
                            <Text>Dark theme</Text>
                            <Switch/>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>

            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name={'arrow-left'} color={color} size={size} />
                    )}
                    label={"Sign out"}
                    onPress={()=>{
                        let aStorage = new AStorage();
                        aStorage.removeValue('currentUser');
                        props.navigation.navigate('Login');
                    }}/>
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    logoSection: {
        paddingTop: 15,
        paddingRight: 35,
        paddingLeft: 15,
        paddingBottom: 15
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
});
