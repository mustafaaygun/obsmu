import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { View, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Button, Stack, TextInput, Avatar, Text, Pressable, Switch } from "@react-native-material/core";
import { MaterialDatetimePickerAndroid } from 'react-native-material-datetime-picker';
import SQLite, { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import AnnouncmentList from '../components/AnnouncmentList';
import StudyList from '../components/StudyList';
import GradeList from '../components/GradeList';
import { SelectList } from 'react-native-dropdown-select-list'
import { CommonActions } from '@react-navigation/native';
function HomeScreen({ navigation }) {

  const [db, setDb] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [curr, setCurr] = React.useState('');

  React.useEffect(() => {

    let unsubscribe = navigation.addListener('focus', () => {

      SQLite.enablePromise(true);
      SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
        .then(dbRes => {
          setDb(dbRes);
          dbRes.executeSql(
            `SELECT * FROM TBLDUYURULAR WHERE BYTDURUM=1;`,
          )
            .then(result => {
              if (result?.[0].rows.length > 0) {
                let currData = [];
                for (let index = 0; index < result?.[0].rows.length; index++) {
                  let item = result?.[0].rows.item(index);
                  currData.push({ id: item.LNGKOD, title: item.TXTAD });
                }
                setData(currData);
              }

            })
            .catch(e => {

            });
          dbRes.executeSql(
            `SELECT * FROM TBLYEMEKLER  WHERE TRHTARIH='${new Date().toISOString().slice(0, 10)}';`,
          )
            .then(result => {
              if (result?.[0].rows.length > 0) {
                let food = result?.[0].rows.item(0);
                setCurr(food.TXTAD);
              } else {
                setCurr('');
              }

            })
            .catch(e => {
              setCurr('');

            });
        })
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack fill style={{ margin: 12 }}>
      {AnnouncmentList(true, data, curr)}
    </Stack>
  );
}

const Stacks = createStackNavigator()



function CourseScreen({ navigation }) {
  const [db, setDb] = React.useState(null);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SQLite.enablePromise(true);
      SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
        .then(dbRes => {
          setDb(dbRes);
          dbRes.executeSql(
            `SELECT * FROM TBLDERSLER;`,
          )
            .then(result => {
              if (result?.[0].rows.length > 0) {
                let currData = [];
                for (let index = 0; index < result?.[0].rows.length; index++) {
                  let item = result?.[0].rows.item(index);
                  currData.push({ id: item.LNGKOD, title: item.TXTAD });
                }
                setData(currData);
              }
            })
            .catch(e => {
              //genericError(e);
            });


        })

    })
    return unsubscribe;


  }, [navigation]);

  return (
    <Stack fill style={{ margin: 12 }}>
      {StudyList(data)}
    </Stack>

  );
}

function GradeScreen({ navigation }) {
  const [db, setDb] = React.useState(null);
  const [curr, setCurr] = React.useState([]);
  const [LNGKOD, setLNGKOD] = React.useState('');

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      SQLite.enablePromise(true);
      SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
        .then(dbRes => {
          setDb(dbRes);
          dbRes.executeSql(
            `SELECT * FROM TBLAKTIFKULLANICI;`,
          )
            .then(result => {
              if (result?.[0].rows.length > 0) {
                let user = result?.[0].rows.item(0);



                dbRes.executeSql(
                  `SELECT D.TXTAD,N.LNGKOD,N.DBLVIZE,N.DBLFINAL FROM TBLNOTLAR N
                  INNER JOIN TBLDERSLER D ON D.LNGKOD=N.LNGDERSKOD
                  WHERE N.LNGOGRENCIKOD=${user.LNGOGRENCIKOD};`,
                )
                  .then(result => {


                    if (result?.[0].rows.length > 0) {

                      let currData = [];
                      for (let index = 0; index < result?.[0].rows.length; index++) {
                        let item = result?.[0].rows.item(index);
                        currData.push({ id: item.LNGKOD, title: item.TXTAD, vize: item.DBLVIZE, final: item.DBLFINAL });
                      }
                      setCurr(currData);
                    } else {
                      //setCurr('');

                    }
                  })
                  .catch(e => {
                    console.log(e)
                  });


              }
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => console.log(e));
    })
    return unsubscribe;

  }, [navigation]);

  return (
    <Stack fill style={{ margin: 12 }}>
      {GradeList(curr)}
    </Stack>
  );
}

