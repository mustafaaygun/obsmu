import React, { useEffect,useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Stack, TextInput, Avatar, Text } from "@react-native-material/core";
import SQLite, { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
const App = ({navigation}) => {
  const [tc, setTc] = React.useState('12345678122');
  const [password, setPassword] = React.useState('123456');
  const [db, setDb] = React.useState(null);
 
  useEffect(() => {
    SQLite.enablePromise(true);
    SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
      .then(dbRes => { setDb(dbRes)})
      .catch(e => console.log(e));
  }, []);

  const login = () =>{

    db.executeSql(
      `SELECT * FROM TBLKULLANICI WHERE TXTTCKIMLIKNO='${tc}' AND TXTPAROLA='${password}';`,
    )
      .then(result => {
        if(result?.[0].rows.length > 0){
          let user = result?.[0].rows.item(0);
          if(user.BYTDURUM==1){
            setUser(user);
          }else{
            alert('Kullanıcı aktif olmadığı için giriş yapamaz!');
          }
          
        }else {
          alert('Kullanıcı adı veya parolanız hatalı!');
        }
      })
      .catch(e => {
        //genericError(e);
      });
  }

  const setUser = (user) => {


    db.executeSql(
      `INSERT OR REPLACE INTO TBLAKTIFKULLANICI
      (LNGOGRENCIKOD,TXTADSOYAD,BYTUNVAN) 
      VALUES
      (${user.LNGKOD},'${user.TXTAD + '' + user.TXTSOYAD}',${user.BYTUNVAN});`,
    )
      .then(result => {navigation.navigate('Navigation');})
      .catch(e => {
        console.log(e);
      });

  }

  return (
    <SafeAreaView>
      <Stack spacing={12} style={{ margin: 26 }}>
        <Avatar image={{ uri: "https://atauni.edu.tr/images/logo-3.png" }} size={100} style={{ alignSelf: 'center' }} />
        <Text variant='overline'>ÖBS MOBİL APP</Text>
        <TextInput
          label="TC Kimlik No"
          value={tc}
          onChangeText={setTc}
        />
        <TextInput
          label="Parola"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button color='#292559' title="GİRİŞ YAP" onPress={login} />
        <Text variant='caption' color='#292559'>Kayıt Ol</Text>
      </Stack>
    </SafeAreaView>
  )
};

export default App;
