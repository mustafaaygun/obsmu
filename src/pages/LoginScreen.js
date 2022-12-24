import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Stack, TextInput, Avatar, Text } from "@react-native-material/core";
import SQLite, { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
const App = () => {
  useEffect(() => {
    SQLite.enablePromise(true);
    SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
      .then(db => console.log('Database opened:', db))
      .catch(e => console.log(e));
  }, []);
  return (
    <SafeAreaView>
      <Stack spacing={12} style={{ margin: 26 }}>
        <Avatar image={{ uri: "https://atauni.edu.tr/images/logo-3.png" }} size={100} style={{ alignSelf: 'center' }} />
        <Text variant='overline'>ÖBS MOBİL APP</Text>
        <TextInput
          label="TC Kimlik No"
        />
        <TextInput
          label="Parola"
        />
        <Button color='#292559' title="GİRİŞ YAP" onPress={() => alert("🎉🎉🎉")} />
        <Text variant='caption' color='#292559'>Kayıt Ol</Text>
      </Stack>
    </SafeAreaView>
  )
};

export default App;
