import React, { Component } from 'react';
import { Tag,Typography, message,PageHeader, Descriptions, Image, Button, Row, Col, Progress, Empty, Space } from 'antd';
import ProCard from '@ant-design/pro-card';
import { CodeTwoTone } from '@ant-design/icons';
import './CourseOutline.less';
import { addUserCollection, changeCourseProgress } from '@/services/course/api';
import { getExerciseList } from '@/services/course'; 
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import { MoreOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'umi';
import { Layout } from 'antd';
import { currentUser } from '@/services/user/api';

// const { Header, Footer, Sider, Content } = Layout;
// const gridStyle = {
//   width: '30%',
//   margin: '12px',
//   textAlign: 'center',
// };

const { Title, Paragraph } = Typography;

export default class CourseOutline extends Component {
  state = {
    related_topic: '',
    course_list: [],
    views: '',
    topic_content: '',
    topic_description: '',
    topic_img: '',
    progress: '',
  };

  // listData = [];

  componentDidMount() {
    // 获取目录 & 初始化课程内容
    this.getCatalog();
    this.getProgressInfo();
  }

  getCatalog = async () => {
    // 获取目录
    const { related_topic } = this.props.match.params;
    const res = await getExerciseList(related_topic); 
    if (res.error_code === 200) {
      let { course_list, topic_content, topic_img, topic_description } = res;
      course_list = course_list.map((i) => {
        i.fields.id = i.pk;
        return i.fields;
      });
      this.setState({ course_list, related_topic, topic_content, topic_img, topic_description });
    } else if (res.error_code === 204) {
      let { topic_content, topic_img, topic_description } = res;
      this.setState({
        related_topic,
        topic_content,
        topic_img,
        topic_description,
        course_list: null,
      });
    } else {
      message.error(res.msg);
    }
  };


  getProgressInfo = async () => {
    const { related_topic } = this.props.match.params;
    const res = await currentUser();
    console.log(res, 777777777777777);
    if (res.error_code == 200) {
      let progress = res.data.history;
      progress?.map((element) => {
        if (element.topic == related_topic) {
          this.setState({ progress: element });
        }
      });
    }
  };

  render() {
    const topic = this.props.match.params.related_topic;
    // this.listData = [
    //   {
    //     href: this.props.location.pathname,
    //     title: this.props.match.params.related_topic,
    //     avatar: 'https://joeschmoe.io/api/v1/random',
    //     description: this.state.topic_content,
    //   },
    // ];
    const { related_topic, course_list, topic_description, topic_img } = this.state;

    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <PageHeader
          title={<Title level={2}>{related_topic}</Title>}
          className="site-page-header"
          tags={<Tag color="blue">python</Tag>}
          onBack={() => this.props.history.go(-1)}
          extra={[
            <Button
              onClick={async () => {
                const msg = await addUserCollection({
                  topic: related_topic,
                  collect_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                });
                if (msg.error_code === 204) {
                  message.error('User collection already exists!');
                } else if (msg.error_code === 200) {
                  message.success('User collection added successfully');
                }
              }}
              key="add"
              type="primary"
            >
              <FormattedMessage id="pages.courseOutline.collection" />
            </Button>,
          ]}
        />
          <Row gutter={24}>
          <Col span={12}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Image alt="topic image" src={'/media/' + topic_img} />
              <Title level={3}>{related_topic}</Title>
              <Paragraph>{topic_description}</Paragraph>
            </Space>
          </Col>
          <Col span={12}>
            <div style={{ paddingLeft: 20 }}>
              {course_list ? (
                course_list.map((item, index) => (
                  <ProCard
                    key={index}
                    hoverable
                    style={{ marginBottom: 12 }}
                    title={
                      <Space>
                        <CodeTwoTone style={{ fontSize: 'inherit' }} />
                        <Typography.Text>[{item.subtopic_id}]</Typography.Text>
                        {item.title}
                      </Space>
                    }
                    
                    onClick={() => window.location.href = this.props.location.pathname + '/' + item.id}
                  >
                    <Descriptions size="middle" column={1}>
                      <Descriptions.Item
                        style={{ paddingBottom: '1px' }}
                        label={<FormattedMessage id="pages.common.updateDate" />}
                      >
                        <a>{new Date(item.update_date).toLocaleString()}</a>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={<FormattedMessage id="pages.common.views" />}
                      >
                        <a>{item.views}</a>
                      </Descriptions.Item>
                    </Descriptions>
                    {this.state.progress?.finished_courses?.includes(item.title) ? (
                      <Progress
                        type="circle"
                        width={80}
                        style={{ float: 'right', marginTop: 8 }}
                        percent={100}
                        format={() => 'Done'}
                      />
                    ) : this.state.progress?.progress_course?.title === item.title ? (
                      <Progress
                        type="circle"
                        width={80}
                        style={{ float: 'right', marginTop: 8 }}
                        percent={50}
                        format={() => 'In progress'}
                      />
                    ) : this.state.progress?.unfinished_courses?.includes(item.title) ? (
                      <Progress
                        type="circle"
                        width={80}
                        style={{ float: 'right', marginTop: 8 }}
                        percent={0}
                        format={() => 'To do'}
                        status="active"
                      />
                    ) : null}
                  </ProCard>
                ))
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<FormattedMessage id="pages.common.des.empty" />}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}