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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 80,
          elevation: 5, // sombra en Android
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      /><Tab.Screen
        name="Panel"
        component={Panel}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="view-carousel" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
};

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen
          name="Project"
          component={ProjectData}
          // options={{ title: 'Proyecto', headerShown: true }}
          options={({ navigation }) => ({
            title: 'Proyecto',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateTask')}
                style={{
                  marginRight: 15,
                  flexDirection: 'row',
                  alignItems: 'center', // 👈 centra verticalmente
                  justifyContent: 'center',
                  backgroundColor: '#007AFF',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', marginRight: 6 }}>Nueva Tarea</Text>
                <MaterialIcons name="add" size={20} color="#fff" />
              </TouchableOpacity>

            ),
            headerShown: true

          })}
        />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
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
