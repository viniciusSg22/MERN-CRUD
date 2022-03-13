import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Views/Home";
import ReadOne from "./Views/ReadOne";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ReadOne" component={ReadOne} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}