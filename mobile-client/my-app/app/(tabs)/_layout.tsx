import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recipe Box',
          headerRight: () => (
            <Ionicons 
              name="flash" 
              size={24} 
              color="#4a90e2" 
              style={{ marginRight: 15 }}
            />
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}