import React, { useEffect, useMemo, useState } from 'react';
import { Post } from '../../components/Post';
import { allPosts } from '../../redux/features/post/postSlices';
import { useDispatch } from 'react-redux';
import { Loading } from '../../components/Loading';
import { Pagination } from '../../components/Pagination';

export const AllPosts = () => {
    const dispatch = useDispatch();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = window.localStorage.getItem("token");


    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * 5;
        const lastPageIndex = firstPageIndex + 5;
        return posts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, posts]);

    console.log(currentTableData);


    const getAllPosts = useMemo(() => async () => {
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
    }, [dispatch, token]);


    useEffect(() => {
        getAllPosts();
        setLoading(false)
    }, [getAllPosts]);

    return (
        <>
            <div>
                {loading ? <Loading /> : currentTableData.length && currentTableData.map(post => <Post isAuthor={false} key={post.id} postId={post.id} post={post} />)}
            </div>
            <Pagination
                currentPage={currentPage}
                totalCount={posts.length}
                pageSize={3}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    )
}
