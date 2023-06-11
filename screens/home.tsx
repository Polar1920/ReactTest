import React, { useState, useEffect, useRef } from 'react';
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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Screen, ScreenStack } from 'react-native-screens';
//import { useNavigation } from 'react-navigation';
import Home from './home';
import ProfileScreen from './profile';
import CalendarScreen from './calendar';
import AboutScreen from './about';

type Note = {
  id: number;
  text: string;
  completed: boolean;
  color: string;
};

type Props = {
  color: string;
  onSelectColor: (color: string) => void;
};

export default function HomeScreen({navigation}) {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [tab, setTab] = useState('Por Hacer');
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  //const navigate = useNavigation();
  const Stack = createNativeStackNavigator();

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Cargar las notas guardadas al iniciar la aplicación
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveNotes = async (notes: Note[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNote = () => {
    const newNotes = [
      ...notes,
      { id: Date.now(), text: note, completed: false, color: '#ffffff' },
    ]; // Agrega un color blanco por defecto
    setNotes(newNotes);
    setNote('');
    saveNotes(newNotes);
  };

  const handleToggleComplete = (id: number) => {
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, completed: !note.completed };
      } else {
        return note;
      }
    });
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  const handleClearCompleted = () => {
    const newNotes = notes.filter((note) => !note.completed);
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  const handleOpenColorModal = (note: Note) => {
    setSelectedNote(note);
    setColorModalVisible(true);
  };

  const handleColorModalClose = () => {
    setSelectedNote(null);
    setColorModalVisible(false);
  };

  const handleColorSelect = (color: string) => {
    if (selectedNote) {
      setNotes(
        notes.map((note) =>
          note.id === selectedNote.id ? { ...selectedNote, color } : note
        )
      );
    }
    handleColorModalClose();
  };

  const filteredNotes = notes.filter((note) => {
    if (tab === 'Por Hacer') {
      return !note.completed;
    } else {
      return note.completed;
    }
  });

  const ColorModal = ({ visible, onSelectColor }) => {
    const colors = ['#ffffff', '#2196F3', '#ffc107', '#4caf50', '#f44336'];
  
    return (
      <Modal
        visible={visible}
        onRequestClose={handleColorModalClose}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Selecciona un color</Text>
          {colors.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => {
                onSelectColor(c);
              }}
              style={[
                styles.colorOption,
                { backgroundColor: c },
                selectedNote?.color === c && styles.selectedColorOption,
              ]}
            />
          ))}
        </View>
      </Modal>
    );
  };  

  return (
    <View style={styles.container}>
      <Button
        title="Menu"
        onPress={handleMenuClick}
      />
      {isOpen && (
        <View style={styles.menu}>
          <Button
            title="Perfil"
            onPress={() => {
              // Navigate to the ProfileScreen
              navigation.navigate('Profile', {data0: '10'})
            }}
          />
          <Button
            title="Calendario"
            onPress={() => navigation.navigate('Calendar', {data0: '10'})}
          />
          <Button
            title="Acerca de"
            onPress={() => navigation.navigate('About', {data0: '10'})}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una tarea"
          value={note}
          onChangeText={setNote}
        />
        <Button title="Agregar" onPress={handleAddNote} />
      </View>
      <View style={styles.tabContainer}>
        <Button
          title="Por Hacer"
          onPress={() => setTab('Por Hacer')}
          color={tab === 'Por Hacer' ? '#2196F3' : '#ccc'}
        />
        <Button
          title="Completadas"
          onPress={() => setTab('Completadas')}
          color={tab === 'Completadas' ? '#2196F3' : '#ccc'}
        />
      </View>
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.noteContainer,
              { backgroundColor: item.color },
              item.completed && styles.completedNoteContainer,
            ]}
          >
            <TouchableOpacity
              onPress={() => handleOpenColorModal(item)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                marginRight: 10,
                backgroundColor: item.color,
                borderColor: 'black',
                borderWidth: 2,
              }}
            />
            <TouchableOpacity
              style={styles.noteTextContainer}
              onPress={() => handleToggleComplete(item.id)}
            >
              <Text
                style={[
                  styles.noteText,
                  item.completed && styles.completedNoteText,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.clearContainer}>
        <Button
          title="Borrar Completadas"
          onPress={handleClearCompleted}
          color="#f44336"
        />
      </View>
      {selectedNote && (
        <ColorModal
          visible={colorModalVisible}
          onSelectColor={handleColorSelect}
        />
      )}
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
        marginTop: 20,
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
    }
});