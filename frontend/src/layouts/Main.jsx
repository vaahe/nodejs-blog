import React from 'react';
import { Button } from '../components/Button';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAllPosts, selectMyPosts } from '../redux/features/post/postSlices';

import { SlList } from 'react-icons/sl';
import { BiPlus } from 'react-icons/bi';

export const Main = ({ children }) => {
    const navigate = useNavigate();
    const params = useParams();

    // const allPostsSelector = useSelector(selectAllPosts);
    // const allPostsCount = allPostsSelector[0].length;

    // const myPostsSelector = useSelector(selectMyPosts);
    // const myPostsCount = myPostsSelector[0].length;

    const selector = useSelector(state => state);
    console.log(selector);


    return (
        <div className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4">
            <div className="flex flex-wrap my-5 -mx-2">
                <Button title="All posts" count={'allPostsCount'} img={<SlList />} onClick={() => navigate(`/users/${params.id}/`)} />
                <Button title="My posts" count={'myPostsCount'} img={<SlList />} onClick={() => navigate(`/users/${params.id}/posts`)} />
                <Button title="Create Post" img={<BiPlus />} onClick={() => navigate(`/users/${params.id}/create_post`)} />
            </div>
            {children}
        </div>
    )
}
