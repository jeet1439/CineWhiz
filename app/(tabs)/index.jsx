import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../../assets/images/icon.png';
import Card from '../../components/Card.jsx';
import TrendingCard from '../../components/TrendingCard.jsx';
import SearchBar from '../../components/searchBar.jsx';
import { fetchMovie } from '../../services/api.js';
import { getTrendingMovies } from '../../services/appwrite.js';
import useFetch from '../../services/useFetch.js';

const index = () => {

  const router = useRouter();

  const { data: trendingMovies, loading: trendingLoading, error: trendingError , refetch: refetchTrending} = useFetch(getTrendingMovies, false);

  const fetchPopularMovies = async () => await fetchMovie({ query: '' });

  const { data: movies, loading: moviesLoading, error: moviesError, refetch: refetchPopular } = useFetch(fetchPopularMovies);

    useFocusEffect(
    useCallback(() => {
      refetchTrending();
      refetchPopular();
    }, [])
  );

  return (
    <LinearGradient
      colors={['#0f015c', '#030014']}
      className="flex-1"
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.4 }}
    >
      <StatusBar backgroundColor="#1c0d41" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View className='flex-1'>
          <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
            <Image source={icon} className='w-12 h-10 mt-5 mb-5 mx-auto' />
            <>
              {moviesLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20, alignSelf: 'center' }} />
              ) : moviesError ? (
                <Text>Error: {moviesError?.message}</Text>
              ) : (
                <View className='flex-1 mt-5'>
                  <SearchBar
                    onPress={() => router.push("/search")}
                    placeholder="Search for a movie"
                  />
                  {
                    trendingLoading && (
                      <ActivityIndicator className='mt-10'/>
                    )
                  }
                  {trendingMovies && !trendingLoading && (
                    <View className='mt-10'>
                      <Text className='text-lg text-white font-bold mb-3'>Trending movies</Text>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mb-4 mt-3"
                        data={trendingMovies}
                        contentContainerStyle={{
                          gap: 5,
                        }}
                        renderItem={({ item, index }) => (
                          <TrendingCard movie={item} index={index} />
                        )}
                        keyExtractor={(item) => item.movie_id.toString()}
                        ItemSeparatorComponent={() => <View className="w-4" />}
                      />
                    </View>
                  )}
                  <>
                    <Text className="text-lg text-stone-50 font-bold mt-5 mb-3">
                      Latest movies
                    </Text>
                    <FlatList
                      data={movies}
                      showsVerticalScrollIndicator={false}
                      scrollEnabled={false}
                      renderItem={({ item }) => (
                        <Card
                          {...item}
                        />
                      )}
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={3}
                      columnWrapperStyle={{
                        justifyContent: 'flex-start',
                        gap: 20,
                        paddingRight: 5,
                        marginBottom: 10
                      }}
                      className='mt-2 pb-32'
                    />
                  </>
                </View>
              )}
            </>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default index;
