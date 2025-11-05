import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { characterService } from '../services/api';
import { colors } from '../styles/colors';
import LoadingSpinner from '../components/LoadingSpinner';
import DetailCard from '../components/DetailCard';
import CharacterImage from '../components/CharacterImage';
import { borderPatterns } from '../utils/borderPatterns';

const CharacterDetailScreen = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacterDetails();
  }, []);

  const fetchCharacterDetails = async () => {
    try {
      setLoading(true);
      const data = await characterService.getCharacterById(characterId);
      setCharacter(data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do personagem:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive': return colors.alive;
      case 'Dead': return colors.dead;
      default: return colors.unknown;
    }
  };

  const getGenderIcon = (gender) => {
    switch (gender) {
      case 'Male': return '♂';
      case 'Female': return '♀';
      default: return '?';
    }
  };

  if (loading) {
    return <LoadingSpinner message="Carregando detalhes..." />;
  }

  if (!character) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Personagem não encontrado</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CharacterImage character={character} />

        <View style={styles.detailsContainer}>
          <Text style={styles.characterName}>{character.name}</Text>
          
          <View style={styles.infoGrid}>
            <DetailCard
              label="Espécie"
              value={character.species}
              borderType={borderPatterns[0]}
            />

            <DetailCard
              label="Gênero"
              value={`${getGenderIcon(character.gender)} ${character.gender}`}
              borderType={borderPatterns[1]}
            />

            <DetailCard
              label="Origem"
              value={character.origin.name}
              borderType={borderPatterns[2]}
            />

            <DetailCard
              label="Localização"
              value={character.location.name}
              borderType={borderPatterns[3]}
            />

            <DetailCard
              label="Episódios"
              value={`${character.episode.length} episódios`}
              borderType={borderPatterns[4]}
            />

            <DetailCard
              label="Criado em"
              value={new Date(character.created).toLocaleDateString('pt-BR')}
              borderType={borderPatterns[0]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.text,
    fontSize: 18,
  },
  detailsContainer: {
    padding: 20,
  },
  characterName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 181, 204, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default CharacterDetailScreen;