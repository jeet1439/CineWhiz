import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore.js';

const Profile = () => {
  const { user, logout } = useAuthStore();

  return (
    <LinearGradient
      colors={['#0f015c', '#030014']}
      className="flex-1"
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.4 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View className='flex-1 items-center p-4'>
          {user ? (
            <View className='flex-row items-center mb-6 gap-6'>
              {/* Profile Image */}
              {user?.profileImage && user?.profileImage.length > 0 && (
                <Image
                  source={{ uri: user.profileImage[0] }}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
              )}

              {/* Username and Email */}
              <View>
                <Text className='text-lg text-stone-50'>Username: {user.username}</Text>
                <Text className='text-lg text-stone-50'>Email: {user.email}</Text>
              </View>

              <View className='flex-1 justify-center items-center mb-5'>
                <TouchableOpacity onPress={logout} className='mt-6 px-4 py-2 bg-red-500 rounded'>
                  <Text className='text-white'>Logout</Text>
                </TouchableOpacity>
              </View>

            </View>
          ) : (
            <Text className='text-lg text-red-500'>No user logged in</Text>
          )}
          <ScrollView className='flex-1 mt-10 mb-20 w-full'>
            
          <Text className='text-2xl text-stone-100 ml-3'>Join us on</Text>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://byteblog-wi7r.onrender.com/')}
              activeOpacity={0.8}
            >
              <View className="bg-black/10 rounded-lg overflow-hidden p-4 ">
                <Image
                  source={require('../../assets/images/ByteBlog.png')}
                  style={{ width: '100%', height: 200, borderRadius: 2 }}
                  resizeMode="cover"
                />
                <Text className="text-stone-100 text-xl mt-2 ml-4">Stay Ahead in Tech</Text>
                <Text className="text-stone-300 ml-4">Explore the latest in tech — from cutting-edge tools and coding tutorials to industry trends.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://github.com/jeet1439/MIDNITE')}
              activeOpacity={0.8}
            >
              <View className="bg-black/10 rounded-lg overflow-hidden p-4 ">
                <Image
                  source={require('../../assets/images/Midnite.png')}
                  style={{ width: '100%', height: 200, borderRadius: 2 }}
                  resizeMode="cover"
                />
                <Text className="text-stone-100 text-xl mt-2 ml-4">Welcome to the Midnite Vibe</Text>
                <Text className="text-stone-300 ml-4">Where night owls, party lovers, and thinkers connect — Midnite comes alive when the world sleeps.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://innostay.onrender.com/listings')}
              activeOpacity={0.8}
            >
              <View className="bg-black/10 rounded-lg overflow-hidden p-4 ">
                <Image
                  source={require('../../assets/images/Innostay.png')}
                  style={{ width: '100%', height: 200, borderRadius: 2 }}
                  resizeMode="cover"
                />
                <Text className="text-stone-100 text-xl mt-2 ml-4">Book Your Next Escape</Text>
                <Text className="text-stone-300 ml-4">Book dream stays or become a host. Travel made easy, for guests and owners alike.</Text>
              </View>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;
