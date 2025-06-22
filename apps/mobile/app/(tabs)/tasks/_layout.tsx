import { Stack } from "expo-router";
export const unstable_settings = {
  initialRouteName: "index",
};

export default function TasksLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: "Task Details",
          headerBackTitle: "Tasks",
        }}
      />
    </Stack>
  );
}
