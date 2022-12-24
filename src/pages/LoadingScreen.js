import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { ActivityIndicator, Stack, Text } from "@react-native-material/core";
import SQLite, { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
const App = () => {
  let db;
  useEffect(() => {
    SQLite.enablePromise(true);
    SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
      .then(dbRes => { db = dbRes; dbOpened(); })
      .catch(e => genericError(e));
  }, []);

  const genericError = (e) => {
    console.warn('Error: ' + JSON.stringify(e));
  };

  const dbOpened = () => {
    console.log('Creating table...');
    db.executeSql(
      `CREATE TABLE IF NOT EXISTS TBLKULLANICI(
        LNGKOD INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        TXTTCKIMLIKNO VARCHAR(11) NOT NULL UNIQUE,
        TXTAD NVARCHAR(100) NOT NULL,
        TXTSOYAD NVARCHAR(100) NOT NULL,
        TXTTELEFONNO NVARCHAR(20) NOT NULL,
        TXTEMAIL NVARCHAR(150) NOT NULL,
        BYTUNVAN TINYINT NOT NULL,
        BYTPAROLADURUM TINYINT NOT NULL,
  		  BYTDURUM TINYINT NOT NULL
);`,
    )
      .then(result => tableCreated(result))
      .catch(e => {
        genericError(e);
      });

      //db.executeSql('DROP TABLE TBLKULLANICI')
    console.log('Inserting records...');
    db.executeSql(
      `INSERT INTO TBLKULLANICI
      (TXTTCKIMLIKNO,TXTAD,TXTSOYAD,TXTTELEFONNO,TXTEMAIL,BYTUNVAN,BYTPAROLADURUM,BYTDURUM) 
      VALUES
      ('12345678122', 'MUSATAFA', 'AYGÜN', '5555555555','M@M.COM.TR',0,1,1);`,
    )
      .then(result => recordsInserted(result))
      .catch(e => {
        genericError(e);
      });




    db.executeSql(
      `SELECT * FROM TBLKULLANICI;`,
    )
      .then(result => console.log(result))
      .catch(e => {
        genericError(e);
      });
  };
  return (
    <SafeAreaView style={{ backgroundColor: '#292559', flex: 1 }}>
      <Stack fill center spacing={4}>
        <Text variant='overline' color='#fff'>ÖBS MOBİL APP</Text>
        <ActivityIndicator size="large" color="#fff" />
      </Stack>
    </SafeAreaView>
  )
};

export default App;
