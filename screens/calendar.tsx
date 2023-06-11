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

export default function CalendarScreen() {
  return (
    <View>
      <Text>Coming soon...</Text>
      <Text>Sube tus tareas a Google Calendar</Text>
      <Button title="Abrir Google Calendar" />
    </View>
  );
}