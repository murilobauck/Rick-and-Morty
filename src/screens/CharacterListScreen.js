import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { characterService } from '../services/api';
import { colors } from '../styles/colors';
import CharacterCard from '../components/CharacterCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

const CharacterListScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async (reset = true) => {
    try {
      if (reset) {
        setLoading(true);
        setCurrentPage(1);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const pageToLoad = reset ? 1 : currentPage + 1;
      const data = await characterService.getCharacters(pageToLoad, searchText);
      
      if (reset) {
        setCharacters(data.results || []);
        setCurrentPage(1);
      } else {
        setCharacters(prev => [...prev, ...(data.results || [])]);
        setCurrentPage(prev => prev + 1);
      }

      setNextPageUrl(data.info?.next || null);
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
      if (reset) {
        setError('Erro ao carregar personagens. Verifique sua conexão.');
        setCharacters([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = useCallback((text) => {
    setSearchText(text);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadCharacters(true);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const loadMoreCharacters = () => {
    if (nextPageUrl && !loadingMore) {
      loadCharacters(false);
    }
  };

  const renderCharacter = ({ item }) => (
    <CharacterCard
      character={item}
      onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}
    />
  );

  if (loading) {
    return <LoadingSpinner message="Carregando personagens..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rick & Morty</Text>
        <SearchBar
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      
      <FlatList
        data={characters}
        renderItem={renderCharacter}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreCharacters}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadingMoreText}>Carregando mais...</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum personagem encontrado</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: colors.cardBackground,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 181, 204, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  errorText: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
  loadingMoreText: {
    color: colors.textSecondary,
    marginTop: 8,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CharacterListScreen;