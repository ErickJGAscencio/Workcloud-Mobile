import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@react-native-vector-icons/material-icons';

function Profile() {
    return (
        <SafeAreaView>
            <MaterialIcons name="home" size={20} color="#981446" />
            <Text>uwu Profile</Text>
        </SafeAreaView>
    )
}

export default Profile