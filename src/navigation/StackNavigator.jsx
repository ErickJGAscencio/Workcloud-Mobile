import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from '../screens/Login';
import Menu from '../screens/Menu';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{title: 'Workcloud', }} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default StackNavigator;
