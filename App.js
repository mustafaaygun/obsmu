// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './src/pages/LoadingScreen';
import LoginScreen from './src/pages/LoginScreen';
import StudentNavigation from './src/pages/StudentNavigation';
import RegisterScreen from './src/pages/RegisterScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false, statusBarHidden: true }} />

        <Stack.Group>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, statusBarHidden: true }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, statusBarHidden: true }} />
        </Stack.Group>


        <Stack.Screen name="Navigation" component={StudentNavigation} options={{ headerShown: false, statusBarHidden: true }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;