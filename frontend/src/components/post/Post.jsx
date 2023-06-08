import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';

import { PostActions } from './PostActions';
import { PostButton } from '../../shared/PostButton';
import { dateConverter } from '../../helpers/DateConverter';
import { dateCalculation } from '../../helpers/DateCalculation';
import { selectUser } from '../../redux/features/user/userSlices';


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
            <div className="flex items-start py-6 w-full">
                <div className='rounded-full w-[40px] h-[40px] mx-2 bg-blue-300 text-white text-bold leading-[38px] text-center text-2xl'>{author.slice(0, 1)}</div>
                <div className="border border-grey-100 rounded-md p-1 shadow-sm w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 -mt-1">{author}</h2>
                        <small className="text-sm text-gray-700">{handleDate()}</small>
                    </div>
                    <p className="text-gray-700">{createdAt.substring(0, 10)}</p>
                    <p className="mt-3 text-gray-700 text-sm">
                        {content}
                    </p>
                    <PostActions />
                </div>
            </div>
            <div className='flex items-center justify-end'>
                {
                    isAuthor
                    &&
                    <>
                        <PostButton color="red" title="Delete Post" onClick={handleDelete} />
                        <PostButton color="green" title="Edit Post" onClick={handleEdit} />
                    </>
                }
            </div>
        </div>
    )
}
