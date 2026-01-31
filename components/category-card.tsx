import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../constants/theme';

interface CategoryCardProps {
  name: string;
  icon: string;
  gradient: [string, string];
  onPress: () => void;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
}

export const CategoryCard = ({
  name,
  icon,
  gradient,
  onPress,
  style,
  size = 'medium',
}: CategoryCardProps) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          width: 80,
          iconSize: 24,
          fontSize: 12,
        };
      case 'large':
        return {
          width: 120,
          iconSize: 40,
          fontSize: 16,
        };
      default:
        return {
          width: 100,
          iconSize: 32,
          fontSize: 14,
        };
    }
  };

  const sizeStyle = getSize();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width: sizeStyle.width },
        style,
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={gradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.icon, { fontSize: sizeStyle.iconSize }]}>{icon}</Text>
        <Text style={[styles.name, { fontSize: sizeStyle.fontSize }]}>{name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  icon: {
    marginBottom: 8,
  },
  name: {
    color: Colors.light.text,
    fontWeight: '600',
    textAlign: 'center',
  },
});