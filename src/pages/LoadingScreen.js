import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { ActivityIndicator, Stack, Text } from "@react-native-material/core";
import SQLite, { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
const App = ({ navigation }) => {
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
    db.transaction(function (txn) {
      txn.executeSql(`CREATE TABLE IF NOT EXISTS TBLKULLANICI(
        LNGKOD INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        TXTTCKIMLIKNO VARCHAR(11) NOT NULL UNIQUE,
        TXTPAROLA NVARCHAR(100) NOT NULL,
        TXTAD NVARCHAR(100) NOT NULL,
        TXTSOYAD NVARCHAR(100) NOT NULL,
        TXTTELEFONNO NVARCHAR(20) NOT NULL,
        TXTEMAIL NVARCHAR(150) NOT NULL,
        BYTUNVAN TINYINT NOT NULL,
        BYTPAROLADURUM TINYINT NOT NULL,
  		  BYTDURUM TINYINT NOT NULL
);`, []);
      txn.executeSql(`CREATE TABLE IF NOT EXISTS TBLDERSLER(
  LNGKOD INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  TXTAD NVARCHAR(100) NOT NULL
);`, []);
      txn.executeSql(`CREATE TABLE IF NOT EXISTS TBLDERSLER(
  LNGKOD INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  TXTAD NVARCHAR(100) NOT NULL
);`, []);
      txn.executeSql(`CREATE TABLE IF NOT EXISTS TBLDUYURULAR(
  LNGKOD INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  TXTAD NVARCHAR(100) NOT NULL UNIQUE,
BYTDURUM TINYINT NOT NULL
);`, []);
      txn.executeSql(`CREATE TABLE IF NOT EXISTS TBLNOTLAR(
  LNGKOD INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  LNGOGRENCIKOD INTEGER NOT NULL,
LNGDERSKOD INTEGER NOT NULL,
DBLVIZE DOUBLE NOT NULL,
DBLFINAL DOUBLE
);`, []);
      txn.executeSql(`CREATE TABLE IF NOT EXISTS TBLYEMEKLER(
  LNGKOD INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  TXTAD TEXT NOT NULL,
TRHTARIH DATE NOT NULL UNIQUE
);`, []);
      txn.executeSql(`CREATE TABLE IF NOT EXISTS TBLAKTIFKULLANICI(
	LNGOGRENCIKOD INTEGER NOT NULL,
  	TXTADSOYAD TEXT NOT NULL,
  	BYTUNVAN TINYINT NOT NULL
);`, []);

      //db.executeSql('DROP TABLE TBLKULLANICI')
    });


    db.executeSql(
      `SELECT * FROM TBLKULLANICI WHERE TXTTCKIMLIKNO='12345678121';`,
    )
      .then(result => {
        if (result?.[0].rows.length > 0) {
        } else {
          db.executeSql(
            `INSERT INTO TBLKULLANICI
      (TXTTCKIMLIKNO,TXTPAROLA,TXTAD,TXTSOYAD,TXTTELEFONNO,TXTEMAIL,BYTUNVAN,BYTPAROLADURUM,BYTDURUM) 
      VALUES
      ('12345678121','123456', 'Arda', 'AK', '5555555555','M@M.COM.TR',0,1,1);
      `,)
        }
      });

    db.executeSql(
      `SELECT * FROM TBLKULLANICI WHERE TXTTCKIMLIKNO='12345678122';`,
    )
      .then(result => {
        if (result?.[0].rows.length > 0) {
        } else {
          db.executeSql(
            `INSERT INTO TBLKULLANICI
        (TXTTCKIMLIKNO,TXTPAROLA,TXTAD,TXTSOYAD,TXTTELEFONNO,TXTEMAIL,BYTUNVAN,BYTPAROLADURUM,BYTDURUM) 
        VALUES
        ('12345678122','123456', 'Ak??n', 'AK', '5555555555','M@M.COM.TR',1,1,1);
        `,
          )
        }
      })

    db.executeSql(
      `SELECT * FROM TBLKULLANICI WHERE TXTTCKIMLIKNO='12345678123';`,
    )
      .then(result => {
        if (result?.[0].rows.length > 0) {
        } else {
          db.executeSql(
            `INSERT INTO TBLKULLANICI
          (TXTTCKIMLIKNO,TXTPAROLA,TXTAD,TXTSOYAD,TXTTELEFONNO,TXTEMAIL,BYTUNVAN,BYTPAROLADURUM,BYTDURUM) 
          VALUES
          ('12345678123','123456', 'Emrah', 'AK', '5555555555','M@M.COM.TR',2,1,1);
          `,
          )

        }
      })

    db.executeSql(
      `SELECT * FROM TBLAKTIFKULLANICI;`,
    )
      .then(result => recordsSelected(result))



    const recordsSelected = (result) => {


      if (result?.[0].rows.length > 0) {
        navigation.navigate('Navigation');
      } else {
        navigation.navigate('LoginScreen');
      }


      result?.[0].rows.raw().forEach((v, i) => console.info(v));
      const index = 0;
      const recordAtIndex = result?.[0].rows.item(index);
      console.info(`Record at Index ${index}: ${JSON.stringify(recordAtIndex)}`);

    };
  };
  return (
    <SafeAreaView style={{ backgroundColor: '#292559', flex: 1 }}>
      <Stack fill center spacing={4}>
        <Text variant='overline' color='#fff'>??BS MOB??L APP</Text>
        <ActivityIndicator size="large" color="#fff" />
      </Stack>
    </SafeAreaView>
  )
};

export default App;
