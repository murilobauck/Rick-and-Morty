import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const ThemedBorder = ({ children, borderType, style }) => {
  const getBorderStyle = () => {
    switch (borderType) {
      case 'portal':
        return styles.portalBorder;
      case 'slime':
        return styles.slimeBorder;
      case 'space':
        return styles.spaceBorder;
      case 'laser':
        return styles.laserBorder;
      case 'circuit':
        return styles.circuitBorder;
      default:
        return styles.defaultBorder;
    }
  };

  return (
    <View style={[styles.container, getBorderStyle(), style]}>
      <View style={styles.innerContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 3,
    margin: 2,
  },
  innerContainer: {
    borderRadius: 9,
    overflow: 'hidden',
  },
  
  // Portal texture - azul com efeito de energia
  portalBorder: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  
  // Slime texture - verde com brilho
  slimeBorder: {
    backgroundColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#B8E994',
  },
  
  // Space texture - roxo escuro com estrelas
  spaceBorder: {
    backgroundColor: '#6C5CE7',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#A29BFE',
  },
  
  // Laser texture - vermelho com energia
  laserBorder: {
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 7,
    elevation: 7,
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  
  // Circuit texture - amarelo tech
  circuitBorder: {
    backgroundColor: '#F39C12',
    shadowColor: '#F39C12',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#F1C40F',
  },
  
  // Default border
  defaultBorder: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default ThemedBorder;