import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Button, Stack, TextInput, Avatar, Text, Pressable } from "@react-native-material/core";
import { MaterialDatetimePickerAndroid } from 'react-native-material-datetime-picker';
import SQLite, { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import AnnouncmentList from '../components/AnnouncmentList';
import StudyList from '../components/StudyList';
import GradeList from '../components/GradeList';
import { SelectList } from 'react-native-dropdown-select-list'
function HomeScreen({ navigation }) {
  let db;
  React.useEffect(() => {
    SQLite.enablePromise(true);
    SQLite.openDatabase({ name: 'rnSqliteSample.db', location: 'Documents' })
      .then(dbRes => { db = dbRes; dbOpened(); })
      .catch(e => genericError(e));
  }, []);

  const genericError = (e) => {
    console.log(e);
  }


  return (
    <Stack fill style={{ margin: 12 }}>
      {AnnouncmentList(true)}
    </Stack>
  );
}

function CourseScreen({ navigation }) {
  return (
    <Stack fill style={{ margin: 12 }}>
      {StudyList()}
    </Stack>

  );
}

function GradeScreen({ navigation }) {
  return (
    <Stack fill style={{ margin: 12 }}>
      {GradeList()}
    </Stack>
  );
}

function AnnouncementScreen({ navigation }) {
  return (
    <Stack fill style={{ margin: 12 }}>
      {AnnouncmentList()}
    </Stack>
  );
}

function DinnerListScreen({ navigation }) {
  return (
    <Stack fill style={{ margin: 12 }}>
      <Text variant='overline'>YEMEK LİSTESİ</Text>
    </Stack>
  );
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  console.log(props.username);
  

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ marginTop: 8, marginLeft: 8 }}>
        <Avatar image={{ uri: "https://atauni.edu.tr/images/logo-3.png" }} size={50} style={{ alignSelf: 'center' }} />
        <Text variant='caption'>ÖBS MOBİL APP</Text>
        <Text variant='overline'>{props.username}</Text>
        <Text variant='overline'>{props.title}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function AddCourseScreen({ navigation }) {
  return (
    <Stack fill style={{ margin: 12 }}>
      <TextInput
        label="Ders Adı"
      />
      <Button color='#292559' title="KAYDET" onPress={() => alert("🎉🎉🎉")} />
    </Stack>
  );
}

function AddOrUpdateGradeScreen({ navigation }) {
  const [selected, setSelected] = React.useState("");
  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ];
  return (
    <Stack spacing={16} fill style={{ margin: 12 }}>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        placeholder='Öğrenci Seçiniz'

      />
      <View style={{ marginTop: 8 }}></View>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        placeholder='Ders Seçiniz'
      />
      <View style={{ marginTop: 8 }}></View>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        placeholder='Not Tipi Seçiniz'
      />
      <View style={{ marginTop: 8 }}></View>
      <TextInput
        keyboardType='numeric'
        label="Not"
      />

      <Button color='#292559' title="KAYDET" onPress={() => alert("🎉🎉🎉")} />
    </Stack>
  );
}

function UserConfirmationScreen({ navigation }) {
  const [selected, setSelected] = React.useState("");
  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ];
  return (
    <Stack spacing={16} fill style={{ margin: 12 }}>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        placeholder='Kullanıcı Seçiniz'

      />
      <View style={{ marginTop: 8 }}></View>


      <Button color='#292559' title="ONAYLA" onPress={() => alert("🎉🎉🎉")} />
    </Stack>
  );
}

function AddMenuScreen({ navigation }) {
  const [date, setDate] = React.useState(new Date());
  const showDatePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: date,
      titleText: 'Select booking date',
      onChange: (date) => {
        console.log(date);
        setDate(date);
      },
      onConfirm: (date) => {
        console.log(date);
        setDate(date);
      }
    });
  };
  return (
    <Stack spacing={16} fill style={{ margin: 12 }}>
      <Pressable onPress={showDatePicker}>
        <TextInput onPressIn={showDatePicker} label="Tarih" editable={false} value={date.toLocaleDateString()} />
      </Pressable>
      <TextInput label="Menü" multiline={true} />
      <Button color='#292559' title="KAYDET" onPress={() => alert('kaydet')} />
    </Stack>
  );
}

export default function App() {
  const [db, setDb] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [titleType, setTitleType] = React.useState(-1);
  React.useEffect(() => {
    console.log('ilk giriş');
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
              setTitleType(user.BYTUNVAN)
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

  if(titleType == -1){
    return<Text>Yükleniyor</Text>
  }else
 {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} username={username} title={title}/>} initialRouteName="Home">
      {titleType == 0 ? <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa' }} /> : null}
      
      <Drawer.Screen name="AddOrUpdateGrade" component={AddOrUpdateGradeScreen} options={{ title: 'Not Gir/Güncelle' }} />

      {titleType == 2 ? <Drawer.Screen name="AddCourse" component={AddCourseScreen} options={{ title: 'Ders Ekle' }} />:null}
      {titleType == 2 ? <Drawer.Screen name="UserConfirmation" component={UserConfirmationScreen} options={{ title: 'Kullanıcı Onayla' }} />:null}
      {titleType == 2 ? <Drawer.Screen name="AddMenu" component={AddMenuScreen} options={{ title: 'Yemek Listesi Ekle/Güncelle' }} />:null}


      <Drawer.Screen name="Course" component={CourseScreen} options={{ title: 'Derslerim' }} />
      <Drawer.Screen name="Grade" component={GradeScreen} options={{ title: 'Notlarım' }} />
      <Drawer.Screen name="Announcement" component={AnnouncementScreen} options={{ title: 'Duyurular' }} />
      <Drawer.Screen name="DinnerList" component={DinnerListScreen} options={{ title: 'Yemek Listesi' }} />
    </Drawer.Navigator>
  );
}
}