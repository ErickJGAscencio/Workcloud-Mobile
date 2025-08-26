import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { getTasks } from '../services/ProjectsService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProjectData() {
  const route = useRoute();
  const { project } = route.params || {};
  const [tasks, setTasks] = useState([]);
  
  
  useEffect(()=>{
    async function gettinTask(){
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error("Token no disponible");
      } catch (err) {
        console.error("Error obteniendo token:", err);
        return;
      }

      const res = await getTasks(project.id,token);
      setTasks(res);
      console.log("(PD res: ", res);
    }
    console.log(project);
    
    gettinTask();
  },[]);

  if (!project) {
    return <Text>No se recibió ningún proyecto</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>{project.project_name}</Text>
      <Text>Progreso: {project.progress}%</Text>
      <Text>Fecha límite: {project.due_date}</Text>

      <View style={styles.card}>
        <Text style={styles.titleCard}>Descripción</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.titleCard}>Progreso Global</Text>
        <View style={{ backgroundColor: '#cacacaff', width: '100%', height: 10, borderRadius: 10 }}>
          <View
            style={{
              backgroundColor: '#1e1e1e',
              width: `${project?.progress ?? 0}%`,
              height: 10,
              borderRadius: 10,
            }}
          />
        </View>
        <Text>{project.progress}% completado</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.titleCard}>Tareas</Text>
        {tasks?(
          tasks.map(item =>(
            <Text key={item.id}>{item.id}</Text>
          ))):(
            <Text>Cargando...</Text>
          )
        }
      </View>
      <View style={styles.card}>
        <Text style={styles.titleCard}>Comentarios</Text>

      </View>
      <View style={styles.card}>
        <Text style={styles.titleCard}>Archivos</Text>

      </View>
      <View style={styles.card}>
        <Text style={styles.titleCard}>Miembros del equipo</Text>

      </View>
      <View style={styles.card}>
        <Text style={styles.titleCard}>Estadísticas</Text>

      </View>
    </SafeAreaView>
  );
}

export default ProjectData

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4fdffff',
    paddingInline: 15,
    paddingBlock: 20,
    padding: 20,
    gap: 12,
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
    borderWidth: 1,
    borderColor: '#c9c9c9ff',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    elevation: 3,
  },
  titleCard: {
    fontSize: 20,
    fontWeight: 500
  }
});
