import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const login = async (username, password) => {
    if (!username.trim() || !password.trim()) {
      console.log('Campos vacíos, favor de llenar.');
      return false;
    }

    try {
      const res = await axios.post(
        'https://workcloud-api.onrender.com/auth/login/',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res?.data?.token) {
        await AsyncStorage.setItem('userToken', res.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
        setToken(res.data.token);
        setUserData(res.data.user);
        setAuthenticated(true);
        return true;
      } else {
        console.log('Respuesta inválida del servidor.');
        return false;
      }
    } catch (error) {
      console.error('Error en login:', error.response?.data || error.message);
      return false;
    }
  };

  const restoreSession = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUserData(JSON.parse(storedUser));
        setAuthenticated(true);
      }
    } catch (error) {
      console.error('Error restaurando sesión:', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    setToken(null);
    setUserData(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, userData, authenticated, login, restoreSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
