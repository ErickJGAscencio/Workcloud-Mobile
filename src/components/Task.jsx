import MaterialIcons from '@react-native-vector-icons/material-icons'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'

function Task({ item, project }) {
    const [showDescription, setShowDescription] = useState(false);
    const [isChecking, setIsChecking] = useState(item.is_completed);
    const [assignedTo, setAssignedTo] = useState("");

    useEffect(()=>{
        if(item.assign_to != null){
            setAssignedTo(project.team_members.find(member => member.id == item.assign_to))
        }
    },[]);

    const checkingTask = () => {
        setIsChecking(!isChecking);
    }

    return (
        <View>
            <LinearGradient
                colors={[item.assign_to != null ? ('#4394f1ff') : ('#f1f1f1ff'), '#f1f1f1ff']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                locations={[0.10, 0.10]}
                style={[styles.card, showDescription ? (styles.openCard) : (styles.closeCard)]}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <MaterialIcons
                        onPress={() => checkingTask()}
                        name={isChecking ? "check-circle" : "radio-button-unchecked"}
                        size={20} color="#111"
                    />
                    <Text>{item.task_name}</Text>
                </View>
                <TouchableOpacity onPress={() => setShowDescription(prev => !prev)}>
                    <MaterialIcons
                        name={showDescription ? "expand-more" : "expand-less"}
                        size={20}
                        color={item.assign_to != null ? ('#f1f1f1ff') : ('#1e1e1e')}
                    />
                </TouchableOpacity>
            </LinearGradient>
            {showDescription &&
                <View style={[
                    styles.card, {
                    backgroundColor: 'rgba(216, 242, 255, 1)',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    display:'flex',
                    flexDirection:'column'
                }]}>
                    {assignedTo != "" &&
                        <Text>Asginado a {assignedTo.username}</Text>
                    }
                    <Text>{item.description}</Text>
                </View>
            }
        </View>
    )
}

export default Task

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        paddingBlock: 5,
        paddingInline: 10,
    },
    closeCard: {
        borderRadius: 50,
    },
    openCard: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    }
})