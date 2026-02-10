import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const mockProducts = [
  {
    id: '1',
    title: 'Elegant Wedding Decor',
    price: 5000,
    image: 'https://example.com/wedding1.jpg',
    materials: ['Flowers', 'Lights', 'Drapes'],
  },
  {
    id: '2',
    title: 'Birthday Balloon Setup',
    price: 2000,
    image: 'https://example.com/birthday1.jpg',
    materials: ['Balloons', 'Streamers'],
  },
];

export default function CatalogScreen({ navigation, route }) {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{category} Decorations</Text>
      <FlatList
        data={mockProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={typeof item.image === 'number' ? item.image : { uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text>Price: ₹{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { marginBottom: 15, backgroundColor: '#fff', padding: 10, borderRadius: 10 },
  image: { width: '100%', height: 150, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
});
