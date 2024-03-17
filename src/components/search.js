import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useData } from '../hooks/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Search() {

    const{field, setField,query, setQuery} =useData()
    console.log(field)

    return (
        <>
            <View style={styles.seachWrapper}>
                <View style={styles.searchMain}>
                    <View style={styles.filter}>
                        
                        <View  style={styles.picker}>
                            <Picker
                               
                                selectedValue={field}
                                onValueChange={(itemValue) => setField(itemValue)}
                            >
                                <Picker.Item label="All" value="All" />
                                <Picker.Item label="Price" value="price" />
                                <Picker.Item label="vegetarian" value="vegetarian" />
                                <Picker.Item label="non-vegetarian" value="non_vegetarian" />
                                <Picker.Item label="fast food" value="fast_food"/>
                            </Picker>
                        </View>
                        <Text style={styles.filterIcon}>
                            <Icon name="filter" size={30} color={'gray'} />
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text>
                            <Icon name="search" size={20} color={'gray'} />
                        </Text>
                        <TextInput
                            style={styles.searchInput}
                            onChangeText={(value) => { setQuery(value) }}
                            type='email'
                            value={query}
                            placeholder={`Search In ${field}`}
                        />
                    </View>
                    <View >

                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({

    space: {
        flexDirection: 'row',
        justifyContent: 'left',
        borderWidth: 1,
        borderRadius: 20,
        padding: 8,
        gap: 10,
        borderColor:'#FBBD10'
    },
    searchInput: {

        width: 230,
    },
    filter: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20,
    },
    picker: {
        width: '90%',
        height:40
    },
    filterIcon:{
        marginTop:10,
    }



});
