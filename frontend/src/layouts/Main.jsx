import React from 'react';
import { SlList } from 'react-icons/sl';
import { BiPlus } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { Button } from '../components/Button';
import { selectAllPosts, selectMyPosts } from '../redux/features/post/postSlices';



export const Main = ({ children }) => {
    const params = useParams();
    const navigate = useNavigate();

    const allPostsSelector = useSelector(selectAllPosts);
    const allPostsCount = allPostsSelector[0]?.length;

    const myPostsSelector = useSelector(selectMyPosts);
    const myPostsCount = myPostsSelector[0]?.length;

    return (
        <div className="ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4">
            <div className="flex flex-wrap my-5 -mx-2">
                <Button title="All posts" count={allPostsCount} img={<SlList />} onClick={() => navigate(`/users/${params.userId}/`)} />
                <Button title="My posts" count={myPostsCount} img={<SlList />} onClick={() => navigate(`/users/${params.userId}/posts`)} />
                <Button title="Create Post" img={<BiPlus />} onClick={() => navigate(`/users/${params.userId}/create`)} />
            </div>
            {children}
        </div>
    )
}
