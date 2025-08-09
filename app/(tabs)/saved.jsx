import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import TrendingCard from '../../components/TrendingCard.jsx';
import Recomendcard from '../../components/Recomendcard.jsx';
import { useAuthStore } from '../../store/authStore.js';


const saved = () => {
  const { user, token } = useAuthStore();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const EXPO_PUBLIC_MOVIE_LINK_API_KEY = process.env.EXPO_PUBLIC_MOVIE_LINK_API_KEY;

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      // 1. Get genres from backend
      const resGenre = await fetch(
        `https://mdnt-back-serv.onrender.com/api/movie/last-watched-genre?userId=${user._id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!resGenre.ok) {
        const errText = await resGenre.text();
        throw new Error(`Backend error (${resGenre.status}): ${errText}`);
      }

      const genreData = await resGenre.json();
      // console.log(genreData);

      //No genres found from backend
      if (!genreData.genres?.length) {
        genreData = { genres: [878, 12, 28] }; // Sci-Fiction , Adventure, Action
      }
      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${EXPO_PUBLIC_MOVIE_LINK_API_KEY}&with_genres=${genreData.genres.join(',')}&sort_by=popularity.desc&page=1`,

      );

      if (!tmdbRes.ok) {
        const errText = await tmdbRes.text();
        throw new Error(`TMDB error (${tmdbRes.status}): ${errText}`);
      }

      const tmdbData = await tmdbRes.json();
      setRecommendations(tmdbData.results.slice(0, 10));

    } catch (error) {
      console.error("Error fetching recommendations:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch(`https://mdnt-back-serv.onrender.com/api/movie/history?userId=${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        setHistoryLoading(false);
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setHistory(data);
      setHistoryLoading(false);
      return data.history; // Array of 5 recent movies
    } catch (err) {
      setHistoryLoading(false);
      console.error("Failed to fetch history:", err);
      return [];
    }
  }

  useEffect(() => {
    fetchRecommendations();
    fetchHistory();
  }, []);

  // console.log(`history data: ${history}`);
  //  console.log(history);
  return (
    <LinearGradient
      colors={['#0f015c', '#030014']}
      className="flex-1"
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.4 }}
    >
      <StatusBar backgroundColor="#1c0d41" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 90 }}>
        {recommendations && !loading && (
          <View className="mt-10">
            {/* <Text className='text-xl text-stone-100 text-center'>Rewatch your favorites</Text> */}
            <Text className="text-2xl text-white font-bold mb-3">
              Top Picks for You
            </Text>
            {loading ? (
              // Loading spinner
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {/* Row 1 */}
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={recommendations.slice(0, 5)}
                  contentContainerStyle={{ gap: 5 }}
                  renderItem={({ item, index }) => (
                    <Recomendcard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />

                {/* Row 2 */}
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={recommendations.slice(5, 10)}
                  contentContainerStyle={{ gap: 5 }}
                  renderItem={({ item, index }) => (
                    <Recomendcard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </>
            )}
          </View>
        )}
        <View className='flex-1'>
          <Text className='text-2xl mt-4 text-stone-100'>Recenty watched</Text>
          {historyLoading ? (
            <ActivityIndicator size="large" />
          ) : history.length === 0 ? (
            <Text className="text-stone-400 mt-3">No history available</Text>
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4 mt-3"
              data={history}
              contentContainerStyle={{ gap: 5 }}
              renderItem={({ item, index }) => (
                <Recomendcard movie={item} index={index} />
              )}
              keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />
          )}
        </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default saved;