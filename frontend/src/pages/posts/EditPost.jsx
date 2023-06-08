import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { selectMyPosts } from "../../redux/features/post/postSlices";


export const EditPost = () => {
    const params = useParams();
    const navigate = useNavigate();
    const myPosts = useSelector(selectMyPosts);
    const post = myPosts[0].find(elem => elem.id === parseInt(params.postId));

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const postId = params.postId;
    const token = window.localStorage.getItem("token");

    const handleTextarea = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const handleTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch(`http://localhost:8080/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            });

            navigate(`/users/${params.userId}/posts`);
        } catch (error) {
            console.error('Error during updating:', error);
        }
    }

    return (
        <div className="m-12">
            <div className="text-center font-bold text-2xl m-5 text-gray-800">Edit Post</div>
            <form className="rounded-md mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl" onSubmit={handleSubmit}>
                <input
                    className="rounded-md bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitle}
                    type="text" />
                <textarea
                    className="rounded-md bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                    placeholder="Describe everything about this post here"
                    maxLength={300}
                    value={content}
                    onChange={handleTextarea}
                />

                <div className="flex text-gray-500 m-2">
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    <div className="count ml-auto text-gray-400 text-xs font-semibold">{content.length}/300</div>
                </div>
                <div className="flex justify-end">
                    <button className="btn border border-indigo-500 rounded-md p-1 px-4 font-semibold cursor-pointer text-white ml-2 bg-indigo-500" >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
