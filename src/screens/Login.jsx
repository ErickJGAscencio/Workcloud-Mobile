import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const checkAPI = async () => {
    const data = {
      username: form.username,
      password: form.password,
    };

    if (data.username.trim() == '' || data.password.trim() == '') {
      console.log('Campos vacios, favor de llenar.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'https://workcloud-api.onrender.com/login/',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (res != null && res.data.token != null) {
        console.log('Respuesta:', res.data);
        try {
          await AsyncStorage.setItem('userToken', res.data.token);
          console.log('Token guardado correctamente');
        } catch (error) {
          console.error('Error al guardar el token:', error);
        }
        navigation.navigate('Menu');
      }
    } catch (error) {
      console.error(
        'Error en la llamada:',
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contenedorInputs}>
          <Text style={styles.titulo}>Iniciar Sesión</Text>
          <View style={styles.contenedorInput}>
            <Text>Usuario/Correo</Text>
            <TextInput
              style={styles.input}
              onChangeText={username => setForm({ ...form, username })}
            />
          </View>
          <View style={styles.contenedorInput}>
            <Text>Contraseña</Text>
            <TextInput
              style={styles.input}
              onChangeText={password => setForm({ ...form, password })}
            />
          </View>
          {loading ? (
            <Text>Cargando...</Text>
          ) : (
            <TouchableOpacity style={styles.button} onPress={checkAPI}>
              <Text style={styles.textButton}>Acceder</Text>
            </TouchableOpacity>
          )}
          <Text>
            ¿No tienes una cuenta? <Text>Toca aquí</Text>
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4fdffff',
    alignItems: 'center',
  },
  contenedorInputs: {
    backgroundColor: '#fff',
    width: '80%',
    borderWidth: 1,
    borderColor: '#e1e1e1ff',
    elevation: 3,
    height: 650,
    justifyContent: 'center',
    padding: 25,
  },
  contenedorInput: {
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#d6d6d6ff',
  },
  titulo: {
    fontSize: 35,
    fontWeight: 600,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#4394f1ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 100,
    marginVertical: 40,
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
  },
});
