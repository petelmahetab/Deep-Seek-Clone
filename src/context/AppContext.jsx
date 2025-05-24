// src/context/AppContext.jsx
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
  const { getToken } = useAuth();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createNewChat = async () => {
    try {
      if (!user) {
        toast.error("User not authenticated");
        return null;
      }

      const token = await getToken();
      console.log("Clerk token for create:", token);
      const { data } = await axios.post(
        "/api/chats/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        console.log("New chat created:", data.data);
        setChats((prevChats) => [data.data, ...prevChats]);
        setSelectedChat(data.data);
        return data.data;
      } else {
        toast.error(data.message || "Failed to create chat");
        return null;
      }
    } catch (e) {
      console.error("Error in createNewChat:", e);
      toast.error(e.message || "Error creating chat");
      return null;
    }
  };

  const fetchUsersChats = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      console.log("Clerk token for fetch:", token);
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