import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DatabaseProvider } from "@nozbe/watermelondb/react";
import { database } from "@/database";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DatabaseProvider database={database}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen options={{ headerShown: true }} name="question/[id]" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </DatabaseProvider>
    </SafeAreaProvider>
  );
}
