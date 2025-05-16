"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { assets } from "@/images/assets/assets.js";
import Sidebar from "../components/sidebar";
import Message from "../components/Message";
import { PromptArea } from "../components/PromptArea";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const handleInput = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
      };

      textarea.addEventListener("input", handleInput);
      return () => textarea.removeEventListener("input", handleInput);
    }
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage = { role: "user", content: inputValue };
      setMessages([...messages, userMessage]);
      setInputValue("");
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
      }

      // Simulate an AI response (for demonstration purposes)
      setTimeout(() => {
        const aiResponse = {
          role: "ai",
          content: "I received your message: \"" + inputValue + "\". How can I assist you further?",
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && inputValue.trim()) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([]); // Clear messages to start a new chat
    setInputValue(""); // Clear the input field
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
    }
  };

  // Limit the number of visible messages to fit within the viewport
  const MAX_VISIBLE_MESSAGES = 3; // Adjust based on your UI (e.g., 3 messages fit within the max-h)
  const displayedMessages = messages.slice(-MAX_VISIBLE_MESSAGES);

  return (
    <div className="h-screen bg-[#2a2b2f] text-white flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-2 sm:px-4 overflow-hidden">
        {messages.length === 0 ? (
          <div className="flex flex-col justify-center items-center w-full h-full">
            {/* Header Section */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
              <Image
                src={assets.logo_icon}
                alt="logo"
                width={40}
                height={40}
                className="rounded-full p-1 sm:p-2 hover:bg-[#343537] hover:scale-110 transition w-8 h-8 sm:w-12 sm:h-12"
              />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-light">
                Hi, I'm DeepSeek.
              </h1>
            </div>
            <p className="text-xs sm:text-base mt-1 text-gray-300 text-center mb-6 sm:mb-10">
              How can I help you today?
            </p>

            {/* Prompt Area Centered (No New Chat Button) */}
            <PromptArea
              textareaRef={textareaRef}
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleKeyDown={handleKeyDown}
              handleSend={handleSend}
            />
          </div>
        ) : (
          <div className="flex flex-col w-full max-w-[90%] sm:max-w-2xl h-full relative">
            {/* Messages Section - No Scrollbar, Show Recent Messages */}
            <div className="flex-1 overflow-y-hidden overflow-x-hidden max-h-[calc(100vh-220px)] sm:max-h-[calc(100vh-240px)] pt-2 sm:pt-4 messages-container">
              {/* Messages */}
              <div className="space-y-3 sm:space-y-4">
                {displayedMessages.map((message, index) => (
                  <Message
                    key={index}
                    role={message.role}
                    content={message.content}
                  />
                ))}
              </div>
            </div>

{/* Bottom section */}

            <div className="fixed bottom-0 left-24 right-0 flex flex-col items-center px-2 sm:px-4 pb-3 sm:pb-4 pt-1 sm:pt-2 z-10">
              <button
                onClick={handleNewChat}
                className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl px-4 py-2 mb-3 w-auto transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm bg-opacity-80"
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
              <PromptArea
                textareaRef={textareaRef}
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleKeyDown={handleKeyDown}
                handleSend={handleSend}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}