import React, { useEffect, useState } from "react";
import { Button,Avatar  } from 'antd';
import { getPostDetails } from "@/services/post";
import { history, useParams } from 'umi';
import './singlePage.less'

export default function SinglePage() {
  const { post_id } = useParams();
  
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getPostDetails(post_id);
        console.log('res', res);
        if (res) {
          res.imageUrl = 'http://127.0.0.1:8002' + res.data.imageUrl
          res.content=res.data.content
          res.author_name=res.data.author_name
          res.createdAt=res.data.createdAt
          console.log(res.imageUrl);
          setPost(res);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    }
    fetchData();
  }, [post_id]);

  const generateRandomAvatar = () => {
    return `https://api.dicebear.com/7.x/miniavs/svg?seed=${Math.random()}`;
  };


  const handleBack = () => {
    history.push('/posts'); // 返回到帖子列表页面
  };

  if (post === null) {
    return <div>Post with ID {post_id} not found.</div>
  }

  return (
    <div className="max-w-screen container rounded-lg shadow-md p-8">
      <div className="post">
        <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
        <div className="author flex items-center mb-4">
        <Avatar src={generateRandomAvatar()} className="w-8 h-8 rounded-full mr-2" />
          <p className="text-gray-700">{post.author_name}</p>
        </div>
        <p className="text-gray-600 mb-2">Created At: {new Date(post.createdAt).toLocaleDateString()}</p>
        <img src={post.imageUrl} alt="Post Image" className="w-full object-cover rounded-lg shadow-md mb-4" />
        <p className="text-gray-800">{post.content}</p>
        <Button onClick={handleBack} className="mt-4">Back to Posts</Button>
      </div>
    </div>
  );
  
  
};
