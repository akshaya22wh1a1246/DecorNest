import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const eventCategories = [
  { id: 1, name: 'Haldi', icon: '💛' },
  { id: 2, name: 'Mehendi', icon: '🎨' },
  { id: 3, name: 'Sangeeth', icon: '🎵' },
  { id: 4, name: 'Wedding', icon: '💒' },
  { id: 5, name: 'Anniversary', icon: '💝' },
  { id: 6, name: 'Welcome Baby', icon: '🍼' },
  { id: 7, name: 'Baby Shower', icon: '👶' },
  { id: 8, name: 'Birthday', icon: '🎂' },
];

export default function EventsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Event Categories</Text>
        <Text style={styles.subtitle}>Choose your event type</Text>
        
        <View style={styles.grid}>
          {eventCategories.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.card}
              onPress={() => navigation.navigate('Products', { eventType: event.name })}
            >
              <Text style={styles.icon}>{event.icon}</Text>
              <Text style={styles.cardTitle}>{event.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
