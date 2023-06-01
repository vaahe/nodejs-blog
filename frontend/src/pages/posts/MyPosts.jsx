import React, { useEffect, useMemo, useState } from 'react';
import { Post } from '../../components/Post';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { myPosts } from '../../redux/features/post/postSlices';
import { Pagination } from '../../components/Pagination';

export const MyPosts = () => {
  const token = window.localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 5;
    const lastPageIndex = firstPageIndex + 5;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, posts]);

  console.log(currentTableData);

  const getMyPosts = async () => {
    const response = await fetch(`http://localhost:8080/posts/${params.userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    dispatch(myPosts(data));
    setPosts(data);
  }

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <>
      <div>
        {currentTableData.length && currentTableData.map(post => <Post isAuthor={true} key={post.id} postId={post.id} post={post} />)}
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
