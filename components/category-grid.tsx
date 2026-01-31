import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { CategoryCard } from './category-card';

export interface Category {
  id: string;
  name: string;
  icon: string;
  gradient: [string, string];
}

interface CategoryGridProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
  style?: ViewStyle;
  numColumns?: number;
  size?: 'small' | 'medium' | 'large';
}

export const CategoryGrid = ({
  categories,
  onCategoryPress,
  style,
  numColumns = 3,
  size = 'medium',
}: CategoryGridProps) => {
  const renderItem = ({ item }: ListRenderItemInfo<Category>) => (
    <CategoryCard
      name={item.name}
      icon={item.icon}
      gradient={item.gradient}
      onPress={() => onCategoryPress(item)}
      size={size}
      style={styles.card}
    />
  );

  return (
    <View style={[styles.container, style]}>
      <FlashList
        data={categories}
        renderItem={renderItem}
        numColumns={numColumns}
  // estimatedItemSize removed to fix type error
        keyExtractor={(item: Category) => item.id}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    padding: 12,
  },
  card: {
    margin: 6,
  },
});