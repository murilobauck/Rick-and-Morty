import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { getBorderPatternById } from '../utils/borderPatterns';

const CharacterImage = ({ character }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive': return colors.alive;
      case 'Dead': return colors.dead;
      default: return colors.unknown;
    }
  };

  const borderPattern = getBorderPatternById(character.id);
  
  const getBorderColor = () => {
    switch (borderPattern) {
      case 'portal': return colors.primary;
      case 'slime': return colors.secondary;
      case 'space': return '#6C5CE7';
      case 'laser': return colors.accent;
      case 'circuit': return '#F39C12';
      default: return colors.primary;
    }
  };

  const getShadowColor = () => {
    return getBorderColor();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.imageWrapper, { 
        borderColor: getBorderColor(),
        shadowColor: getShadowColor(),
      }]}>
        <Image source={{ uri: character.image }} style={styles.image} />
      </View>
      
      <View style={[styles.statusOverlay, { borderColor: getBorderColor() }]}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(character.status) }]} />
        <Text style={styles.statusText}>{character.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    position: 'relative',
  },
  imageWrapper: {
    borderRadius: 115,
    borderWidth: 6,
    padding: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  statusOverlay: {
    position: 'absolute',
    bottom: 30,
    right: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CharacterImage;