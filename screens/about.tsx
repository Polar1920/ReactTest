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

export default function AboutScreen() {
  return (
    <View>
      <Text>Aplicacion React Native, basada en un to do list, para mostrar el uso del Framework - Desarrollo de Software VI - DP</Text>
    </View>
  );
}