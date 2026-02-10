import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Get in touch with our team</Text>
        
        <View style={styles.infoSection}>
          <Text style={styles.label}>Email:</Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@decornest.com')}>
            <Text style={styles.link}>support@decornest.com</Text>
          </TouchableOpacity>
          
          <Text style={styles.label}>Phone:</Text>
          <TouchableOpacity onPress={() => Linking.openURL('tel:+1234567890')}>
            <Text style={styles.link}>+1 (234) 567-890</Text>
          </TouchableOpacity>
          
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.text}>123 Decor Street</Text>
          <Text style={styles.text}>Event City, EC 12345</Text>
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
    marginBottom: 30,
  },
  infoSection: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  link: {
    fontSize: 16,
    color: '#1E88E5',
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});
