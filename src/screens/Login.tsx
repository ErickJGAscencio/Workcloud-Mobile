import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Login = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.contenedorInputs}>
          <Text style={styles.titulo}>Iniciar Sesión</Text>
          <Text>Usuario/Correo</Text>
          <TextInput />
          <Text>Contraseña</Text>
          <TextInput />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Acceder</Text>
          </TouchableOpacity>
          <Text>¿No tienes una cuenta? <Text>Toca aquí</Text></Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4fdffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contenedorInputs: {
    backgroundColor: '#fff',
    width: 350,
    borderWidth: 1,
    borderColor: '#e1e1e1ff',
    elevation: 3,
    height: 650,
    justifyContent: 'center',
    padding: 25
  },
  titulo:{
    fontSize: 35,
    fontWeight: 600,
    marginBottom: 50
  },
  button:{
    backgroundColor: '#4394f1ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 100,
    marginVertical: 40
  },
  textButton:{
    color: '#fff'
  }
})