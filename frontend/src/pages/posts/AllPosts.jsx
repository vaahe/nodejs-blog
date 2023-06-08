import { useDispatch } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';

import { Post } from '../../components/post/Post';
import { Loading } from '../../components/Loading';
import { Pagination } from '../../components/Pagination';
import { allPosts } from '../../redux/features/post/postSlices';


export const AllPosts = () => {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const token = window.localStorage.getItem("token");

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * 5;
        const lastPageIndex = firstPageIndex + 5;
        return posts?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, posts]);

    const getAllPosts = useMemo(() => async () => {
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/posts/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            dispatch(allPosts(data));
            setPosts(data);
        } catch (error) {
            console.error(error);
        }
    }, [dispatch, token]);


    useEffect(() => {
        getAllPosts();
        setLoading(false)
    }, [getAllPosts]);

    return (
        <>
            {loading ? <Loading /> : currentTableData.length && currentTableData.map(post =>
                <Post isAuthor={false} key={post.id} postId={post.id} post={post} />
            )}
            <Pagination
                currentPage={currentPage}
                totalCount={posts?.length}
                pageSize={5}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    )
}
