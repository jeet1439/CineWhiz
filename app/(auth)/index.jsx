import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useAuthStore } from '../../store/authStore';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { isLoading, login } = useAuthStore();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Alert:", "All fields are required");
            return;
        }
        const res = await login(email, password);
        if (!res.success) {
            Alert.alert("Error", res.error);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/back3.jpg')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? "padding" : "height"}
            >
                {/* Overlay to darken the background */}
                <View className="flex-1 bg-black/40 justify-center ">
                    <View className="flex-1 justify-end items-center">
                        <Image
                            source={require('../../assets/images/Name.png')}
                            style={{ width: 500, height: 60, resizeMode: 'contain' }}
                        />
                        <Text className="text-stone-300 text-xl ">More than just movies—it’s a vibe</Text>
                    </View>
                    <View className="flex-1 justify-center px-6">
                        <View className="bg-black/70 p-6 rounded-2xl shadow-md">
                            {/* Email Field */}
                            <View className="mb-5">
                                <Text className="text-sm text-stone-100 mb-1">Email</Text>
                                <View className="flex-row items-center border border-gray-200 rounded-md px-3 py-2">
                                    <Ionicons name="mail-outline" size={20} color="#ededed" />
                                    <TextInput
                                        className="ml-2 flex-1 text-stone-100"
                                        placeholder="Enter your email"
                                        placeholderTextColor="#9ca3af"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>
                            </View>

                            {/* Password Field */}
                            <View className="mb-6">
                                <Text className="text-sm text-stone-100  mb-1">Password</Text>
                                <View className="flex-row items-center border border-gray-200 rounded-md px-3 py-2">
                                    <Ionicons name="lock-closed-outline" size={20} color="#ededed" />
                                    <TextInput
                                        className="ml-2 flex-1 text-stone-100"
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
                                            color="#ededed"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity
                                className="bg-red-700 py-3 rounded-md items-center mb-4"
                                onPress={handleLogin}
                                disabled={isLoading}
                            >
                                {
                                    isLoading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text className="text-white font-semibold text-base">Login</Text>
                                    )
                                }
                            </TouchableOpacity>

                            {/* Signup link */}
                            <View className="flex-row justify-center mt-2">
                                <Text className="text-gray-200">Don't have an account?</Text>
                                <Link href="/signup" asChild>
                                    <TouchableOpacity>
                                        <Text className="text-red-800 font-semibold ml-1">Sign up</Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}
