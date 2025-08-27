import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from '../services/ProjectsService';

function Profile() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function obtenerProyectos() {
            let token;
            try {
                token = await AsyncStorage.getItem('userToken');
                if (!token) throw new Error("Token no disponible");
            } catch (err) {
                console.error("Error obteniendo token:", err);
                return;
            }

            try {
                const res = await getUserProfile(token);
                setData(res.data);
                console.log("Perfil:", res.data);
            } catch (err) {
                console.error("Error en la carga de proyectos:", err);
            }
        }

        obtenerProyectos();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 20, gap: 15, alignItems: 'center' }}>
                    <View style={styles.iconUser}>
                        <Text style={styles.iconLetter}>
                            {data && (data?.username.charAt(0).toUpperCase())}
                        </Text>
                    </View>
                    <Text>{data?.username}</Text>
                </View>
                <Text>{data?.email}</Text>
            </View>
            <TouchableOpacity style={{ display:'flex', flexDirection:'row', justifyContent:'center',alignItems:'center', gap:10, width: '100%', backgroundColor: '#1e1e1e', borderRadius: 10, padding: 10 }}>
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
