import { Stack } from "expo-router";


export default function Layout() {
  return (
    <Stack>

 <Stack.Screen
        name="index"
        options={{
        headerShown: false,
        animation: 'none',
        }}
        
      />


<Stack.Screen
        name="camRecord"
        options={{
        headerShown: false,
        animation: 'none',
        }}
        
      />

    </Stack>

  
  );
}