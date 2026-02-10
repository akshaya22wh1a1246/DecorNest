import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';

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
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleBookService = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleSubmitBooking = () => {
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    Alert.alert(
      'Booking Confirmed!',
      `We will contact you shortly regarding ${selectedService?.name}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowBookingModal(false);
            setBookingDetails({ name: '', email: '', phone: '', date: '', message: '' });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => handleBookService(service)}
                  >
                    <Text style={styles.bookButtonText}>Book Service</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book {selectedService?.name}</Text>
            <Text style={styles.modalSubtitle}>Fill in your details</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              placeholderTextColor="#999"
              value={bookingDetails.name}
              onChangeText={(text) => setBookingDetails(prev => ({ ...prev, name: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Email *"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={bookingDetails.email}
              onChangeText={(text) => setBookingDetails(prev => ({ ...prev, email: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number *"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={bookingDetails.phone}
              onChangeText={(text) => setBookingDetails(prev => ({ ...prev, phone: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Preferred Date (DD/MM/YYYY)"
              placeholderTextColor="#999"
              value={bookingDetails.date}
              onChangeText={(text) => setBookingDetails(prev => ({ ...prev, date: text }))}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Additional Message"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              value={bookingDetails.message}
              onChangeText={(text) => setBookingDetails(prev => ({ ...prev, message: text }))}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowBookingModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleSubmitBooking}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: '#1E88E5',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
