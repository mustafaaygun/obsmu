import * as React from 'react';
import { FlatList, View, SafeAreaView } from 'react-native';
import { Stack, Text, Divider } from "@react-native-material/core";


const App = () => {
    const renderItem = ({ item }) => {
        if (item.vize > 0 && item.final > 0) {
            let points = item.vize * 0.4 + item.final * 0.6;
            if (points >= 100 && points <= 90) {
                points = 'AA';
            } else if (points >= 85 && points <= 89) {
                points = 'BA';
            } else if (points >= 80 && points <= 84) {
                points = 'BB';
            } else if (points >= 75 && points <= 79) {
                points = 'CB';
            } else if (points >= 70 && points <= 74) {
                points = 'CC';
            } else if (points >= 65 && points <= 69) {
                points = 'DC';
            } else if (points >= 60 && points <= 64) {
                points = 'DD';
            } else if (points >= 50 && points <= 59) {
                points = 'FD';
            } else if (points >= 0 && points <= 49) {
                points = 'FF';
            }
            return <View style={{ marginTop: 8 }}>
                    <>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#292559', padding: 8 }}>
                            <Text variant='caption' color='#fff'>{item.title} - Vize</Text>
                            <Text variant='caption' color='#fff'>{item.vize}</Text>
                        </View>
                        <Divider leadingInset={16} color='#fff' />
                    </>
                    <>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#292559', padding: 8 }}>
                            <Text variant='caption' color='#fff'>{item.title} - Final</Text>
                            <Text variant='caption' color='#fff'>{item.final}</Text>
                        </View>
                        <Divider leadingInset={16} color='#fff' />
                    </>
                    <>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#292559', padding: 8 }}>
                            <Text variant='caption' color='#fff'>{item.title} - Puan</Text>
                            <Text variant='caption' color='#fff'>{points}</Text>
                        </View>
                        <Divider leadingInset={16} color='#fff' />
                    </>
                </View>
           
        } else {
            return <View style={{ marginTop: 8 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#292559', padding: 8 }}>
                        <Text variant='caption' color='#fff'>{item.title} - Vize</Text>
                        <Text variant='caption' color='#fff'>{item.vize}</Text>
                    </View>
                    <Divider leadingInset={16} color='#fff' />
                </View>
            
        }


    };
    let data = [
        {
            id: 1,
            title: 'Matematik',
            vize: 65,
            final: 80
        },
        {
            id: 2,
            title: 'Türkçe',
            vize: 55,
            final: 0
        }
    ];
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                ListHeaderComponent={
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#292559', padding: 8, marginBottom: 8 }}>
                        <Text variant='overline' color='#fff'>DERS ADI</Text>
                        <Text variant='overline' color='#fff'>NOT</Text>
                    </View>
                }


                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

export default App;