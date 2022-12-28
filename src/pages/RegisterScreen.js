import React, { useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Button, Stack, TextInput, Text } from "@react-native-material/core";
import SQLite from 'react-native-sqlite-storage';
const App = ({ navigation }) => {
  const [ad, setAd] = React.useState('');
  const [soyad, setSoyad] = React.useState('');
  const [telefon, setTelefon] = React.useState('');
  const [tc, setTc] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [db, setDb] = React.useState(null);

  useEffect(() => {
    SQLite.enablePromise(true);
    SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
      .then(dbRes => { setDb(dbRes) })

  }, []);

  const save = () => {
    if (
      tc && tc.trim() &&
      password && password.trim() &&
      soyad && soyad.trim() &&
      telefon && telefon.trim() &&
      email && email.trim()
    ) {
      db.executeSql(
        `SELECT * FROM TBLKULLANICI WHERE TXTTCKIMLIKNO='${tc}';`,
      )
        .then(result => {
          if (result?.[0].rows.length > 0) {
            alert('Bu Tc kimlik no zaten kayıtlı!');
          } else {

            db.executeSql(
              `INSERT INTO TBLKULLANICI
          (TXTTCKIMLIKNO,TXTPAROLA,TXTAD,TXTSOYAD,TXTTELEFONNO,TXTEMAIL,BYTUNVAN,BYTPAROLADURUM,BYTDURUM) 
          VALUES
          ('${tc}','${password}', '${ad}', '${soyad}', '${telefon}','${email}',0,1,0);`,
            )
              .then(result => {
                setAd('');
                setSoyad('');
                setTelefon('');
                setTc('');
                setPassword('');
                setEmail('');
                alert('Ekleme başarılı');
              })


          }
        })

    } else {
      alert('Lütfen boş bırakmayınız');
    }

  }

  const setUser = (user) => {


    db.executeSql(
      `INSERT OR REPLACE INTO TBLAKTIFKULLANICI
      (LNGOGRENCIKOD,TXTADSOYAD,BYTUNVAN) 
      VALUES
      (${user.LNGKOD},'${user.TXTAD + '' + user.TXTSOYAD}',${user.BYTUNVAN});`,
    )
      .then(result => { navigation.navigate('Navigation'); })


  }
  /*(TXTTCKIMLIKNO,TXTPAROLA,TXTAD,TXTSOYAD,TXTTELEFONNO,TXTEMAIL,BYTUNVAN,BYTPAROLADURUM,BYTDURUM)  */
  return (
    <SafeAreaView>
      <ScrollView>
        <Stack spacing={12} style={{ margin: 26 }}>

          <Text variant='subtitle1' style={{ alignSelf: 'center' }}>KAYIT OL</Text>
          <TextInput
            label="Ad"
            value={ad}
            onChangeText={setAd}
          />
          <TextInput
            label="Soyad"
            value={soyad}
            onChangeText={setSoyad}
          />
          <TextInput
            label="TC Kimlik No"
            value={tc}
            onChangeText={setTc}
          />
          <TextInput
            label="Telefon"
            value={telefon}
            onChangeText={setTelefon}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            label="Parola"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button color='#292559' title="KAYIT OL" onPress={save} />

        </Stack>
      </ScrollView>
    </SafeAreaView>
  )
};

export default App;
