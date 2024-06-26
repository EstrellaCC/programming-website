import React, { useState } from "react";
import { history } from 'umi';
import { createPost } from "@/services/post";
import { Input, Button, Divider, Steps, Card } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import "./create.less";

const { Step } = Steps;

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    error: "",
    current: 0
  });

  const onChange = (value) => {
    console.log('onChange:', value);
    setFormData({ ...formData, current: value });
  };

  const nextStep = () => {
    const next = current + 1;
    if (next < 3) {
      setFormData({ ...formData, current: next });
    } else {
      submit();
    }
  };

  const { title, content, imageUrl, error, current } = formData;

  async function submit() {
    if (!title || !content || !imageUrl) {
      setFormData({ ...formData, error: "请填写所有必填字段" });
      return;
    }
    try {
      const res = await createPost(title, content, imageUrl);
      console.log("Response:", res);
      if (res.data) {
        console.log("Navigating to /posts/" + res.data.id);
        history.push('/posts/' + res.data.id);
      } else {
        alert('发布失败');
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleBack = () => {
    history.push('/posts'); // 返回到博客列表页面
  };

  return (
    <div className="page-container" style={{ fontSize: '1.2rem' }}>
      <div className="max-w-lg w-full p-8 rounded-lg shadow-md">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h1 className="text-4xl font-bold mb-6">发表新文章</h1>
          <Button type="text" icon={<LeftOutlined />} onClick={handleBack} size="large">返回</Button>
        </div>
        <Divider />
        <Steps current={current} onChange={onChange}>
          <Step title="标题" />
          <Step title="内文" />
          <Step title="图片输入地址" />
        </Steps>
        <Divider />
        <div className="article-info">
          <div className={`input-field ${current === 0 ? '' : 'hidden'}`} style={{ width: '100%', marginBottom: '2rem' }}>
            <Card title="标题" style={{ fontSize: '1.2rem', minHeight: '100px' }}>
              <Input size="large" value={title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} onPressEnter={nextStep} placeholder="请输入标题" style={{ fontSize: '1.2rem', height: '50px' }} />
            </Card>
          </div>
          <div className={`input-field ${current === 1 ? '' : 'hidden'}`} style={{ width: '100%', marginBottom: '2rem' }}>
            <Card title="内文" style={{ fontSize: '1.2rem', minHeight: '200px' }}>
              <Input.TextArea rows={4} value={content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} onPressEnter={nextStep} placeholder="请输入内文" style={{ fontSize: '1.2rem', height: '150px' }} />
            </Card>
          </div>
          <div className={`input-field ${current === 2 ? '' : 'hidden'}`} style={{ width: '100%', marginBottom: '2rem' }}>
            <Card title="封面图片地址" style={{ fontSize: '1.2rem', minHeight: '100px' }}>
              <Input size="large" value={imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} onPressEnter={submit} placeholder="请输入封面图片地址" style={{ fontSize: '1.2rem', height: '50px' }} />
            </Card>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={submit} className="w-1/4" type="primary" size="large">发布</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
