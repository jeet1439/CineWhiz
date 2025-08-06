import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../../assets/images/icon.png';
import Card from '../../components/Card.jsx';
import SearchBar from '../../components/searchBar.jsx';
import { fetchMovie } from '../../services/api.js';
import { updateSearchCount } from '../../services/appwrite.js';
import useFetch from '../../services/useFetch.js';


const search = () => {

  const [searchQuery, setSearchQuery] = useState('');


  const fetchPopularMovies = async () => await fetchMovie({ query: searchQuery });

  const { data: movies, refetch: loadMovies, reset, loading: moviesLoading, error: moviesError } = useFetch(fetchPopularMovies, false);


  //debouncing: 

  useEffect(() => {

    // updateSearchCount(searchQuery, movies[0]);
    
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
        if (movies?.length > 0 && movies?.[0]) {
           await updateSearchCount(searchQuery, movies[0]);
      }
      } else {
        reset();
      }
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);


  return (
    <LinearGradient
      colors={['#0f015c', '#030014']}
      className="flex-1"
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.4 }}
    >
      <StatusBar backgroundColor="#1c0d41" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={movies}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card
              {...item}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'center',
            gap: 16,
            marginVertical: 16
          }}
          className='px-5'
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
              <View className="w-full flex-row justify-center mt-10 items-center">
                <Image source={icon} className='w-12 h-10' />
              </View>
              <View className='my-5'>
                <SearchBar placeholder="Seatch movies..."
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                />
              </View>
              {
                moviesLoading && (
                  <ActivityIndicator size="large" color="#0000ff" className='my-3' />
                )
              }
              {
                moviesError && (
                  <Text className='text-red-500 px-5 my-3'>
                    Error: {moviesError.message}
                  </Text>
                )
              }
              {
                !moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                  <Text className='text-xl text-white font-bold'>
                    Search Results For {' '}
                    <Text className='text-accent'>{searchQuery}</Text>
                  </Text>
                )
              }
            </>
          }
          ListEmptyComponent={() => {
            if (moviesLoading || moviesError) return null;
            return (
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-500">
                  {searchQuery?.trim() ? 'No movies found.' : 'Search for a movie'}
                </Text>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default search