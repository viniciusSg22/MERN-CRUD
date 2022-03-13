import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [array, setArray] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/read").then((res) => {
      setArray(res.data);
    });
  }, []);

  function handleCreateButton() {
    const data = {
      name: name,
      age: age,
      gender: gender,
    };
    axios.post("http://localhost:3001/create", data).then(() => {
      console.log("Pessoa criada");
    });
  }

  function handleViewButton(_id) {
    navigation.navigate("ReadOne", { id: _id });
    console.log(_id);
  }
  return (
    <View style={styles.container}>
      <Text>Nome: </Text>
      <TextInput
        onChangeText={(newText) => setName(newText)}
        style={styles.input}
      />
      <Text>Idade: </Text>
      <TextInput
        onChangeText={(newText) => setAge(newText)}
        style={styles.input}
      />
      <Text>Gênero: </Text>
      <TextInput
        onChangeText={(newText) => setGender(newText)}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleCreateButton} style={styles.button}>
        <Text style={{ color: "#fff" }}>Criar</Text>
      </TouchableOpacity>
      <View>
        {array.map((x) => {
          return (
            <View style={styles.item} key={x._id}>
              <ul>
                <li>{x.name}</li>
                <li>{x.age}</li>
                <li>{x.gender}</li>
              </ul>
              <View style={styles.display}>
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={{ color: "#fff" }}
                    onPress={() => handleViewButton(x._id)}
                  >
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#123",
    padding: 8,
    margin: 8,
  },
  input: {
    backgroundColor: "#000",
    color: "#fff",
  },
  display: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  item: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#000",
    margin: 8,
    padding: 24
  },
});
