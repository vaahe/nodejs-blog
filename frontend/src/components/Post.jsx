import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { dateConverter } from '../api/DateConverter';
import { dateCalculation } from '../api/DateCalculation';
import { selectUser } from '../redux/features/user/userSlices';


export const Post = ({ isAuthor, post }) => {
    const navigate = useNavigate();
    const users = useSelector(selectUser);
    const [author, setAuthor] = useState("");

    const userId = users.user.id;
    const content = post.content.substring(0, 300);
    const createdAt = dateConverter(post.createdat);
    const token = window.localStorage.getItem("token");


    const handleEdit = () => {
        navigate(`/users/${userId}/posts/${post.id}/update`);
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await fetch(`http://localhost:8080/posts/${post.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

        } catch (error) {
            console.error('Error during updating:', error);
        }
    }

    const handleDate = () => {
        const today = dateConverter(Date.now());
        const { differenceInDays } = dateCalculation(createdAt, today);

        if (differenceInDays <= 1) {
            return 'today';
        }

        return `${differenceInDays} days ago`;
    }

    const handleName = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${post.authorid}`, {
                method: 'GET'
            })

            const { name } = await response.json();
            setAuthor(name);

        } catch (error) {
            console.error('Error during updating:', error);
        }
    }

    useEffect(() => {
        handleName();
    }, []);

    return (
        <div className="flex flex-col my-8 py-2 px-4 items=-center border border-grey-100 justify-end bg-white w-full shadow-lg rounded-lg md:mx-auto">
            <div className="flex items-start py-6">
                <div className='rounded-full w-[40px] h-[40px] mx-2 bg-blue-300 text-white text-bold leading-[38px] text-center text-2xl'>{author.slice(0, 1)}</div>
                <div className="border border-grey-100 rounded-md p-1 shadow-sm w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 -mt-1">{author}</h2>
                        <small className="text-sm text-gray-700">{handleDate()}</small>
                    </div>
                    <p className="text-gray-700">{createdAt.substring(0, 10)} </p>
                    <p className="mt-3 text-gray-700 text-sm">
                        {content}
                    </p>
                    <div className="mt-4 flex items-center">
                        <div className="flex mr-2 text-gray-700 text-sm mr-3">
                            <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>12</span>
                        </div>
                        <div className="flex mr-2 text-gray-700 text-sm mr-8">
                            <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            <span>8</span>
                        </div>
                        <div className="flex mr-2 text-gray-700 text-sm mr-4">
                            <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span>share</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-end'>
                {
                    isAuthor
                    &&
                    <>
                        <button onClick={handleDelete} className='leading-10 text-center w-24 bg-red-500 text-white rounded-md shadow-md font-semibold transition hover:bg-red-700'>
                            Delete
                        </button>
                        <button onClick={handleEdit} className='m-2 leading-10 text-center w-24 bg-green-600 text-white rounded-md shadow-md font-semibold transition hover:bg-green-700'>
                            Edit
                        </button>
                    </>
                }
                <button className='leading-10 text-center w-24 bg-blue-500 text-white rounded-md shadow-md font-semibold transition hover:bg-blue-700'>
                    See Post
                </button>
            </div>
        </div>
    )
}
