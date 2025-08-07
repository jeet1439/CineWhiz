import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { user, isLoading, signup } = useAuthStore();

    const handleSignup = async () => {
        const res = await signup(username, email, password);
        if (!res.success) {
            Alert.alert('Error', res.error);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/back.jpg')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View className="flex-1 bg-black/40 justify-center">
                    <View className="flex-1 justify-end items-center">
                        <Image
                            source={require('../../assets/images/Name.png')}
                            style={{ width: 500, height: 60, resizeMode: 'contain' }}
                        />
                        <Text className="text-stone-300 text-xl ">Find your next favorite film—faster.</Text>
                    </View>
                    <View className="flex-1 px-6 pt-14">
                        <View className="flex-1 bg-black/70 rounded-3xl px-4 pt-6 mb-5 shadow-md">

                            <View className="mb-5">
                                <Text className="text-sm text-stone-100 mb-1">Username</Text>
                                <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2">
                                    <Ionicons name="person-outline" size={20} color="#1e40af" />
                                    <TextInput
                                        className="ml-2 flex-1 text-gray-200"
                                        placeholder="jeet_dev01"
                                        placeholderTextColor="#9ca3af"
                                        value={username}
                                        onChangeText={setUsername}
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            <View className="mb-5">
                                <Text className="text-sm text-stone-100 mb-1">Email</Text>
                                <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2">
                                    <Ionicons name="mail-outline" size={20} color="#1e40af" />
                                    <TextInput
                                        className="ml-2 flex-1 text-gray-200"
                                        placeholder="example@gmail.com"
                                        placeholderTextColor="#9ca3af"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            <View className="mb-6">
                                <Text className="text-sm text-stone-100 mb-1">Password</Text>
                                <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2">
                                    <Ionicons name="lock-closed-outline" size={20} color="#1e40af" />
                                    <TextInput
                                        className="ml-2 flex-1 text-gray-200"
                                        placeholder="Enter your password"
                                        placeholderTextColor="#9ca3af"
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                                        <Ionicons
                                            name={showPassword ? 'eye' : 'eye-off'}
                                            size={20}
                                            color="#1e40af"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                                className="bg-blue-800 py-3 rounded-md items-center mb-4"
                                onPress={handleSignup}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text className="text-white font-semibold text-base">Sign up</Text>
                                )}
                            </TouchableOpacity>

                            {/* Login Redirect */}
                            <View className="flex-row justify-center mt-2">
                                <Text className="text-gray-200">Already have an account?</Text>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Text className="text-blue-600 font-semibold ml-1">Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}
