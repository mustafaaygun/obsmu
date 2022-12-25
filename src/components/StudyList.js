import * as React from 'react';
import { FlatList, ScrollView,SafeAreaView } from 'react-native';
import { Stack, Text } from "@react-native-material/core";

const Item = ({ title }) => (
    <Text variant='caption'>● {title}</Text>
);

const App = () => {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );
    let data = [
        {
            id: 1,
            title: 'Matematik',
            
        }
    ];
    return (
<SafeAreaView style={{flex: 1}}>
        <FlatList
            data={data}
            renderItem={renderItem}
            ListHeaderComponent={<Text variant='overline'>DERSLERİM</Text>}
       
            keyExtractor={item => item.id}
        />
</SafeAreaView>
    );
}

export default App;