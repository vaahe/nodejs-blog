import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

export const Button = ({ title, count, img, onClick }) => {
    return (
        <button className="w-full lg:w-1/3 p-2 transition hover:scale-105" onClick={onClick}>
            <div className="flex justify-between w-full bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-pink-500 rounded-md p-3">
                <div className='flex'>
                    <div className="flex justify-center text-indigo-500 dark:text-white items-center bg-white dark:bg-[#0F172A] rounded-md flex-none w-8 h-8 md:w-12 md:h-12 text-3xl">
                        {img}
                    </div>
                    <div className="flex flex-col justify-around flex-grow ml-5 text-white">
                        <div className="text-xs whitespace-nowrap">
                            {title}
                        </div>
                        <div className="">
                            {count}
                        </div>
                    </div>
                </div>

                <div className="flex items-center flex-none text-white">
                    <MdKeyboardArrowRight />
                </div>
            </div>
        </button>
    )
}
