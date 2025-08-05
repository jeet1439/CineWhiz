import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Card = ({ id, poster_path, title, vote_average, release_date }) => {

    const rating = vote_average / 2; // Convert TMDB rating (out of 10) to 5-star scale
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    // console.log(release_date)
    return (

        <Link href={`/movie/${id}`}>
            <TouchableOpacity className='w-[30%]'>
                <Image
                    source={{
                        uri: poster_path ?
                            `https://image.tmdb.org/t/p/w500${poster_path}` :
                            `https://via.placeholder.co/600*400/1a1a1a/ffffff.png`
                    }}
                    className='w-32 h-52 rounded-lg'
                    resizeMode="cover"
                />
                <Text numberOfLines={1} className="tezt-sm w-32 font-bold text-white mt-2">{title}</Text>
                <View className="flex-row mt-1">
                    {[...Array(5)].map((_, i) => {
                        if (i < fullStars) {
                            return <Ionicons key={i} name="star" size={14} color="#facc15" />
                        } else if (i === fullStars && hasHalfStar) {
                            return <Ionicons key={i} name="star-half" size={14} color="#facc15" />
                        } else {
                            return <Ionicons key={i} name="star-outline" size={14} color="#facc15" />
                        }
                    })}
                </View>
                <View className='flex-row items-center justify-between w-32'>
                <Text className="text-xs text-gray-400 mt-1">
                 {release_date?.split('-')[0]}
                </Text>
                <Text className="text-xs text-gray-400 mt-1">Movie</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default Card