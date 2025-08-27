import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { getTasks } from '../services/ProjectsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import LinearGradient from 'react-native-linear-gradient';
import Task from '../components/Task';
import Comments from '../components/Comments';
import { ScrollView } from 'react-native-gesture-handler';

function ProjectData() {
  const route = useRoute();
  const { project } = route.params || {};
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);


  useEffect(() => {
    async function gettinTask() {
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error("Token no disponible");
      } catch (err) {
        console.error("Error obteniendo token:", err);
        return;
      }

      const res = await getTasks(project.id, token);
      setMembers(project.team_members);
      setTasks(res);
      console.log("(PD res: ", res);
    }
    console.log(project);

    gettinTask();
  }, []);

  if (!project) {
    return <Text>No se recibió ningún proyecto</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.card}>
            <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.titleCard}>{project.project_name}</Text>
                <Text style={styles.titleCard}>{project.description}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => ''}>
                <MaterialIcons name="edit" size={20} color="#fff" />
                <Text style={styles.textButton}>Editar</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.titleCard}>Progreso General</Text>
            <Text>{project.progress}% completado</Text>
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

            <Text>Fecha límite: {project.due_date}</Text>
            <Text>Tareas: {tasks.length}</Text>
            <Text>Miembros: {project.team_members.length}</Text>
            <Text>Estatus: {project.is_completed ? ('Completado') : ('En progreso')}</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.headerCard}>
              <Text style={styles.titleCard}>Tareas</Text>
              <TouchableOpacity style={styles.button} onPress={() => ''}>
                <MaterialIcons name="add" size={20} color="#fff" />
                <Text style={styles.textButton}>Tarea</Text>
              </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasks ? (
                tasks.map(item => (
                  <Task key={item.id} item={item} project={project} />
                ))
              ) : (
                <Text>Cargando...</Text>
              )
              }
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.titleCard}>Comentarios</Text>
            <Comments project={project} />
          </View>
          <View style={styles.card}>
            <Text style={styles.titleCard}>Archivos</Text>

          </View>
          <View style={styles.card}>
            <Text style={styles.titleCard}>Miembros del equipo</Text>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {members ? (
                members.map(item => (
                  <View key={item.id} style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <Text>{item.username}</Text>
                  </View>
                ))) : (
                <Text>Cargando...</Text>
              )
              }
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.titleCard}>Estadísticas</Text>

          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
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
    display: 'flex',
    flexDirection: 'row',
    gap: 5
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
  headerCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBlock: 10
  },
  titleCard: {
    fontSize: 18,
    fontWeight: 500,
  }
});
