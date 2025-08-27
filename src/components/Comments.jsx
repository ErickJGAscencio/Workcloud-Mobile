import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getCommtents } from '../services/ProjectsService';
import MaterialIcons from '@react-native-vector-icons/material-icons';

function Comments({ project }) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [refreshComments, setRefreshComments] = useState(true);

    useEffect(() => {
        async function getAllComments() {
            let token;
            try {
                token = await AsyncStorage.getItem('userToken');
                if (!token) throw new Error("Token no disponible");
            } catch (err) {
                console.error("Error obteniendo token:", err);
                return;
            }

            if (token && project.id) {
                try {
                    const response = await getCommtents(project.id, token);
                    setComments(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        if (refreshComments) {
            getAllComments();
            setRefreshComments(false);
        }
    }, [project.id, refreshComments]);

    const postComment = () => { }
    return (
        <View style={{display:'flex', flexDirection:'column'}}>
            <View >
                {comments.length > 0 ? (
                    comments.slice().reverse().map(comment => (
                        <View key={comment.id} >
                            <Text>{comment.user}: {comment.comment}</Text>
                        </View>
                    ))
                ) : (
                    <Text>Sin Comentarios</Text>
                )}
            </View>
            <View style={{ marginTop:20,  display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                    style={styles.input}
                    onChange={(e) => setComment(e.target.value)}
                />
                <TouchableOpacity style={styles.button} onPress={postComment} >
                    <MaterialIcons name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Comments

const styles = StyleSheet.create({
    input: {
        width:'80%',
        borderWidth: 1,
        borderColor: 'rgba(226, 226, 226, 1)',
        borderRadius: 10,
        color: '#1e1e1e',
        padding: 10
    },
    button: {
        backgroundColor: '#4394f1ff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    },
})