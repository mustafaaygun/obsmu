// In App.js in a new project

import * as React from 'react';
import { View, Text,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './src/pages/LoadingScreen';
import StudentNavigation from './src/pages/StudentNavigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoadingScreen" component={StudentNavigation} options={{ headerShown:false,statusBarHidden:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;