function AnnouncementScreen({ navigation }) {
  const [db, setDb] = React.useState(null);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SQLite.enablePromise(true);
      SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
        .then(dbRes => {
          setDb(dbRes);
          dbRes.executeSql(
            `SELECT * FROM TBLDUYURULAR WHERE BYTDURUM=1;`,
          )
            .then(result => {
              if (result?.[0].rows.length > 0) {
                let currData = [];
                for (let index = 0; index < result?.[0].rows.length; index++) {
                  let item = result?.[0].rows.item(index);
                  currData.push({ id: item.LNGKOD, title: item.TXTAD });
                }
                setData(currData);
              }
            })
            .catch(e => {
              //genericError(e);
            });
        })
    });
    return unsubscribe;


  }, [navigation]);

  return (
    <Stack fill style={{ margin: 12 }}>
      {AnnouncmentList(false, data)}
    </Stack>
  );
}

function DinnerListScreen({ navigation }) {
  const [date, setDate] = React.useState(new Date());
  const [menu, setMenu] = React.useState('');

  const [db, setDb] = React.useState(null);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SQLite.enablePromise(true);
      SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
        .then(dbRes => {
          setDb(dbRes);

          dbRes.executeSql(
            `SELECT * FROM TBLYEMEKLER  WHERE TRHTARIH='${date.toISOString().slice(0, 10)}';`,
          )
            .then(result => {
              if (result?.[0].rows.length > 0) {
                let food = result?.[0].rows.item(0);
                setMenu(food.TXTAD);

              } else {
                setMenu('');
              }
            })
            .catch(e => {
              setMenu('');
            });


        })
        .catch(e => { console.log(e); });
    });
    return unsubscribe;

  }, [navigation]);

  const showDatePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: date,
      titleText: 'Yemek Tarihi',

      onConfirm: (date) => {
        setDate(date);
        db.executeSql(
          `SELECT * FROM TBLYEMEKLER  WHERE TRHTARIH='${date.toISOString().slice(0, 10)}';`,
        )
          .then(result => {

            if (result?.[0].rows.length > 0) {

              let food = result?.[0].rows.item(0);

              setMenu(food.TXTAD);

            } else {
              setMenu('');
            }
          })
          .catch(e => {
            setMenu('');
          });
      }
    });

  };


  return (
    <Stack spacing={16} fill style={{ margin: 12 }}>
      <Pressable onPress={showDatePicker}>
        <TextInput onPressIn={showDatePicker} label="Tarih" editable={false} value={date.toLocaleDateString()} />
      </Pressable>
      <TextInput label="Menü" value={menu} editable={false} onChangeText={setMenu} multiline={true} numberOfLines={4} />

    </Stack>
  );
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

  const logout = () => {
    SQLite.enablePromise(true);
    SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
      .then(dbRes => {
        dbRes.executeSql(
          `DELETE FROM TBLAKTIFKULLANICI`,
        )
          .then(result => {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'LoginScreen' },
                ],
              })
            );
          })
      })
  }
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ marginTop: 8, marginLeft: 8 }}>
        <Avatar image={{ uri: "https://atauni.edu.tr/images/logo-3.png" }} size={50} style={{ alignSelf: 'center' }} />
        <Text variant='caption'>ÖBS MOBİL APP</Text>
        <Stack spacing={6}>
        
        <Text variant='overline'>{props.username}</Text>
        <Text variant='overline'>{props.title}</Text>
        <Pressable onPress={logout}><Text variant='overline' style={{color:'red'}}>Çıkış Yap</Text></Pressable>
        </Stack>
      </View>
      {<DrawerItemList {...props} />}
      {/*lapsList(props)*/}
    </DrawerContentScrollView>
  );
}

