import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen, ScreenStack } from 'react-native-screens';

export default function ProfileScreen({ navigation, route }) {
    return (
        <View>
            <Text>This is {route.params.data0}'s profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe tu nombre"
            />
            <Button title="Conectar con Google" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        fontSize: 18,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    completedNoteContainer: {
        opacity: 0.5,
    },
    noteTextContainer: {
        flex: 1,
    },
    noteText: {
        fontSize: 18,
    },
    completedNoteText: {
        textDecorationLine: 'line-through',
    },
    clearContainer: {
        marginTop: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#000',
    },
    selectedColorOption: {
        borderColor: '#fff',
    },
});