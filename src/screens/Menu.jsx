import React, { useCallback, useContext } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { ProjectsContext } from '../context/ProjectsContext';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Filter from '../components/Filter';

function Menu() {
  const { userData } = useContext(AuthContext);
  const { projects, setProjects } = useContext(ProjectsContext);
  const navigation = useNavigation();
  // const [projects, setProjects] = useState([]);

  useFocusEffect(
    useCallback(() => {
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
          const userId = userData.id;
          const resp = await getProjectsByUser(userId, token);
          console.log("(Menu)Respuesta:", resp);
          setProjects(resp);
        } catch (err) {
          console.error("Error en la carga de proyectos:", err);
        }
      }
      obtenerProyectos(); // tu función de fetch
    }, [])
  );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }); // Ejemplo: "Jul 5"
    };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.contenedorInput}>
          <TextInput
            style={styles.input}
            onChangeText={() => ''}
            placeholder="Mi proyecto favorito"
            placeholderTextColor="#888"
          />
          <MaterialIcons style={{display:'flex', position:'absolute', alignSelf:'flex-end', marginRight:10, top:10}} name="search" size={20} color="#888" />
          
        </View>
        <TouchableOpacity style={[styles.button, {display:'flex', flexDirection:'row', justifyContent:'space-between'}]} onPress={() => ''}>
          <MaterialIcons style={{ }} name="add" size={20} color="#ffffffff" />
          <Text style={styles.textButton}>
            Proyecto</Text>
        </TouchableOpacity>
      </View>
      <Filter />
      <ScrollView>

        <View style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {projects ? (
            projects.map(item => (
              <TouchableOpacity key={item?.id} style={styles.card} onPress={() => navigation.navigate('Project', { project: item })}>
                <View style={styles.cardUp}>
                  <Text style={styles.titleCard}>{item?.project_name}</Text>
                </View>
                <View style={styles.cardDown}>
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
                  <Text>Termina: {formatDate(item?.due_date)}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Cargando...</Text>
          )}
        </View>
      </ScrollView>
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
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    color:'#1e1e1e'
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
    borderWidth: 1,
    borderColor: '#c9c9c9ff',
    borderRadius: 10,
  },
  cardUp: {
    width: '100%',
    backgroundColor: '#eeeeeeff',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardDown: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  titleCard: {
    fontSize: 20,
    fontWeight: 500
  }
});