function AddCourseScreen({ navigation }) {
  const [course, setCourse] = React.useState('');
  const [db, setDb] = React.useState(null);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SQLite.enablePromise(true);
      SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
        .then(dbRes => { setDb(dbRes); })
        .catch(e => { console.log(e); });
    });
    return unsubscribe;
  }, [navigation]);


  const save = () => {
    if (course && course.trim()) {

      db.executeSql(
        `INSERT OR REPLACE INTO TBLDERSLER
        (TXTAD) 
        VALUES
        ('${course}');`,
      )
        .then(result => {
          alert('Ekleme başarılı!');
        })
        .catch(e => {
          console.log(e);
        });

    } else {
      alert('Lütfen boş bırakmayınız');
    }

  };
  return (
    <Stack fill style={{ margin: 12 }}>
      <TextInput
        label="Ders Adı"
        value={course}
        onChangeText={setCourse}
      />
      <Button color='#292559' title="KAYDET" onPress={save} />
    </Stack>
  );
}

function AddAnnouncementScreen({ navigation }) {
  const [announcment, setAnnouncment] = React.useState('');
  const [db, setDb] = React.useState(null);
  const [checked, setChecked] = React.useState(true);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SQLite.enablePromise(true);
      SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
        .then(dbRes => { setDb(dbRes); })
        .catch(e => { console.log(e); });
    });
    return unsubscribe;
  }, [navigation]);


  const save = () => {
    if (announcment && announcment.trim()) {
      const status = checked ? 1 : 0;
      db.executeSql(
        `INSERT OR REPLACE INTO TBLDUYURULAR
        (TXTAD,BYTDURUM) 
        VALUES
        ('${announcment}',${status});`,
      )
        .then(result => {
          alert('Ekleme başarılı!');
        })
        .catch(e => {
          console.log(e);
        });

    } else {
      alert('Lütfen boş bırakmayınız');
    }

  };

  return (
    <Stack fill style={{ margin: 12 }}>
      <TextInput
        label="Duyuru içeriği"
        multiline={true}
        numberOfLines={4}
        value={announcment}
        onChangeText={setAnnouncment}
      />
      <Switch value={checked} trackColor={{ true: '#292559' }} thumbColor='#292559' onValueChange={() => setChecked(!checked)} />
      <Button color='#292559' title="KAYDET" onPress={save} />
    </Stack>
  );
}

