/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Login from './src/screens/Login';
import Menu from './src/screens/Menu';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import ProjectData from './src/screens/ProjectData';

const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menú Principal' }} />
        <Stack.Screen name="Porject" component={ProjectData} options={{ title: 'Proyecto' }} />
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

export default App;
