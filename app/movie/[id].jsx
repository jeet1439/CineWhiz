import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { WebView } from "react-native-webview";

// import useFetch from "@/services/usefetch";
// import { fetchMovieDetails } from "@/services/api.js";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { fetchMovieDetails, fetchTrailerUrl } from "../../services/api.js";
import useFetch from "../../services/useFetch.js";

const MovieInfo = ({ label, value }) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  // console.log(id);
  const [modalVisible, setModalVisible] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id)
  );

  const extractYouTubeVideoId = (url) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };

  const handlePlay = async () => {
    const url = await fetchTrailerUrl(id);
    // console.log(url);
    if (url) {
      setTrailerUrl(url);
      setModalVisible(true);
    } else {
      alert("Trailer not available");
    }
  };

  const rating = Math.round(movie?.vote_average ?? 0);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 10 - fullStars - (hasHalfStar ? 1 : 0);

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator className="mt-30" />
      </SafeAreaView>
    );

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#0f015c', '#030014']}
        className="flex-1"
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.4 }}
      >
        <StatusBar hidden />
        <TouchableOpacity
          className="absolute top-10 left-5 z-50"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />

            <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center"
              onPress={handlePlay}
            >

              <Ionicons name="play" size={28} color="black" />
            </TouchableOpacity>
          </View>

          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-200 text-sm">
                {movie?.release_date?.split("-")[0]} •
              </Text>
              <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
            </View>

            <View className="flex-row items-center">
              {[...Array(fullStars)].map((_, index) => (
                <Ionicons key={`full-${index}`} name="star" size={14} color="#FFD700" />
              ))}
              {hasHalfStar && (
                <Ionicons name="star-half" size={14} color="#FFD700" />
              )}
              {[...Array(emptyStars)].map((_, index) => (
                <Ionicons key={`empty-${index}`} name="star-outline" size={14} color="#FFD700" />
              ))}

              <Text className="text-white font-bold text-sm ml-5">
                {Math.round(movie?.vote_average ?? 0)}/10
              </Text>
            </View>

            <MovieInfo label="Overview" value={movie?.overview} />
            <MovieInfo
              label="Genres"
              value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
            />

            <View className="flex flex-row justify-between w-1/2">
              <MovieInfo
                label="Budget"
                value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
              />
              <MovieInfo
                label="Revenue"
                value={`$${Math.round(
                  (movie?.revenue ?? 0) / 1_000_000
                )} million`}
              />
            </View>

            <MovieInfo
              label="Production Companies"
              value={
                movie?.production_companies?.map((c) => c.name).join(" • ") ||
                "N/A"
              }
            />
          </View>
        </ScrollView>
      </LinearGradient>
      {modalVisible && (
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          statusBarTranslucent={true}
        >
          <>
            <StatusBar backgroundColor="rgba(0,0,0,0.9)" translucent barStyle="light-content" />
            <View
              style={StyleSheet.absoluteFillObject}
              className="bg-black/90 justify-center items-center"
            >
              <View className="w-[90%] h-[23%]  rounded-xl overflow-hidden relative">
                {/* <WebView
                  source={{ uri: trailerUrl }}
                  javaScriptEnabled
                  allowsFullscreenVideo
                  style={{ flex: 1 }}
                /> */}
                {!isVideoReady && (
                  <View className="absolute inset-0 bg-black/80 justify-center items-center z-40">
                    <ActivityIndicator size="large" color="#fff" />
                    <Text className="text-white mt-2">Loading trailer...</Text>
                  </View>
                )}
                <YoutubePlayer
                  height={300}
                  width={"100%"}
                  play={true}
                  onReady={() => setIsVideoReady(true)}
                  videoId={extractYouTubeVideoId(trailerUrl)}
                  initialPlayerParams={{
                    controls: false,
                    modestbranding: true,
                    rel: false,
                    showinfo: false,
                  }}
                />
                <TouchableOpacity
                  className="absolute top-2 right-2 z-50 bg-black/70 p-2 rounded-full"
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        </Modal>
      )}


    </View>
  );
};

export default Details;