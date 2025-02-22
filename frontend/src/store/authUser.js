import axios from 'axios'
import toast from 'react-hot-toast';
import {create} from 'zustand'

export const useAuthStore = create((set) =>({
    user:null,
    isSigningUp:false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isAuthenticated: false,
    isVerifyingEmail: false,

    signup: async(credentials) =>{
        set({isSigningUp: true})
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials);
            console.log(response)
            set({ isSigningUp: false}) 
            toast.success("Account created succesfully, now verify your account")
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
        }
    },
    login: async(credentials) =>{
        set({ isLoggingIn: true });
		try {
			const response = await axios.post("/api/v1/auth/login", credentials);
			set({ user: response.data.user, isLoggingIn: false });
            toast.success("Login successful");
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			toast.error(error.response.data.message || "Login failed");
		}
    },
    logout: async() =>{
        set({ isLoggingOut: true });
		try {
			await axios.post("/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Logout failed");
		}
    },
    authCheck: async() =>{
        set({isCheckingAuth: true})
        try {
            const response = await axios.get("/api/v1/auth/authCheck")
            set({user: response.data.user, isCheckingAuth: false})
        } catch (error) {
            // toast.error(error.response.data.message);
            set({isCheckingAuth: false, user: null})
        }
    },
    verifyEmail: async (code) =>{
        set({isVerifyingEmail: true});
        try {
            const response = await axios.post(`api/v1/auth/verify-email`,{code});
            set({user: response.data.user, isVerifyingEmail: false});
            toast.success("Email verified successfully")
            return response.data
        } catch (error) {
            set({error:error.response.data.message || "Error verifying email", isLoading: false})
        }
    },
}))