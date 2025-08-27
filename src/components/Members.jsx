import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Members({ members }) {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {members ? (
        members.map(item => (
          <View key={item.id} style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <View style={styles.iconUser}>
              <Text style={styles.iconLetter}>
                {item.username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text>{item.username}</Text>
          </View>
        ))
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>

  )
}

export default Members

const styles = StyleSheet.create({
  iconUser: {
    backgroundColor: '#1e1e1e',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  iconLetter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
