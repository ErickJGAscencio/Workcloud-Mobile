import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProjectsContext } from "../context/ProjectsContext";

function Panel() {
    const { projects } = useContext(ProjectsContext);
    console.log('(PANEL): ', projects);
    const [activeProjects, setActiveProjects] = useState(
        projects
    );
    const [completedProjects, setCompletedProjects] = useState(
        projects.filter(project => project.is_completed === true)
    );

    const getDeadlineProjects = () => {
        const now = new Date();
        const threeWeeksFromNow = new Date();
        threeWeeksFromNow.setDate(now.getDate() + 21); // para 3 semanas adelante

        return threeWeeksFromNow.toLocaleDateString();
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }); // Ejemplo: "Jul 5"
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <View style={[styles.card, { width: '49%' }]}>
                    <Text style={styles.titleCard}>
                        <MaterialIcons name="account-tree" size={20} color="#1e1e1e" />
                        Proyectos{"\n"}Activos</Text>
                    <Text>{activeProjects.length}</Text>
                </View>
                <View style={[styles.card, { width: '49%' }]}>
                    <Text style={styles.titleCard}>
                        <MaterialIcons name="add-task" size={20} color="#1e1e1e" />
                        Proyectos{"\n"}Completados</Text>
                    <Text>{completedProjects.length}</Text>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.titleCard}>
                    <MaterialIcons name="linear-scale" size={20} color="#1e1e1e" />
                    Próximos Vencimientos
                </Text>
                <Text>(prox. 3 sem)</Text>
                {projects && (
                    projects
                        .filter(project => {
                            const due = new Date(project.due_date);
                            const now = new Date();
                            const deadline = new Date();
                            deadline.setDate(now.getDate() + 21);
                            return due >= now && due <= deadline;
                        })
                        .map(item => (
                            <View key={item.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>{item.project_name}</Text>
                                <Text>{formatDate(item.due_date)}</Text>
                            </View>
                        ))
                )}
            </View>

            <View style={styles.card}>
                <Text style={styles.titleCard}>
                    <MaterialIcons name="linear-scale" size={20} color="#1e1e1e" />
                    Vencidos</Text>
                {projects && (
                    projects.filter(project => new Date(project.due_date) <= new Date()).map(
                        item => (
                            <View key={item.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>{item.project_name}</Text>
                                <Text>{formatDate(item.due_date)}</Text>
                            </View>
                        )
                    )
                )
                }
            </View>
        </SafeAreaView>
    )
}

export default Panel;

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
        borderWidth: 1,
        borderColor: '#c9c9c9ff',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 8,
        elevation: 3,
    },
    titleCard: {
        fontSize: 20,
        fontWeight: 500
    }
});
