import React from 'react'
import { Text, View } from 'react-native'

function Stadistics({tasks, date}) {
    console.log(tasks)

    const calculateDays=(dueDate)=>{
        const diffDays = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
        return diffDays;
    }
  return (
    <View>
        <Text>Tareas Totales {tasks.length}</Text>
        <Text>Tareas Completadas {tasks.filter(task => task.is_completed == true).length}</Text>
        <Text>Días restantes {calculateDays(date)}</Text>
    </View>
  )
}

export default Stadistics