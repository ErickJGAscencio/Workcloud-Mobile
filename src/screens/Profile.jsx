import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from '../services/ProjectsService';
import { AuthContext } from '../context/AuthContext';

function Profile() {
    const { userData, logout } = useContext(AuthContext);
    const [data, setData] = useState(userData);

    console.log('PERFIL: ');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={{ display: 'flex', flexDirection: 'column', padding: 20, gap: 15, alignItems: 'center' }}>
                    <View style={styles.iconUser}>
                        <Text style={styles.iconLetter}>
                            {data?.username && (data?.username.charAt(0).toUpperCase())}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 25 }}>{data?.username}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 20, justifyContent: 'space-between' }}>
                    <Text>Correo: </Text>
                    <Text>{data?.email}</Text>
                </View>
            </View>
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, width: '100%', backgroundColor: '#1e1e1e', borderRadius: 10, padding: 10 }}
                onPress={logout}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Cerrar Sesión</Text>
                <MaterialIcons name="logout" size={20} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4fdffff',
        paddingInline: 15,
        paddingBlock: 20,
        padding: 20,
        gap: 12,
    },
    iconUser: {
        backgroundColor: '#1e1e1e',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    iconLetter: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    card: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#c9c9c9ff',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 8,
        elevation: 3,
    },
});
