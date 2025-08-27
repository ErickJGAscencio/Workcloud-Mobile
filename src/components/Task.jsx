import MaterialIcons from '@react-native-vector-icons/material-icons'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'

function Task({ item }) {
    const [showDescription, setShowDescription] = useState(false);
    const [isChecking, setIsChecking] = useState(item.is_completed);
    const checkingTask = () => {
        setIsChecking(!isChecking);
    }
    return (
        <View key={item.id}>
            <LinearGradient
                colors={[item.assign_to != null ? ('#007aff') : ('#f1f1f1ff'), '#f1f1f1ff']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                locations={[0.10, 0.10]}
                style={showDescription ? (styles.openCard) : (styles.closeCard)}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <MaterialIcons 
                        onPress={() => checkingTask()} 
                        name={isChecking ? "check-circle" : "radio-button-unchecked"}
                        size={20} color="#111"
                    />
                    <Text>{item.task_name}</Text>
                </View>
                <MaterialIcons
                    onPress={() => setShowDescription(prev => !prev)}
                    name={showDescription ? "expand-more" : "expand-less"}
                    size={20}
                    color={item.assign_to != null ? ('#f1f1f1ff') : ('#1e1e1e')}
                />
            </LinearGradient>
            {showDescription &&
                <View style={{
                    backgroundColor: 'rgba(216, 242, 255, 1)',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    justifyContent: 'space-between',
                    paddingInline: 10,
                    paddingBlock: 5,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10
                }}>
                    <Text>{item.description}</Text>
                </View>
            }
        </View>
    )
}

export default Task

const styles = StyleSheet.create({
    closeCard: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        borderRadius: 50,
        paddingInline: 10,
        paddingBlock: 5
    },
    openCard: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        paddingInline: 10,
        paddingBlock: 5,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    }
})