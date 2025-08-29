import AsyncStorage from "@react-native-async-storage/async-storage"

export const saveSessionFlag = async (flag)=>{
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(flag));
}

export const getSessionFlag = async () =>{
    const value = await AsyncStorage.getItem('isLoggedIn');
    return JSON.parse(value);
}