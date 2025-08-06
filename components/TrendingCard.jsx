import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";



const TrendingCard = ({ movie, index }) => {
    const { movie_id, title, poster_url } = movie;

    return (
        <Link href={`/movie/${movie_id}`} asChild>
            <TouchableOpacity className="w-32 relative">
                <Image
                    source={{ uri: poster_url }}
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
    );
};

export default TrendingCard;
