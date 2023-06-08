import { useDispatch } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';

import { useParams } from 'react-router';
import { Post } from '../../components/post/Post';
import { Pagination } from '../../components/Pagination';
import { myPosts } from '../../redux/features/post/postSlices';

export const MyPosts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const token = window.localStorage.getItem("token");

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 5;
    const lastPageIndex = firstPageIndex + 5;
    return posts.length && posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, posts]);

  const getMyPosts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${params.userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      dispatch(myPosts(data));
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMyPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        {currentTableData?.length && currentTableData.map(post => <Post isAuthor={true} key={post.id} postId={post.id} post={post} />)}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={posts?.length}
        pageSize={3}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  )
}
