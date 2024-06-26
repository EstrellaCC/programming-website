export default [
  {
    path: '/user',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/helper',
    name: 'helper',
    icon: 'compass',
    component: './Helper',
  },
  {
    name: 'personal',
    icon: 'UserOutlined',
    path: '/personal',
    access: 'noAdmin',
    component: './Personal',
  },
  {
    path: '/course/exercise/:related_topic/:id',
    component: './EditorPage',
  },
  {
    name: 'courseAdmin',
    icon: 'crown',
    access: 'canAdmin',
    path: '/courseAdmin/',
    routes: [
      {
        path: '/CourseAdmin/',
        component: './CourseAdmin',
      },
      {
        path: '/CourseAdmin/courseManager',
        component: './CourseManager',
      },
      {
        path: '/CourseAdmin/courseDisplay',
        component: './CourseDisplay',
      },
      {
        path: '/CourseAdmin/courseList',
        component: './CourseList',
      },
    ],
  },
  {
    path: '/course/exercise/:related_topic',
    component: './CourseOutline',
  },
  {
    name: 'courses',
    icon: 'table',
    path: '/courses/',
    routes: [
      {
        path: '/courses/',
        component: './CoursePage'
      },
      {
        path: '/courses/allCourses',
        component: './CoursePage/CourseDetail'
      }
    ]
  },
  // {
  //   path: '/posts',
  //   name: '资源管理',  
  //   component: './posts/index',
  // },
  {
    path: '/posts',
    icon:'compass',
    name: 'posts',  
    component: './posts/index',
  },
      {
          path: '/posts/create',
          component: './posts/user/create',
        },
        {
          path: '/posts/:post_id?',
          component: './posts/user/post',
        },
  // {
  //   path: '/ChatRoom',
  //   name: '聊天室',
  //   component: './ChatRoom',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
