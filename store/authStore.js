import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  
  setUser: (user) => set({ user }),
  
  
  signup: async(username, email, password) =>{
    set({isLoading : true});
    try {
        const res = await fetch(`http:/192.168.0.102:3000/api/auth/signup`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username, 
                email, 
                password
            }),
        })
        const data = await res.json();

        if(!res.ok) throw new Error(data.message || "Something went wrong");
        
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", data.token);

        set({token: data.token, user: data.user, isLoading: false, currentUserId: data.user._id})
        return { success: true }
    } catch (error) {
        set({ isLoading: false });
        return { success: false, error: error.message }
    }
  },

  checkAuth: async() => {
    try {
        const token =  await AsyncStorage.getItem("token");
        const userJson  = await AsyncStorage.getItem("user");

        const user = userJson ? JSON.parse(userJson) : null;

        set({token, user});

    } catch (error) {
        console.log("auth failed");
    }
  },
  
  login: async( email, password ) => {
    set({isLoading: true});
    try {
        const res = await fetch(`http:/192.168.0.102:3000/api/auth/login`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await res.json();

        if(!res.ok) throw new Error(data.message || "Something went wrong");
        
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", data.token);

        set({token: data.token, user: data.user, isLoading: false, currentUserId: data.user._id})
        return { success: true }

    } catch (error) {
        set({ isLoading: false });
        return { success: false, error: error.message }
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({token: null, user: null});
    router.replace("/(auth)");
  }
}));