function AddOrUpdateGradeScreen({ navigation }) {

  const [db, setDb] = React.useState(null);
  const [dataUser, setDataUser] = React.useState([]);
  const [dataLesson, setDataLesson] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(-1);
  const [selectedLesson, setSelectedLesson] = React.useState(-1);
  const [selectedType, setSelectedType] = React.useState(-1);
  const [grade, setGrade] = React.useState("");
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SQLite.enablePromise(true);
      SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
        .then(dbRes => {
          setDb(dbRes);
          dbRes.executeSql(
            `SELECT * FROM TBLKULLANICI WHERE BYTDURUM=1 AND BYTUNVAN=0;`,
          )
            .then(result => {
              if (result?.[0].rows.length > 0) {
                let currData = [];
                for (let index = 0; index < result?.[0].rows.length; index++) {
                  let item = result?.[0].rows.item(index);
                  currData.push({ key: item.LNGKOD, value: item.TXTAD + ' ' + item.TXTSOYAD, disabled: false });
                }
                setDataUser(currData);
              }
            })
            .catch(e => {
              //genericError(e);
            });

          dbRes.executeSql(
            `SELECT * FROM TBLDERSLER;`,
          )
            .then(result => {

              if (result?.[0].rows.length > 0) {
                let currData = [];
                for (let index = 0; index < result?.[0].rows.length; index++) {
                  let item = result?.[0].rows.item(index);
                  console.log(item)

                  currData.push({ key: item.LNGKOD, value: item.TXTAD, disabled: false });
                }
                setDataLesson(currData);
              } else {

              }
            })
            .catch(e => {
              console.log(e);
            });
        })
    });
    return unsubscribe;


  }, [navigation]);


  const save = () => {
    if (grade && grade.trim() && grade > 0 && selectedUser != -1 && selectedLesson != -1 && selectedType != -1) {
      let selected = 'DBLFINAL';
      if (selectedType == 1) {
        selected = 'DBLVIZE'
      }
      db.executeSql(
        `SELECT * FROM TBLNOTLAR WHERE LNGOGRENCIKOD=${selectedUser} AND LNGDERSKOD=${selectedLesson};`,
      ).then(result => {
        if (result?.[0].rows.length > 0) {
          db.executeSql(
            `UPDATE TBLNOTLAR SET ${selected}=${grade} WHERE LNGOGRENCIKOD=${selectedUser} AND LNGDERSKOD=${selectedLesson}`,
          )
            .then(result => {
              alert('Ekleme başarılı!');
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          db.executeSql(
            `INSERT INTO TBLNOTLAR
            (LNGOGRENCIKOD,LNGDERSKOD,${selected}) 
            VALUES
            (${selectedUser},${selectedLesson},${grade});`,
          )
            .then(result => {
              console.log(`INSERT INTO TBLNOTLAR
              (LNGOGRENCIKOD,LNGDERSKOD,${selected}) 
              VALUES
              (${selectedUser},${selectedLesson},${grade});`);
              alert('Ekleme başarılı!');
            })
            .catch(e => {
              console.log(e);
            });
        }
      })


    } else {
      alert('Lütfen boş bırakmayınız');
    }

  }

  const get = (val) => {

    if (selectedUser != -1 && selectedLesson != -1 && val != -1) {
      setGrade('');
      let selected = 'DBLFINAL';


      db.executeSql(
        `SELECT * FROM TBLNOTLAR WHERE LNGOGRENCIKOD=${selectedUser} AND LNGDERSKOD=${selectedLesson};`,
      ).then(result => {
        console.log('m')
        if (result?.[0].rows.length > 0) {
          let grade = result?.[0].rows.item(0);
          console.log(grade)
          if (val == 1) {
            setGrade(grade.DBLVIZE.toString());
          } else {
            if (grade.DBLFINAL == null) {
              setGrade('');
            } else {
              setGrade(grade.DBLFINAL.toString());
            }
          }
          //setCurr(food.TXTAD);
        } else {
          //setCurr('yok');
        }
      });
    }
  }
  const notData = [
    { key: 1, value: 'Vize', disabled: false },
    { key: 2, value: 'Final', disabled: false },
  ];
  return (
    <Stack spacing={16} fill style={{ margin: 12 }}>
      <SelectList
      boxStyles={{backgroundColor:'white'}}
      dropdownStyles={{backgroundColor:'white'}}
      inputStyles={{color:'black'}}
      dropdownTextStyles={{color:'black'}}
        setSelected={(val) => { setSelectedUser(val); get(val); }}
        data={dataUser}
        save="key"
        placeholder='Öğrenci Seçiniz'
      />
      <View style={{ marginTop: 8 }}></View>
      <SelectList
       boxStyles={{backgroundColor:'white'}}
       dropdownStyles={{backgroundColor:'white'}}
       inputStyles={{color:'black'}}
       dropdownTextStyles={{color:'black'}}
        setSelected={(val) => { setSelectedLesson(val); get(val); }}
        data={dataLesson}
        save="key"
        placeholder='Ders Seçiniz'
      />
      <View style={{ marginTop: 8 }}></View>
      <SelectList
       boxStyles={{backgroundColor:'white'}}
       dropdownStyles={{backgroundColor:'white'}}
       inputStyles={{color:'black'}}
       dropdownTextStyles={{color:'black'}}
        setSelected={(val) => { setSelectedType(val); get(val); }}
        data={notData}
        save="key"
        placeholder='Not Tipi Seçiniz'
      />
      <View style={{ marginTop: 8 }}></View>
      <TextInput
        keyboardType='numeric'
        label="Not"
        value={grade}
        onChangeText={setGrade}
      />

      <Button color='#292559' title="KAYDET" onPress={save} />
    </Stack>
  );
}

function UserConfirmationScreen({ navigation }) {
  const [selectedUser, setSelectedUser] = React.useState(-1);
  const [dataUser, setDataUser] = React.useState([]);
  const [db, setDb] = React.useState(null);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SQLite.enablePromise(true);
      SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
        .then(dbRes => {
          setDb(dbRes);
          dbRes.executeSql(
            `SELECT * FROM TBLKULLANICI WHERE BYTDURUM=0 AND BYTUNVAN=0;`,
          )
            .then(result => {
              if (result?.[0].rows.length > 0) {
                let currData = [];
                for (let index = 0; index < result?.[0].rows.length; index++) {
                  let item = result?.[0].rows.item(index);
                  currData.push({ key: item.LNGKOD, value: item.TXTAD + ' ' + item.TXTSOYAD, disabled: false });
                }
                setDataUser(currData);
              }
            })
            .catch(e => {
              //genericError(e);
            });

        })
    });
    return unsubscribe
  }, [navigation]);


  const save = () => {
    if (selectedUser != -1) {
      db.executeSql(
        `UPDATE TBLKULLANICI SET BYTDURUM=1 WHERE LNGKOD=${selectedUser}`,
      )
        .then(result => {

          alert('Öğrenci aktife çekildi');
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      alert('Lütfen boş bırakmayınız');
    }


  }


  return (
    <Stack spacing={16} fill style={{ margin: 12 }}>
      <SelectList
       boxStyles={{backgroundColor:'white'}}
       dropdownStyles={{backgroundColor:'white'}}
       inputStyles={{color:'black'}}
       dropdownTextStyles={{color:'black'}}
        setSelected={(val) => setSelectedUser(val)}
        data={dataUser}
        save="key"
        placeholder='Kullanıcı Seçiniz'

      />
      <View style={{ marginTop: 8 }}></View>


      <Button color='#292559' title="ONAYLA" onPress={save} />
    </Stack>
  );
}

function AddMenuScreen({ navigation }) {
  const [date, setDate] = React.useState(new Date());
  const [menu, setMenu] = React.useState('');

  const [db, setDb] = React.useState(null);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SQLite.enablePromise(true);
      SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
        .then(dbRes => {
          setDb(dbRes);

          dbRes.executeSql(
            `SELECT * FROM TBLYEMEKLER  WHERE TRHTARIH='${date.toISOString().slice(0, 10)}';`,
          )
            .then(result => {
              if (result?.[0].rows.length > 0) {
                let food = result?.[0].rows.item(0);
                setMenu(food.TXTAD);

              } else {
                setMenu('');
              }
            })
            .catch(e => {
              setMenu('');
            });


        })
        .catch(e => { console.log(e); });
    });
    return unsubscribe;
  }, [navigation]);

  const showDatePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: date,
      titleText: 'Yemek Tarihi',

      onConfirm: (date) => {
        setDate(date);
        db.executeSql(
          `SELECT * FROM TBLYEMEKLER  WHERE TRHTARIH='${date.toISOString().slice(0, 10)}';`,
        )
          .then(result => {

            if (result?.[0].rows.length > 0) {

              let food = result?.[0].rows.item(0);

              setMenu(food.TXTAD);

            } else {
              setMenu('');
            }
          })
          .catch(e => {
            setMenu('');
          });
      }
    });

  };
  const save = () => {
    if (menu && menu.trim()) {
      const currDate = date.toISOString().slice(0, 10);

      db.executeSql(
        `INSERT OR REPLACE INTO TBLYEMEKLER
        (TXTAD,TRHTARIH) 
        VALUES
        ('${menu}','${currDate}');`,
      )
        .then(result => {
          alert('Ekleme başarılı!');
        })
        .catch(e => {
          console.log(e);
        });

    } else {
      alert('Lütfen boş bırakmayınız');
    }
  };


  return (
    <Stack spacing={16} fill style={{ margin: 12 }}>
      <Pressable onPress={showDatePicker}>
        <TextInput onPressIn={showDatePicker} label="Tarih" editable={false} value={date.toLocaleDateString()} />
      </Pressable>
      <TextInput label="Menü" value={menu} onChangeText={setMenu} multiline={true} numberOfLines={4} />
      <Button color='#292559' title="KAYDET" onPress={save} />
    </Stack>
  );
}

