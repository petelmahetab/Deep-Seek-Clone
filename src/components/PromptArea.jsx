"use client";

import Image from "next/image";
import { assets } from "@/images/assets/assets.js";
import { useAppContext } from "@/context/AppContext";

export const PromptArea = ({ textareaRef, inputValue, setInputValue, handleKeyDown, handleSend }) => {
 const {user,chats,setChats,selectedChat,setSelectedChat}=useAppContext();
  
 const sendPromt=async ()=>{
  const promptCopy=prompt;
 }
  return (
    <div className="w-full max-w-[90%] sm:max-w-2xl">
      <div className="bg-[#44464a] rounded-[20px] px-3 sm:px-6 py-1 sm:py-2 flex flex-col gap-2 sm:gap-4 shrink-0 hover:cursor-pointer">
        <div className="flex items-start">
          <textarea
            ref={textareaRef}
            rows={2}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message DeepSeek"
            className="w-full resize-none bg-transparent text-white placeholder-gray-400 outline-none text-sm sm:text-lg overflow-hidden"
            style={{ minHeight: "30px", maxHeight: "120px" }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 pb-2 sm:pb-3">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <button className="bg-[#294cb5c7] text-blue-400 text-xs sm:text-sm font-medium rounded-full px-2 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1 group relative hover:cursor-pointer">
              <Image
                src={assets.deepthink_icon}
                alt="DeepThink"
                className="bg-blue-800 text-blue-900 w-3 h-3 sm:w-4 sm:h-4"
                width={12}
                height={12}
              />
              DeepThink (R1)
              <span className="absolute left-24 sm:left-32 bottom-full mb-1 sm:mb-2 hidden group-hover:block text-xs text-white bg-black px-2 sm:px-4 py-1 sm:py-2 rounded-tl-2xl rounded-tr-1px rounded-tr-2xl rounded-br-2xl shadow-md">
                DeepThink
              </span>
            </button>
            <button className="bg-[#2c2d30] text-white text-xs sm:text-sm font-medium rounded-full px-2 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1 group relative p-1 transition duration-200 ease-in-out hover:bg-gradient-to-tr from-[#2c2d30] to-[#44464a] hover:ring-1 hover:cursor-pointer hover:ring-gray-500">
              <Image
                src={assets.search_icon}
                alt="Search"
                width={16}
                height={14}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              Search
              <span className="absolute w-full left-14 sm:left-18 bottom-full mb-1 sm:mb-2 hidden group-hover:block text-xs text-white bg-black px-2 py-1 sm:py-2 rounded-tl-2xl rounded-tr-1px rounded-tr-2xl rounded-br-2xl shadow-md hover:cursor-pointer">
                Search
              </span>
            </button>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative group">
              <Image
                src={assets.pin_icon}
                alt="Attach"
                width={23}
                height={15}
                className="p-1 rounded-full transition duration-200 ease-in-out hover:bg-gradient-to-tr from-[#2c2d30] to-[#44464a] hover:ring-1 hover:ring-gray-500 hover:cursor-pointer"
              />
              <span className="absolute bottom-full mb-1 sm:mb-2 hidden group-hover:block text-xs text-white bg-black/70 px-2 sm:px-3 py-1 sm:py-2 rounded-tl-2xl rounded-tr-1px rounded-tr-2xl rounded-br-2xl shadow-md ">
                Attach
              </span>
            </button>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`rounded-full p-2 sm:p-3 relative group ${
                inputValue.trim()
                  ? "bg-blue-400 hover:bg-blue-500"
                  : "bg-[#3a3b3f] cursor-not-allowed"
              }`}
            >
              <Image
                src={
                  inputValue.trim() ? assets.arrow_icon : assets.arrow_icon_dull
                }
                alt="Send"
                width={12}
                height={14}
                className="w-3 h-3 sm:w-4 sm:h-4 "
              />
              {/* <span className="absolute bottom-full mb-1 sm:mb-2 hidden group-hover:block text-xs text-white bg-black px-2 sm:px-3 py-1 rounded-tl-2xl rounded-tr-1px rounded-tr-2xl rounded-br-2xl shadow-md">
                Send
              </span> */}
            </button>
          </div>
        </div>
      </div>
      {/* Disclaimer Text Below the Prompt Area */}
      <div className="flex justify-center mt-1 sm:mt-2">
        <p className="text-[10px] sm:text-[13px] text-zinc-500 font-bold">
          AI-generated, for reference only.
        </p>
      </div>
    </div>
  );
};