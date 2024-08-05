import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {

    setToken: async token => {
        try {
            return await AsyncStorage.setItem('@token', token);
        } catch (e) {
            return null;
        }
    },

    getToken: async () => {
        try {
            return await AsyncStorage.getItem('@token');
        } catch (e) {
            return null;
        }
    },

    set: async (key, value) => {
        try {
            return await AsyncStorage.setItem(key, value);
        } catch (e) {
            return null;
        }
    },

    get: async key => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (e) {
            return null;
        }
    },

    clearStorage: async () => {
        try {
            // return await AsyncStorage.clear();
            await AsyncStorage.removeItem('@user')
            await AsyncStorage.removeItem('@token')
        } catch (e) {
            return null;
        }
    },

    getStarted: async value => {
        try {
            return await AsyncStorage.setItem('@getstarted', value);
        } catch (e) {
            return null;
        }
    },


    setLanguage: async lng => {
        try {
            return await AsyncStorage.setItem('@language', lng);
        } catch (e) {
            return null;
        }
    },

    getLanguage: async () => {
        try {
            return await AsyncStorage.getItem('@language');
        } catch (e) {
            return null;
        }
    }
}
