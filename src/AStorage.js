import AsyncStorage from '@react-native-async-storage/async-storage';

class AStorage {
    storeDataString = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            console.log(e);
        }
    }

    storeDataObject = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            console.log("SETTING OBJECT TO ASYNC STORAGE: " + jsonValue);
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log(e);
        }
    }

    getDataString = async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch(e) {
            console.log(e);
        }
    }

    getDataObject = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            if(jsonValue != null){
                console.log('ASTORAGE GET OBJECT: ' + jsonValue);
                return JSON.parse(jsonValue);
            }else{
                return null;
            }
        } catch(e) {
            console.log(e);
        }
    }

    removeValue = async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch(e) {
            console.log(e);
        }

        console.log('Done.')
    }
}

export default AStorage;
