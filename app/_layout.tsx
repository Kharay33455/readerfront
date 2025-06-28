import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export const GlobalContext = createContext();

export default function RootLayout() {
  const [dimensions, SDimen] = useState(Dimensions.get("window"));
  const env = process.env.EXPO_PUBLIC_ENV;
  const BH = env === "DEV" ? process.env.EXPO_PUBLIC_BH_DEV : process.env.EXPO_PUBLIC_BH_PROD;


  const SetDimen = ()=>{
    if(dimensions.height === 0 || !dimensions.height){
      SDimen(Dimensions.get("screen"));
      SetDimen();
    }
  }
  useEffect(()=>{
    SetDimen();
  },[]);

  return (
    <SafeAreaView style={{flex:1}}>
      <GlobalContext.Provider value={{ "dimensions": dimensions, "BH": BH }}>
        <View>
          <Text style={GenStyles.logo}>
            Bank Statement Query Tool
          </Text>
        </View>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="details" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GlobalContext.Provider>
    </SafeAreaView>
  );
}

export const GenStyles = StyleSheet.create({
  logo: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "Helvetica, Arial"
  },
  pickWrap: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex:1,
    padding:20

  }
});