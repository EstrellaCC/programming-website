
import React, { useState, useEffect } from 'react';
import { message, Select, Collapse, Space, Alert, Button, Modal, Input, Divider } from 'antd';
import ProCard from '@ant-design/pro-card';
import PubSub from 'pubsub-js';
import { setLocale, getLocale, FormattedMessage } from 'umi';
import moment from 'moment';
import { addCourseProgress } from '@/services/course/api';
import { deletePic } from '@/services/editor';
import './result.less';
import { getCourseDetail } from '@/services/course.js';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/mode/shell/shell.js';

const { TextArea } = Input;
const { Panel } = Collapse;

export default function Output(props) {
  const [result, setResult] = useState('');
  const [res_status, setRes_status] = useState('info');
  const [pics, setPics] = useState([]);
  const [pic_visible, setPic_visible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [courseDetail, setCourseDetail] = useState({});
  const [id, setId] = useState('');

  useEffect(() => {
    const showResSubscription = PubSub.subscribe('showRes', (_, data) => {
      let res = data.output;
      if (data.error_code === 200) {
        setRes_status('success');
        handleCourseProgress();
      } else if (data.error_code === 410 || data.error_code === 408) {
        setRes_status('warning');
      } else if (data.error_code === 500) {
        setRes_status('error');
      } else {
        setRes_status('info');
      }
      setResult(res);
      compareAnswer(res);
    });

    const showPicSubscription = PubSub.subscribe('showPic', (_, data) => {
      let pic = { url: data.url, key: pics.length };
      setPics([...pics, pic]);
      setPic_visible(true);
    });

    const idSubscription = PubSub.subscribe('id', (_, data) => {
      if (data.id !== id) {
        setId(data.id);
      }
    });

    return () => {
      PubSub.unsubscribe(showResSubscription);
      PubSub.unsubscribe(showPicSubscription);
      PubSub.unsubscribe(idSubscription);
    };
  }, [id, pics]);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlePicCancel = async (pics) => {
    setPic_visible(false);
    await deletePic(pics[0].url.substring(0, pics[0].url.lastIndexOf('\\')));
    setPics([]);
  };

  const handleCourseProgress = async () => {
    let { id, related_topic } = props;
    const msg = await addCourseProgress({
      topic: related_topic,
      course_id: id,
      last_practice_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    console.log(msg, 4444);
  };

  const fetchCourseDetail = async () => {
    try {
      const { related_topic, id } = props;
      const response = await getCourseDetail(related_topic, id);
      setCourseDetail(response.data);
    } catch (error) {
      console.error('Error fetching course detail:', error);
    }
  };

  useEffect(() => {
    fetchCourseDetail();
  }, []);

  const compareAnswer = (result) => {
    const { answer } = courseDetail; 
    console.log("课程答案:", answer);
    if (answer && answer.trim() === result.trim()) {
      setRes_status('success');
    } else {
      setRes_status('error');
    }
  };

  const options = {
    mode: 'shell',
    readOnly: true,
    theme: 'gruvbox-dark',
    cursorScrollMargin: 5,
    smartIndent: false,
    scrollbarStyle: 'simple',
    lineNumbers: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
  };

  return (
    <ProCard ghost>
      <Collapse bordered={false} ghost className="reshint" defaultActiveKey={['2']}>
        <Divider />
        <CodeMirror
          className="output"
          value={result}
          options={options}
          onFocus={(editor) => {
            editor.scrollIntoView();
          }}
        />
        <Panel header={<FormattedMessage id="pages.editor.showHints" />} key="1">
          <div>{props.hint}</div>
        </Panel>
        <Panel
          header={<FormattedMessage id="pages.editor.result" />}
          key="2"
          className={res_status}
          extra={
            <Space>
              <Button size="small" type="ghost" onClick={showModal}>
                <FormattedMessage id="pages.editor.detail" />
              </Button>
              <Modal
                visible={visible}
                title={res_status}
                onCancel={handleCancel}
                width={800}
                footer=""
              >
                <TextArea
                  value={
                    res_status === 'info'
                      ? getLocale() === 'zh-CN'
                        ? '--- 结果将会显示在这里 ---'
                        : '--- Results will be shown here ---'
                      : result
                        ? result
                        : ''
                  }
                  autoSize
                  bordered={false}
                  status={res_status}
                />
              </Modal>
            </Space>
          }
        >
          <Alert
            message={res_status}
            description={
              res_status === 'info' ? (
                getLocale() === 'zh-CN' ? (
                  '--- 结果将会显示在这里 ---'
                ) : (
                  '--- Results will be shown here ---'
                )
              ) : result ? (
                <TextArea value={result} autoSize bordered={false} status="error" />
              ) : (
                ''
              )
            }
            type={res_status}
            showIcon
          />
        </Panel>
      </Collapse>
    </ProCard>
  );
}
