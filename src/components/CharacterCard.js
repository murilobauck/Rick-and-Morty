import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import ThemedBorder from './ThemedBorder';
import { getBorderPatternById } from '../utils/borderPatterns';

const CharacterCard = ({ character, onPress }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive': return colors.alive;
      case 'Dead': return colors.dead;
      default: return colors.unknown;
    }
  };

  const borderPattern = getBorderPatternById(character.id);

  return (
    <ThemedBorder borderType={borderPattern} style={styles.borderContainer}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{character.name}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(character.status) }]} />
            <Text style={styles.status}>{character.status} - {character.species}</Text>
          </View>
          <Text style={styles.location} numberOfLines={1}>
            Última localização: {character.location.name}
          </Text>
        </View>
      </TouchableOpacity>
    </ThemedBorder>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    marginHorizontal: 14,
    marginVertical: 6,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 9,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  status: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  location: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default CharacterCard;