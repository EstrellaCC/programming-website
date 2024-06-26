import { request } from 'umi';

// 创建帖子
export const createPost = async (title, content, imageUrl, author_name, avatarUrl) => {
    const url = '/CourseServer/server2/V1/posts/create/';
    return request(url, {
      method: 'post',
      data: {
        request_entity: 'Post',
        title,
        content,
        imageUrl
      },
    });
  };
  
  // 获取所有帖子
  export const getPosts = async () => {
    const url = '/CourseServer/server2/V1/posts/';
    return request(url, {
      method: 'GET',
    });
  };
  
  // 获取特定帖子的详情
  export const getPostDetails = async (post_id) => {
    const url = `/CourseServer/server2/V1/posts/${post_id}/`;
    return request(url, {
      method: 'GET',
    });
  };
  
 
  