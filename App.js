import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addOrEditTask = () => {
    if (task.trim() === "") {
      Alert.alert("Fehler", "Die Aufgabe darf nicht leer sein");
      return;
    }

    // Update Aufgabe
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);

      setEditIndex(null); // Bearbeiten beenden
    }
    // Aufgabe hinzufügen
    else {
      setTasks([...tasks, task]);
    }

    setTask("");
  };

  const deleteTask = (index) => {
    // ausgewählte Aufgabe löschen
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  const editTask = (index) => {
    // welschen Bearbeitungmode: ausgewählte Aufgabe in Input laden
    setTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <View style={styles.conteiner}>
      <Text style={styles.text}>Task List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a Task..."
        value={task}
        onChangeText={setTask}
      />

      <Pressable onPress={addOrEditTask} style={styles.button}>
        <Text style={styles.buttonText}>
          {editIndex !== null ? "Update Task " : "Add Task"}
        </Text>
      </Pressable>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
              backgroundColor: "pink",
              borderRadius: 10,
            }}
          >
            <TouchableOpacity onPress={() => editTask(index)}>
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => deleteTask(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    padding: 70,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    fontSize: 16,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default App;
