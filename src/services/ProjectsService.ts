import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getProjectsByUser = async (id: number) => {
  const token = await AsyncStorage.getItem('userToken');
   const res = await axios.post(
      `https://workcloud-api.onrender.com/api/v1/${id}`,
      {}, // cuerpo vacío aquí se envian datos
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  return [res.data];
};
