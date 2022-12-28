// In App.js in a new project

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './src/pages/LoadingScreen';
import LoginScreen from './src/pages/LoginScreen';
import NavigationScreen from './src/pages/NavigationScreen';
import RegisterScreen from './src/pages/RegisterScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* LoadingScreen ilk olarak veritabanı tabloları oluşturulur varsa oluşmaz (CREATE TABLE IF NOT EXISTS)  
         kullanıcı önceden giriş yaptıysa direk anasayfaya yönlendir
         giriş yyapmadıysa giriş sayfasına
         */}
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false, statusBarHidden: true }} />
        {/* stack grup olmasının nedeni geri gelinebilr olması kayıt olduktyan sonra giriş ekranına gelebilir */}
        <Stack.Group>
          {/* Sqlite ile dbden kullanıcılar bulunursa giriş yapar yetkisine göre işlemler yapar pasif ise giriş yapamaz */}
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, statusBarHidden: true }} />
          {/* içeride aynı tc ile öğrenci yoksa kayıt yapılır */}
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Kayıt Ol', statusBarHidden: true }} />
        </Stack.Group>
        {/* Bilgiler sqlitedan çekilerek gerekli işlemler yapılır */}
        <Stack.Screen name="Navigation" component={NavigationScreen} options={{ headerShown: false, statusBarHidden: true }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;