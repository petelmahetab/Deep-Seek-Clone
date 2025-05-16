import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/images/assets/assets';

const ChatHistoryItem = ({ chat, onRename, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(chat.title);

  const handleRename = () => {
    setIsRenaming(false);
    if (newTitle.trim() && newTitle !== chat.title) {
      onRename(chat.id, newTitle);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log('Dropdown toggled, isDropdownOpen:', !isDropdownOpen); // Debug log
  };

  return (
    <div className="flex items-center justify-between p-2 text-white text-sm group cursor-pointer rounded-xl hover:bg-[#2c2d30]/80 transition-all duration-200 backdrop-blur-sm bg-opacity-50 border border-gray-700/30">
     
      {isRenaming ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename();
            if (e.key === 'Escape') {
              setIsRenaming(false);
              setNewTitle(chat.title);
            }
          }}
          className="flex-1 bg-[#333437] text-white border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
          autoFocus
        />
      ) : (
        <span className="truncate flex-1">{chat.title}</span>
      )}

   
      <div className="flex items-center gap-2">
        {chat.date && (
          <span className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {chat.date}
          </span>
        )}
        <div className="relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Image
            src={assets.three_dots}
            alt="Options"
            className="w-4"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div
              className="absolute right-0  bottom-full  bg-gray-800 rounded-xl w-max p-3 shadow-lg border border-gray-600 z-[2000] min-w-[120px]"
              onClick={(e) => e.stopPropagation()} 
            >
              <div>
                <p
                  className="text-[12px] absolute top-0 right-3 p-1 mt-1  bg-gray-600 hover:bg-gray-700 w-auto rounded-md hover:text-black cursor-pointer"
                  onClick={() => setIsDropdownOpen(false)} 
                >
                  Close
                </p>
              </div>

              <div
                className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 mt-3 rounded-lg cursor-pointer"
                onClick={() => {
                  setIsRenaming(true);
                  setIsDropdownOpen(false);
                }}
              >
                <Image src={assets.pencil_icon} alt="Rename" className="w-4" />
                <p className="text-sm">Rename</p>
              </div>

              <div
                className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer"
                onClick={() => {
                  onDelete(chat.id);
                  setIsDropdownOpen(false);
                }}
              >
                
                <Image src={assets.delete_icon} alt="Delete" className="w-4" />
                <p className="text-sm">Delete</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryItem;