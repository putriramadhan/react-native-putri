import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import FormSignin from "./src/widgets/FormSignin";
import { ScrollView } from "react-native";
import { Provider  as PaperProvider} from "react-native-paper";
import ScreenProductDetail from "./src/screen/products/ScreenProductDetail";
import ScreenPenjualanCreate from "./src/screen/penjualan/ScreenPenjualanCreate";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenPenjualanSuccess from "./src/screen/penjualan/ScreenPenjualanSuccess";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
    <StatusBar
      backgroundColor="#fff"
      barStyle={"dark-content"}
      // showHideTransition={statusBarTransition}
      // hidden={hidden}
      animated={true}
    />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="ScreenPenjualanCreate"
          component={ScreenPenjualanCreate}
        />
        <Stack.Screen
          name="ScreenPenjualanSuccess"
          component={ScreenPenjualanSuccess}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
     // flex: 1,
     display: "flex",
     flexGrow: 1,
     // backgroundColor: "",
     marginHorizontal: 24, 
     justifyContent: "center",
     paddingVertical: 20,
     // marginTop: 50,
   },
     // containerCenter: {
  //   flexGrow: BASE_CONFIG_STYLE_FLEX_GROW_DEFAULT,
  //   marginHorizontal: BASE_CONFIG_STYLE_MARGIN_HORIZONTAL,

  //   gap: BASE_CONFIG_STYLE_GAP,
  //   paddingVertical: BASE_CONFIG_STYLE_PADDING_VERTICAL,
  // },
});