export default function App() {
  const [db, setDb] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [LNGKOD, setLNGKOD] = React.useState('');
  const [titleType, setTitleType] = React.useState(-1);
  React.useEffect(() => {

    SQLite.enablePromise(true);
    SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
      .then(dbRes => {
        setDb(dbRes);
        dbRes.executeSql(
          `SELECT * FROM TBLAKTIFKULLANICI;`,
        )
          .then(result => {
            if (result?.[0].rows.length > 0) {
              let user = result?.[0].rows.item(0);
              setUsername(user.TXTADSOYAD);
              setTitleType(user.BYTUNVAN);
              setLNGKOD(user.LNGKOD);
              switch (user.BYTUNVAN) {
                case 0:
                  setTitle('ÖĞRENCİ');
                  break;
                case 1:
                  setTitle('ÖĞRETİM ÜYESİ/GÖREVLİSİ');
                  break;
                case 2:
                  setTitle('YÖNETİCİ');
                  break;
                default:
                  setTitle('');
                  break;
              }
            } else {
              alert('Kullanıcı adı veya parolanız hatalı!');
            }
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => console.log(e));
  }, []);

  if (titleType == -1) {
    return <Text>Yükleniyor</Text>
  } else {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} username={username} title={title} />} initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa' }} />
        
        {titleType == 0 ? <Drawer.Screen name="Grade" component={GradeScreen} options={{ title: 'Notlarım' }} /> : null}
        {titleType == 2 ? <Drawer.Screen name="UserConfirmation" component={UserConfirmationScreen} options={{ title: 'Kullanıcı Onayla' }} /> : null}
        {titleType == 2 ? <Drawer.Screen name="AddMenu" component={AddMenuScreen} options={{ title: 'Yemek Listesi Ekle/Güncelle' }} /> : null}
        {titleType == 2 ? <Drawer.Screen name="AddCourse" component={AddCourseScreen} options={{ title: 'Ders Ekle' }} /> : null}
        {titleType == 1 ? <Drawer.Screen name="AddOrUpdateGrade" component={AddOrUpdateGradeScreen} options={{ title: 'Not Gir/Güncelle' }} /> : null}
        {titleType == 2 ? <Drawer.Screen name="AddAnnouncement" component={AddAnnouncementScreen} options={{ title: 'Duyuru Ekle' }} /> : null}

        <Drawer.Screen name="Course" component={CourseScreen} options={{ title: 'Dersler' }} />
        <Drawer.Screen name="Announcement" component={AnnouncementScreen} options={{ title: 'Duyurular' }} />
        <Drawer.Screen name="DinnerList" component={DinnerListScreen} options={{ title: 'Yemek Listesi' }} />


      </Drawer.Navigator>
    );
  }
}