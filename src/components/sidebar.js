"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { assets } from "@/images/assets/assets.js";
import { useClerk, useUser, UserButton } from "@clerk/nextjs";
import ChatHistorySection from "./ChatHistorySection";
import ChatHistoryItem from "./ChatHistoryItem";

const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const signInAppearance = {
    elements: {
      rootBox: {
        backgroundColor: "#1e1f24",
        color: "#ffffff",
      },
      modalOverlay: {
        backgroundColor: "rgba(30, 31, 36, 0.9)",
      },
      modalContent: {
        backgroundColor: "#1e1f24",
        color: "#ffffff",
      },
      card: {
        backgroundColor: "#2a2b30",
        color: "#ffffff",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
      },
      header: {
        backgroundColor: "#1e1f24",
        color: "#ffffff",
      },
      headerTitle: {
        color: "#ffffff",
        fontWeight: "600",
      },
      headerSubtitle: {
        color: "#d0d0d0",
      },
      formFieldLabel: {
        color: "#ffffff",
      },
      formFieldInput: {
        backgroundColor: "#333437",
        color: "#ffffff",
        borderColor: "#666",
        "&:focus": {
          borderColor: "#3b5cd5",
          boxShadow: "0 0 0 1px #3b5cd5",
        },
      },
      formButtonPrimary: {
        backgroundColor: "#3b5cd5",
        color: "#ffffff",
        "&:hover": { backgroundColor: "#4a6de5" },
      },
      footer: {
        display: "none",
      },
      socialButtons: {
        "& .cl-socialButtonsIconButton": {
          backgroundColor: "#333437",
          borderColor: "#666",
          "&:hover": { backgroundColor: "#44464a" },
        },
        "& .cl-socialButtonsIconButton__icon": {
          color: "#ffffff",
        },
      },
      dividerLine: {
        backgroundColor: "#666",
      },
      dividerText: {
        color: "#d0d0d0",
      },
    },
  };

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: expand
        ? "w-10 h-10 opacity-90 hover:opacity-100 transition-opacity duration-200"
        : "w-9 h-9 p-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-br from-[#2c2d30] to-[#44464a] hover:ring-2 hover:ring-blue-500 hover:scale-110 backdrop-blur-sm bg-opacity-50",
      userButtonBox: "flex items-center",
      userButtonTrigger: "flex items-center gap-2",
      userButtonPopoverCard: {
        backgroundColor: "#2a2b30",
        color: "#ffffff",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
      },
      userButtonOuterIdentifier: {
        color: "#ffffff",
        fontWeight: "500",
      },
      userButtonPopoverActionButton: {
        backgroundColor: "#2a2b30",
        color: "#ffffff",
        "&:hover": { backgroundColor: "#44464a" },
      },
      userButtonPopoverActionButtonIcon: {
        color: "#ffffff",
      },
      userButtonPopoverFooter: {
        display: "none",
      },
      userButtonPopoverMain: {
        backgroundColor: "#2a2b30",
        color: "#ffffff",
      },
      userButtonPopoverActions: {
        backgroundColor: "#2a2b30",
      },
      userButtonAvatarImage: {
        backgroundColor: "#333437",
      },
      userButtonPopoverManageAccountModal: {
        backgroundColor: "#1e1f24",
        color: "#ffffff",
      },
      userButtonPopoverManageAccountModalOverlay: {
        backgroundColor: "rgba(30, 31, 36, 0.9)",
      },
      userButtonPopoverManageAccountModalCard: {
        backgroundColor: "#2a2b30",
        color: "#ffffff",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
      },
      userButtonPopoverManageAccountModalHeader: {
        backgroundColor: "#1e1f24",
        color: "#ffffff",
      },
      userButtonPopoverManageAccountModalHeaderTitle: {
        color: "#ffffff",
        fontWeight: "600",
      },
      userButtonPopoverManageAccountModalHeaderSubtitle: {
        color: "#d0d0d0",
      },
      userButtonPopoverManageAccountModalFormFieldLabel: {
        color: "#ffffff",
      },
      userButtonPopoverManageAccountModalFormFieldInput: {
        backgroundColor: "#333437",
        color: "#ffffff",
        borderColor: "#666",
        "&:focus": {
          borderColor: "#3b5cd5",
          boxShadow: "0 0 0 1px #3b5cd5",
        },
      },
      userButtonPopoverManageAccountModalFormButtonPrimary: {
        backgroundColor: "#3b5cd5",
        color: "#ffffff",
        "&:hover": { backgroundColor: "#4a6de5" },
      },
      userButtonPopoverManageAccountModalFooter: {
        display: "none",
      },
    },
  };

  return (
    <div>
      <div
        className={`transition-all duration-300 ease-in-out bg-gradient-to-b bg-[#1e1f24] from-[#1e1f24] to-[#2a2b30] h-screen flex flex-col justify-between pt-6 pb-6 ${
          expand ? "w-64" : "w-20"
        } shadow-2xl`}
      >
        {/* Top Section */}
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-full relative group flex ${
              expand ? "flex-row justify-between" : "flex-col"
            } items-center cursor-pointer focus:outline-none px-4`}
          >
            <div className="flex flex-col items-center mb-4">
              {expand ? (
                <Image
                  src={assets.logo_text}
                  alt="DEEPSEEK Logo"
                  width={120}
                  height={40}
                  className="ml-2 transition-opacity duration-300 hover:brightness-110"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Image
                    src={assets.logo_icon}
                    alt="Logo"
                    width={80}
                    height={80}
                    className="object-contain opacity-95 hover:opacity-100 transition-all duration-300 hover:scale-105"
                  />
                </div>
              )}
            </div>

            <button>
              <div
                onClick={() => setExpand(!expand)}
                className="flex flex-col items-center"
              >
                <Image
                  src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
                  alt="Sidebar"
                  width={40}
                  height={40}
                  className="p-1 rounded-full mb-4 transition-all duration-300 ease-in-out hover:bg-gradient-to-tr from-[#2c2d30] to-[#44464a] hover:ring-2 hover:ring-blue-500 hover:scale-110"
                />
                {!expand ? (
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 hidden group-hover:flex bg-black/90 text-white text-xs px-3 py-1 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl shadow-lg transition-opacity duration-200 whitespace-nowrap">
                    Open Sidebar
                  </div>
                ) : (
                  <div className="absolute left-full ml-3 top-2 -translate-y-1/2 hidden group-hover:flex bg-black/90 text-white text-[12px] px-3 py-2 rounded-tl-3xl rounded-tr-2xl rounded-br-3xl shadow-lg transition-opacity duration-200 whitespace-nowrap">
                    Close Sidebar
                  </div>
                )}
              </div>
            </button>
          </div>

          {!expand && (
            <button className="relative group flex flex-col cursor-pointer items-center focus-outline-none ">
              <div>
                <Image
                  src={assets.chat_icon}
                  alt="New Chat"
                  width={43}
                  height={40}
                  className="p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-[#2c2d30] to-[#44464a] hover:ring-2 hover:ring-blue-500 hover:scale-110 backdrop-blur-sm bg-opacity-50"
                />
                <div className="absolute left-full ml-9 top-1/2 -translate-y-1/2 hidden group-hover:flex bg-black/90 text-white text-xs px-3 py-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl shadow-lg transition-opacity duration-200 whitespace-nowrap">
                  New Chat
                </div>
              </div>
            </button>
          )}

          {/* Use the new ChatHistorySection component */}
          <ChatHistorySection expand={expand} />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4">
          {/* Get App Button */}
          {expand ? (
            <button className="relative group flex items-center justify-between bg-transparent border border-blue-500/50 text-white rounded-full px-4 py-2 mx-4 transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-400 active:scale-95 shadow-md backdrop-blur-sm bg-opacity-50">
              <div className="flex items-center">
                <Image
                  src={assets.phone_icon}
                  alt="Phone"
                  width={28}
                  height={20}
                  className="mr-2"
                />
                <span className="text-sm font-semibold tracking-wide">
                  Get App
                </span>
              </div>
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full px-2 py-1 ml-2">
                NEW
              </span>
              <div className="absolute z-[2000] w-[140px]  ml-6  left-50 -translate-y-1/3 hidden group-hover:flex bg-black/90 text-white px-3 py-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl shadow-lg transition-opacity duration-200">
                <Image
                  src={assets.qrcode}
                  alt="QR Code"
                  width={160}
                  height={250}
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
            </button>
          ) : (
            <button className="relative group flex cursor-pointer flex-col items-center focus-outline-none">
              <Image
                src={assets.phone_icon}
                alt="Phone"
                width={45}
                height={28}
                className="p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-[#2c2d30] to-[#44464a] hover:ring-2 hover:ring-blue-500 hover:scale-110 backdrop-blur-sm bg-opacity-50"
              />
              <div className="absolute w-[140px] left-0 ml-3 bottom-0 -translate-y-1/3 hidden group-hover:flex bg-black/90 text-white px-3 py-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl shadow-lg transition-opacity duration-200">
                <Image
                  src={assets.qrcode}
                  alt="QR Code"
                  width={150}
                  height={200}
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
            </button>
          )}

          {/* Profile Section */}
          {expand ? (
            <div className="flex items-center px-4 py-2 rounded-xl hover:bg-[#2c2d30]/80 transition-all duration-200 cursor-pointer backdrop-blur-sm bg-opacity-50 border border-gray-700/30">
              {isSignedIn ? (
                <>
                  <UserButton
                    showName={true}
                    appearance={userButtonAppearance}
                  />
                </>
              ) : (
                <button
                  onClick={() => {
                    console.log("Sign In ")
                    openSignIn({
                       appearance: signInAppearance })}}
                  className="flex items-center w-full"
                >
                  <Image
                    src={assets.profile_icon}
                    alt="Profile"
                    width={40}
                    height={28}
                    className="cursor-pointer opacity-90 hover:opacity-100"
                  />
                  <span className="ml-2 text-white text-sm font-semibold tracking-wide">
                    Sign In
                  </span>
                </button>
              )}
            </div>
          ) : (
            <div className="relative group flex flex-col items-center">
              {isSignedIn ? (
                <UserButton
                  appearance={userButtonAppearance}
                />
              ) : (
                <button onClick={() => openSignIn({ appearance: signInAppearance })}>
                  <Image
                    src={assets.profile_icon}
                    alt="Profile"
                    width={35}
                    height={28}
                    className="cursor-pointer opacity-90 hover:opacity-100 p-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-br from-[#2c2d30] to-[#44464a] hover:ring-2 hover:ring-blue-500 hover:scale-110 backdrop-blur-sm bg-opacity-50"
                  />
                </button>
              )}
              <div className="absolute bottom-full mb-2 hidden group-hover:block text-xs text-white bg-black/90 px-2 py-1 rounded shadow-lg transition-opacity duration-200">
                {isSignedIn ? "Profile" : "Sign In"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;