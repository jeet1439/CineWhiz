import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";


const Recomendcard = ( { movie }) => {
    const { id, poster_path, title, vote_average, release_date } = movie;
  return (
    <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity className="w-32 relative">
                <Image
                    source={{ 
                            uri: poster_path ?
                            `https://image.tmdb.org/t/p/w500${poster_path}` :
                            `https://via.placeholder.co/600*400/1a1a1a/ffffff.png` }}

                    className="w-32 h-48 rounded-lg"
                    resizeMode="cover"
                />
                <Text
                    className="text-sm font-bold mt-2 text-stone-100"
                    numberOfLines={1}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        </Link>
  )
}

export default Recomendcard