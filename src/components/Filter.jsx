import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Filter() {
    const [filterOption, setFilterOption] = useState('in-progress');

    const handleFilterOption=(option)=>{
        setFilterOption(option)
    }

    return (
        <View style={styles.filter}>
            <TouchableOpacity onPress={()=>handleFilterOption('all')} style={[styles.buttonFilter, filterOption === 'all' ? (styles.filterActive):(styles.filterDesactive)]}>
                <Text style={[filterOption === 'all' ? ({color:'#fff'}):({color:'#111'})]}>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleFilterOption('in-progress')} style={[styles.buttonFilter, filterOption === 'in-progress' ? (styles.filterActive):(styles.filterDesactive)]}>
                <Text style={[filterOption === 'in-progress' ? ({color:'#fff'}):({color:'#111'})]}>En progreso</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleFilterOption('finished')} style={[styles.buttonFilter, filterOption === 'finished' ? (styles.filterActive):(styles.filterDesactive)]}>
                <Text style={[filterOption === 'finished' ? ({color:'#fff'}):({color:'#111'})]}>Finalizados</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleFilterOption('deleted')} style={[styles.buttonFilter, filterOption === 'deleted' ? (styles.filterActive):(styles.filterDesactive)]}>
                <Text style={[filterOption === 'deleted' ? ({color:'#fff'}):({color:'#111'})]}>Eliminados</Text>
            </TouchableOpacity>
        </View>);
}

export default Filter;

const styles = StyleSheet.create({
    filter: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        marginVertical: 10,
    },
    filterActive:{
        backgroundColor:'#4394f1ff'
    },
    filterDesactive:{
        backgroundColor:'#ffffffff'
    },
    buttonFilter:{
        padding:8,
        borderRadius:10,
        borderWidth:1,
        borderColor: '#dbdbdbff'
    },
});