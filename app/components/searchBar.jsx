import { Ionicons } from '@expo/vector-icons'
import { TextInput, View } from 'react-native'

export default function SearchBar({ placeholder , onPress }) {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Ionicons name="search" size={20} color="#ab8bff" />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={()=>{}}
        placeholderTextColor="#ab8bff"
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}