import React, { useEffect, useState } from 'react';
import { Post } from '../../components/Post';
import { allPosts } from '../../redux/features/post/postSlices';
import { useDispatch } from 'react-redux';
import { Loading } from '../../components/Loading';

export const AllPosts = () => {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = window.localStorage.getItem("token");
    

    const getAllPosts = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/posts/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        dispatch(allPosts(data));
        setPosts(data);
    }

    useEffect(() => {
        getAllPosts();
        setLoading(false);
    }, []);

    return (
        <div>
            {loading ? <Loading /> : posts.length && posts.map(post => <Post isAdmin={false} key={post.id} />)}
        </div>
    )
}
