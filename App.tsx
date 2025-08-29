/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './src/screens/Profile';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Menu from './src/screens/Menu';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Panel from './src/screens/Panel';
import ProjectData from './src/screens/ProjectData';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { ProjectsProvider } from './src/context/ProjectsContext';
import { useContext, useEffect } from 'react';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  
  return (
    <ProjectsProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 80,
            elevation: 5, // sombra en Android
          },
          tabBarActiveTintColor: '#4394f1ff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Menu"
          component={Menu}
          options={{
            title: 'Proyectos',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="dashboard" size={size} color={color} />
            ),
          }}
        /><Tab.Screen
          name="Panel"
          component={Panel}
          options={{
            title: 'Panel General',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="view-carousel" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </ProjectsProvider>
  )
};

function AppContent() {
  const { authenticated, restoreSession} = useContext(AuthContext);

  useEffect(()=>{
    restoreSession();
  },[]);

  return (
    <NavigationContainer>
      
      <Stack.Navigator screenOptions={{ headerShown: false }}>
  {!authenticated ? (
    <Stack.Screen name="Login" component={Login} />
  ) : (
    <>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Project" component={ProjectData} options={{ headerShown: true }} />
    </>
  )}
</Stack.Navigator>

    </NavigationContainer>
  );
}


export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AuthProvider>
      <ProjectsProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </ProjectsProvider>
    </AuthProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4fdffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
