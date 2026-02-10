import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const services = [
  {
    id: 1,
    name: 'Event Planning',
    description: 'Full-service event planning and coordination',
    price: 'Starting at $500',
    icon: '📋',
  },
  {
    id: 2,
    name: 'Decoration Setup',
    description: 'Professional decoration installation and setup',
    price: 'Starting at $200',
    icon: '🎨',
  },
  {
    id: 3,
    name: 'AR Preview Consultation',
    description: 'Personalized AR decoration preview sessions',
    price: 'Starting at $100',
    icon: '📱',
  },
  {
    id: 4,
    name: 'Custom Design',
    description: 'Custom decoration design services',
    price: 'Starting at $300',
    icon: '✨',
  },
];

export default function ServicesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Our Services</Text>
        <Text style={styles.subtitle}>Professional event decoration services</Text>
        
        <View style={styles.serviceList}>
          {services.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <Text style={styles.icon}>{service.icon}</Text>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Service</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  serviceList: {
    flexDirection: 'column',
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 40,
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E88E5',
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#1E88E5',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
