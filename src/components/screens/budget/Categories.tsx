import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const staticCategories = [
  { name: 'Essentials', percentage: 34, color: '#4CAF50' },
  { name: 'Food & Entertainment', percentage: 20, color: '#FF9800' },
  { name: 'Health & Wellness', percentage: 14, color: '#2196F3' },
  { name: 'Shopping', percentage: 12, color: '#E91E63' },
  { name: 'Other', percentage: 20, color: '#9E9E9E' },
];

const CategoriesBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        {staticCategories.map((cat, index) => (
          <View
            key={index}
            style={[
              styles.barSegment,
              { backgroundColor: cat.color, width: `${cat.percentage}%` },
            ]}
          />
        ))}
      </View>
      <View style={styles.legendContainer}>
        {staticCategories.map((cat, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorCircle, { backgroundColor: cat.color }]} />
            <Text style={styles.legendText}>
              {cat.name} {cat.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  barContainer: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barSegment: {
    height: '100%',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  colorCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
});

export default CategoriesBar;
