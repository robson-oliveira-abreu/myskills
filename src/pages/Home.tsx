import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList,
} from "react-native"

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
    id: string;
    name: string;
}

export function Home() {
    const [newSkill, setNewSkill] = useState('')
    const [mySkills, setMyskills] = useState<SkillData[]>([])
    const [greeting, setGreeting] = useState('')

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }

        setMyskills(oldState => [...oldState, data])
    }

    useEffect(() => {
        const currentHour = new Date().getHours()
        if (currentHour < 12) {
            setGreeting('Good Morning')
        } else if (currentHour < 18) {
            setGreeting('Good Afternoon')
        } else {
            setGreeting('Good Evening')
        }
    }, [])

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Welcome, Robson
            </Text>

            <Text style={styles.greetings}>
                {greeting}
            </Text>

            <TextInput
                style={styles.input}
                placeholder='New Skill'
                placeholderTextColor='#555'
                onChangeText={setNewSkill}
            />

            <Button onPress={handleAddNewSkill} />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard skill={item.name} />
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingVertical: 70,
        paddingHorizontal: 30,

    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',

    },
    input: {
        backgroundColor: '#1f1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7,
    },
    greetings: {
        color: '#fff'
    }
})