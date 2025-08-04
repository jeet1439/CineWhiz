import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import "../globals.css";

const _layout = () => {
  return (
    <Tabs
      screenOptions={
        {
          tabBarStyle: {
            backgroundColor: '#0F0D23',
            height: 65,
            marginHorizontal: 15,
            // paddingBottom: 10,                   
            paddingTop: 12,                   
            borderRadius: 34,
            borderTopWidth: 0,
            position: 'absolute',
            bottom: 25, 
            elevation: 10,
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#AB8BFF',
        }
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
