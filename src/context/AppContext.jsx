"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth(); // getToken is available here

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createNewChat = async () => {
    try {
      const token = await getToken(); 
      console.log("Clerk token for createNewChat:", token);

      if (!token) {
        throw new Error("No authentication token available");
      }

      const response = await axios.post(
        "/api/chats/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in createNewChat:", error);
      toast.error(error.message || "Failed to create a new chat");
      throw error;
    }
  };

  const fetchUsersChats = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      console.log("Clerk token for fetch:", token);

      if (!token) {
        throw new Error("No authentication token available");
      }

      const { data } = await axios.get("/api/chats/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        console.log("Fetched chats:", data.data);
        setChats(data.data);

        if (data.data.length === 0) {
          const newChat = await createNewChat();
          if (newChat) {
            setSelectedChat(newChat);
          }
        } else {
          setSelectedChat(data.data[0]);
        }
      } else {
        toast.error(data.message || "Failed to fetch chats");
        return null;
      }
    } catch (e) {
      console.error("Error fetching chats:", e);
      toast.error(e.message || "Error fetching chats");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User authenticated:", user.id);
      fetchUsersChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  const value = {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    fetchUsersChats,
    createNewChat,
    isLoading,
  };

  console.log("Context state:", { user, chats, selectedChat, isLoading });

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};