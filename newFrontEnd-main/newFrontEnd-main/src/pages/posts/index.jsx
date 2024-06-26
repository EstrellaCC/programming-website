import React, { useEffect, useState } from 'react';
import { Card, PageHeader, Button, Avatar, List, Spin } from 'antd';
import { history, FormattedMessage } from "umi"; // 导入 FormattedMessage 用于获取国际化信息
import { getPosts } from '@/services/post';
import { PlusOutlined, ReloadOutlined, AntDesignOutlined} from '@ant-design/icons';


const { Meta } = Card;

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  async function refresh() {
    setIsLoading(true); 

    try {
      const res = await getPosts();
      // console.log('res', res);

      if (res.error_code !== 200) {
        console.error(await res.text());
        return;
      }
      const sortedPosts = res.posts.sort((p1, p2) => new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime());
      setPosts(sortedPosts);
    } catch (err) {
      console.error('err', err);
    } finally {
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const generateRandomAvatar = () => {
    return `https://api.dicebear.com/7.x/miniavs/svg?seed=${Math.random()}`;
  };

  const handleCardClick = (postId) => {
    history.push(`/posts/${postId}`);
  };

  const handleRefresh = async () => {
    await refresh(); 
  };

  return (
    <div style={{ background: '#fff', padding: '24px' }}>
      <PageHeader
  style={{ borderBottom: '1px solid rgb(235, 237, 240)' }}
  title={<FormattedMessage id="pages.post.title" />}
  extra={[
    <Button
      key="refreshButton"
      type="default"
      icon={<ReloadOutlined />}
      onClick={handleRefresh} 
    >
      <FormattedMessage id="pages.post.refresh" defaultMessage="刷新" />
    </Button>,
    <Button
      key="createButton"
      type="primary"
      onClick={() => history.push('/posts/create')}
    >
      <PlusOutlined /> <FormattedMessage id="pages.post.create" defaultMessage="创建" />
    </Button>
  ]}
/>

      <div className="container p-4 px-2 md:px-24 xl:px-64">
        {isLoading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={posts}
            renderItem={(post) => (
              <List.Item style={{ width: '100%' }}>
                <Card
                  hoverable
                  onClick={() => handleCardClick(post.id)}
                  style={{ width: '100%', height: '200px' }}
                >
                  <Meta
                    avatar={<Avatar src={generateRandomAvatar()} />}
                    title={post.title}
                    description={post.content}
                  />
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
}
