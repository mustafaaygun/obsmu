import * as React from 'react';
import { FlatList, ScrollView,SafeAreaView } from 'react-native';
import { Stack, Text } from "@react-native-material/core";

const Item = ({ title }) => (
    <Text variant='caption'>● {title}</Text>
);

const App = (mealDay = false) => {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );
    let data = [
        {
            id: 1,
            title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        }
    ];
    return (
<SafeAreaView style={{flex: 1}}>
        <FlatList
            data={data}
            renderItem={renderItem}
            ListHeaderComponent={<Text variant='overline'>AKTİF DUYURULAR</Text>}
            ListFooterComponent={mealDay ? <Text variant='overline'>GÜNÜN YEMEĞİ</Text>:null}
            keyExtractor={item => item.id}
        />
</SafeAreaView>
    );
}

export default App;