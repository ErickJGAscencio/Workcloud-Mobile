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
import { getProjectsByUser } from '../services/ProjectsService';

function Menu() {
  const [projects, setProjects] = useState([null]);

  useEffect(() => {
    async function obtenerProyectos() {
      const resp = await getProjectsByUser(1);
      console.log(resp);
      setProjects(resp);
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
        <Text>Por hacer</Text>
        <Text>En progreso</Text>
        <Text>Finalizados</Text>
      </View>
      <View>
        {projects != null &&
          projects.map(item => (
            <View key={item?.id} style={styles.card}>
              <Text>{item?.project_name}</Text>
              <Text>{item?.due_date}</Text>
            </View>
          ))}
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
    borderColor: '#e3e3e3ff',
    borderRadius: 10,
  },
});
