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
} from "react-native";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") {
      Alert.alert("Uyarı", "Boş görev girilemez");
      return;
    }

    setTasks([...tasks, task]);
    setTask("");
  };
  return (
    <View style={styles.conteiner}>
      <Text style={styles.text}>Görev Listesi</Text>
      <TextInput
        style={styles.input}
        placeholder="Görev Ekleniyiz"
        value={task}
        onChangeText={setTask}
      />
      <Pressable onPress={addTask} style={styles.button}>
        <Text style={styles.buttonText}>Görev Ekle</Text>
      </Pressable>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
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
  },
});

export default App;
