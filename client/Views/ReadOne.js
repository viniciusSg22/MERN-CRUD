import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

export default function ReadOne({ route, navigation }) {
  const { id } = route.params;

  const [obj, setObj] = useState({});
  const [check, setCheck] = useState(Boolean);

  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/readOne/${id}`)
      .then((res) => setObj(res.data));
  }, []);

  function handleDeletePress() {
    // WEB
    if (window.confirm("Deseja realmente deletar esse post?")) {
      axios
        .delete(`http://localhost:3001/delete/${id}`)
        .then(() => navigation.navigate("Home"));
    } else {
      window.alert("O post não foi deletado");
    }
    // MOBILE
  }

  function handleEditPress() {
    const data = {
      title: newTitle,
      image: newImage,
      description: newDescription,
    };
    axios
      .put(`http://localhost:3001/update/${id}`, data)
      .then(() => navigation.navigate("Home"));
  }
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <ul>
          <li>{obj._id}</li>
          <li>{obj.title}</li>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: obj.image,
            }}
          />
          <li>{obj.description}</li>
        </ul>
        <View style={styles.display}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCheck(true)}
          >
            <Text style={{ color: "#fff" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDeletePress}>
            <Text style={{ color: "#fff" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      {check && (
        <View>
          <Text>Novo título</Text>
          <TextInput onChangeText={(newText) => setNewTitle(newText)} />
          <Text>Nova imagem</Text>
          <TextInput onChangeText={(newText) => setNewImage(newText)} />
          <Text>Nova descrição</Text>
          <TextInput onChangeText={(newText) => setNewDescription(newText)} />
          <View style={styles.display}>
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: "#fff" }} onPress={() => setCheck(false)}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: "#fff" }} onPress={handleEditPress}>
                Editar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  item: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#000",
    margin: 8,
    padding: 8,
  },
  button: {
    backgroundColor: "#123",
    padding: 8,
    margin: 8,
  },
  display: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
