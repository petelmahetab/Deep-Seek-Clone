import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/images/assets/assets';
import ChatHistoryItem from './ChatHistoryItem';

const ChatHistorySection = ({ expand }) => {
  const [chatHistory, setChatHistory] = useState([
    { id: "1", title: "Assisting with the image concept", date: "" },
    { id: "2", title: "Assisting with the image concept", date: "" },
    { id: "3", title: "Assisting with the image concept", date: "" },
    { id: "4", title: "Assisting with the image concept", date: "" },
    { id: "5", title: "Assisting with the image concept", date: "" },
    { id: "6", title: "Assisting with the image concept", date: "" },
    { id: "7", title: "Assisting with the image concept", date: "" },
    { id: "8", title: "Assisting with the image concept", date: "" },
    { id: "9", title: "Assisting with the image concept", date: "" },
    { id: "10", title: "Assisting with the image concept", date: "" },
    { id: "11", title: "Assisting with the image concept", date: "" },
    { id: "12", title: "Assisting with the image concept", date: "" },
    { id: "13", title: "Assisting with the image concept", date: "" },
    { id: "14", title: "Assisting with the image concept", date: "" },
    { id: "15", title: "Assisting with the image concept", date: "" },
    { id: "16", title: "Assisting with the image concept", date: "" },
    { id: "17", title: "Assisting with the image concept", date: "" },
    { id: "18", title: "Assisting with the image concept", date: "" },
    { id: "19", title: "Assisting with the image concept", date: "" },
    { id: "20", title: "Assisting with the image concept", date: "" },
  ]);

  const handleRename = (id, newTitle) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, title: newTitle } : chat
      )
    );
  };

  const handleDelete = (id) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== id));
  };

  return (
    <div className="flex flex-col w-full">
      {expand && (
        <>
          <button
            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl px-4 py-2 mx-4 my-2 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm bg-opacity-80"
          >
            <Image
              src={assets.chat_icon}
              alt="New Chat"
              width={25}
              height={20}
              className="mr-2"
            />
            <span className="text-sm font-semibold tracking-wide">
              New Chat
            </span>
          </button>

          {/* Chat History */}
          <div className="flex flex-col gap-1 px-4 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-50 dark:scrollbar-thumb-gray-700 scrollbar-track-red scrollbar-thumb-rounded-full relative z-10 bg-[#1e1f24]">
            {chatHistory.map((chat) => (
              <div key={chat.id} className="relative">
                <ChatHistoryItem
                  chat={chat}
                  onRename={handleRename}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatHistorySection;