import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';

const index = () => {
  return (
    <LinearGradient
      colors={['#0f015c', '#030014']}
      className="flex-1"
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.4 }}
    >
    <StatusBar backgroundColor="#1c0d41" barStyle="light-content" />
    <View className='flex-1 justify-center items-center'>
      <Text className='text-3xl text-gray-200'>Index</Text>
    </View>
    </LinearGradient>
  );
};

export default index;
