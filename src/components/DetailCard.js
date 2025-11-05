import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const DetailCard = ({ label, value, borderType = 'default' }) => {
  const getBorderStyle = () => {
    switch (borderType) {
      case 'portal':
        return {
          borderLeftColor: colors.primary,
          shadowColor: colors.primary,
          backgroundColor: colors.cardBackground,
        };
      case 'slime':
        return {
          borderLeftColor: colors.secondary,
          shadowColor: colors.secondary,
          backgroundColor: colors.cardBackground,
        };
      case 'space':
        return {
          borderLeftColor: '#6C5CE7',
          shadowColor: '#6C5CE7',
          backgroundColor: colors.cardBackground,
        };
      case 'laser':
        return {
          borderLeftColor: colors.accent,
          shadowColor: colors.accent,
          backgroundColor: colors.cardBackground,
        };
      case 'circuit':
        return {
          borderLeftColor: '#F39C12',
          shadowColor: '#F39C12',
          backgroundColor: colors.cardBackground,
        };
      default:
        return {
          borderLeftColor: colors.primary,
          shadowColor: colors.primary,
          backgroundColor: colors.cardBackground,
        };
    }
  };

  return (
    <View style={[styles.card, getBorderStyle()]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 5,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  value: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
});

export default DetailCard;