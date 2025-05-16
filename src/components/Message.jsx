import React from 'react';
import Image from 'next/image';
import { assets } from '@/images/assets/assets';

const Message = ({ role, content, className }) => {
    return (
        <div className={`flex flex-col items-center w-full max-w-[90%] sm:max-w-2xl md:max-w-3xl text-xs sm:text-sm ${className}`}>
            <div className={`flex flex-col w-full mb-6 sm:mb-8 ${role === 'user' && 'items-end'}`}>
                <div
                    className={`group relative flex max-w-full sm:max-w-2xl py-2 sm:py-3 rounded-xl ${role === 'user' ? 'bg-[#414158] px-3 sm:px-5' : 'gap-2 sm:gap-3'
                        }`}
                >
                    <div
                        className={`opacity-0 group-hover:opacity-100 absolute ${role === 'user' ? '-bottom-5 sm:-bottom-6 left-0 right-4 flex justify-end' : 'left-7 sm:left-9 -bottom-5 sm:-bottom-6'
                            } transition-all`}
                    >
                        <div className="flex flex-row items-center  gap-3 sm:gap-5  opacity-70">
                            {role === 'user' ? (
                                <>
                                    <button>
                                        <div className="relative group/icon ">
                                            <Image src={assets.copy_icon} alt="Copy" className="w-3 sm:w-4 cursor-pointer mt-5" />
                                            <span className="absolute top-5 right-0 transform -translate-x-1/2  px-3 py-2 bg-black text-white text-xs rounded-tl-3xl  rounded-br-3xl rounded-bl-3xl opacity-0 group-hover/icon:opacity-100 transition-opacity">
                                                Copy
                                            </span>
                                        </div>
                                    </button>
                                    <button>
                                        <div className="relative group/icon">
                                            <Image src={assets.pencil_icon} alt="Edit" className="w-3.5 sm:w-4.5 cursor-pointer mt-5" />
                                            <span className="absolute  left-4 top-7 transform -translate-x-1/2 mb-1 mt-2 px-3 py-2 bg-black text-white text-xs rounded-tl-1xl rounded-bl-3xl rounded-tr-3xl rounded-br-3xl opacity-0 group-hover/icon:opacity-100 transition-opacity">
                                                Edit
                                            </span>
                                        </div>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button>
                                        <div className="relative group/icon">
                                            <Image src={assets.copy_icon} alt="Copy" className="w-3.5 sm:w-4.5 cursor-pointer" />
                                            <span className="absolute  left-8 right-0 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded-tl-3xl  rounded-br-3xl rounded-bl-3xl opacity-0 group-hover/icon:opacity-100 transition-opacity">
                                                Copy
                                            </span>
                                        </div>
                                    </button>
                                    <button>
                                        <div className="relative group/icon">
                                            <Image src={assets.regenerate_icon} alt="Regenerate" className="w-3 sm:w-4 cursor-pointer" />
                                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded-tl-3xl rounded-tr-2xl rounded-br-3xl opacity-0 group-hover/icon:opacity-100 transition-opacity">
                                                Regenerate
                                            </span>
                                        </div>
                                    </button>
                                    <button>                  <div className="relative group/icon">
                                        <Image src={assets.like_icon} alt="Like" className="w-3 sm:w-4 cursor-pointer" />
                                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded-tl-3xl rounded-tr-2xl rounded-br-3xl opacity-0 group-hover/icon:opacity-100 transition-opacity">
                                            Like
                                        </span>
                                    </div>
                                    </button>
                                    <button>
                                        <div className="relative group/icon">
                                            <Image src={assets.dislike_icon} alt="Dislike" className="w-3.5 sm:w-4.5 cursor-pointer" />
                                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded-tl-3xl rounded-tr-2xl rounded-br-3xl opacity-0 group-hover/icon:opacity-100 transition-opacity">
                                                Dislike
                                            </span>
                                        </div>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {role === 'user' ? (
                        <span className="text-white/90">{content}</span>
                    ) : (
                        <>
                            <Image
                                src={assets.logo_icon}
                                alt="Logo"
                                className="h-7 w-7 sm:h-9 sm:w-9 p-1 border border-white/15 rounded-full"
                            />
                            <div className="">{content}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;