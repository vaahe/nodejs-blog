import React, { useEffect, useState } from 'react';
import { Post } from '../../components/Post';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { myPosts } from '../../redux/features/post/postSlices';

export const MyPosts = () => {
  const token = window.localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();

  const getMyPosts = async () => {
    const response = await fetch(`http://localhost:8080/posts/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    dispatch(myPosts(data));
    setPosts(data);
  }

  //   const getMyPosts = async () => {
  //     navigate(`/users/${params.id}/posts`);
  //     const response = await fetch(`http://localhost:8080/posts/${params.id}`, {
  //         method: "GET",
  //         headers: {
  //             Authorization: `Bearer ${token}`
  //         }
  //     });

  //     const data = await response.json();
  //     console.log(data);
  // }

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div>
      {posts.length && posts.map(post => <Post isAdmin={true} key={post.id} />)}
    </div>
  )
}
