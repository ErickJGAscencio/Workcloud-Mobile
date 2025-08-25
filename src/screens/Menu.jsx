import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getProjectsByUser, getUserProfile } from '../services/ProjectsService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Menu() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function obtenerProyectos() {
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
        console.log("Token:", token);
        if (!token) throw new Error("Token no disponible");
      } catch (err) {
        console.error("Error obteniendo token:", err);
        return;
      }

      try {
        const res = await getUserProfile(token);
        console.log("Perfil:", res.data);

        const resp = await getProjectsByUser(res.data.id, token);
        console.log("(Menu)Respuesta:", resp);
        setProjects(resp);
      } catch (err) {
        console.error("Error en la carga de proyectos:", err);
      }
    }

    obtenerProyectos();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.contenedorInput}>
          <Text>Mis projectos</Text>
          <TextInput
            style={styles.input}
            onChangeText={() => ''}
            placeholder="Mi proyecto favorito"
          />
        </View>
        {/* <TextInput style={styles.input} onChangeText={() => ''} /> */}
        <TouchableOpacity style={styles.button} onPress={() => ''}>
          <Text style={styles.textButton}>+ Nuevo Proyecto</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filter}>
        <Text>Todos</Text>
        <Text>En progreso</Text>
        <Text>Finalizados</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        {projects ? (
          projects.map(item => (
            <TouchableOpacity key={item?.id} style={styles.card}>
              <Text>{item?.project_name}</Text>
              <View style={{ backgroundColor: '#cacacaff', width: '100%', height: 10, borderRadius: 10 }}>
                <View
                  style={{
                    backgroundColor: '#1e1e1e',
                    width: `${item?.progress ?? 0}%`,
                    height: 10,
                    borderRadius: 10,
                  }}
                />
              </View>
              <Text>{item?.due_date}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Cargando...</Text>
        )}
      </View>

    </SafeAreaView>
  );
}

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4fdffff',
    paddingInline: 15,
    paddingBlock: 20,
    // alignItems: 'center',

  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  filter: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginVertical: 10,
  },
  contenedorInput: {
    flexGrow: 1,
    minWidth: 200,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#d6d6d6ff',
    backgroundColor: '#fff',
    height: 40,
  },
  button: {
    backgroundColor: '#4394f1ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 40,
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c9c9c9ff',
    borderRadius: 10,
    padding: 15,
  },
});
