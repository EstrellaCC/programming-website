import {request} from 'umi';

export const getTopic = async () => {
  return request('/CourseServer/server2/V1/course/topic/6', {
    method: 'GET',
  });
};

export const getAllTopic = async () => {
  return request('/CourseServer/server2/V1/course/topic/all', {
    method: 'GET',
  });
};

export const search = async (value) => {
  const url = `/CourseServer/server2/V1/course/search/${value}`;
  // const data = await request(url);
  // console.log(data);
  return request(url);
};

export const getNewTopic = async () => {
  return request('/CourseServer/server2/V1/course/newtopic/', {
    method: 'GET',
  });
};

export const changeUserIcon = async () => {

}

export const addCourseProgress = async (value) => {
  console.log(value)
  const token = localStorage.getItem('token'); 
  return request('/CourseServer/server2/V1/course/add_user_progress/', {
    method: 'POST',
    data: value,
    headers: {
      Authorization: token ? `Bearer ${token}` : '', 
      currentAuthority: localStorage.getItem('currentAuthority'),
    }
  })
}

export const changeCourseProgress = async (value) => {
  console.log(value)
  const token = localStorage.getItem('token'); 
  return request('/CourseServer/server2/V1/course/change_user_progress/', {
    method: 'POST',
    data: value,
    headers: {
      Authorization: token ? `Bearer ${token}` : '', 
      currentAuthority: localStorage.getItem('currentAuthority'),
    }
  })
}

export const removeUserProgress = async (value) => {
  console.log(value)
  const token = localStorage.getItem('token'); 
  return request('/CourseServer/server2/V1/course/remove_user_progress/', {
    method: 'POST',
    data: value,
    headers: {
      Authorization: token ? `Bearer ${token}` : '', 
      currentAuthority: localStorage.getItem('currentAuthority'),
    }
  })

}

export const addUserCollection = async (value) => {
  console.log(value)
  const token = localStorage.getItem('token'); 
  return request('/CourseServer/server2/V1/course/add_user_collection/', {
    method: "POST",
    data: value,
    headers: {
      Authorization: token ? `Bearer ${token}` : '', 
      currentAuthority: localStorage.getItem('currentAuthority'),
    }
  })
}

export const deleteCollection = async (value) => {
  console.log(value)
  const token = localStorage.getItem('token'); 
  return request('/CourseServer/server2/V1/course/delete_user_collection/', {
    method: "POST",
    data: value,
    headers: {
      Authorization: token ? `Bearer ${token}` : '', 
      currentAuthority: localStorage.getItem('currentAuthority'),
    }
  })
}
