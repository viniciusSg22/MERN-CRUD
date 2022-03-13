import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ReadOne({ route, navigation }) {
  const { id } = route.params;

  const [obj, setObj] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/readOne/${id}`)
      .then((res) => setObj(res.data));
  }, []);

  function handleDeletePress() {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => navigation.navigate("Home"));
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <ul>
          <li>{obj._id}</li>
          <li>{obj.name}</li>
          <li>{obj.age}</li>
          <li>{obj.gender}</li>
        </ul>
        <View style={styles.display}>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#fff" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDeletePress}>
            <Text style={{ color: "#fff" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
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
