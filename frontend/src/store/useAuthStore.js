import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("auth/check");
            set({authUser: res.data});
        } catch (error) {
            set({authUser: null});
        }
    },

    logout: async () => {
        await axiosInstance.post("auth/logout");
        set({authUser: null});
    },

    signin: async (data) => {
        const res = await axiosInstance.post("auth/signin", data);
        set({authUser: res.data});
    },



}));