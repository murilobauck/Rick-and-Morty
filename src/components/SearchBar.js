import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const SearchBar = ({ value, onChangeText, placeholder = 'Buscar personagem...' }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    backgroundColor: colors.cardBackground,
    color: colors.text,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    fontSize: 16,
  },
});

export default SearchBar;